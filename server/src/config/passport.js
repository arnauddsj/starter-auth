const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const verifyPassword = require('../lib/passwordUtils').verifyPassword

// change default passport expected variable name to email
const customFields = {
  usernameField: 'email',
  passReqToCallback: true,
}

// Local strategy
const verifyCallback = async (req, email, password, done) => {
  // Verify user against db with prisma
  // Returned data from this callback is only for check password and serializeUser. Don't return other data.
  prisma.user
    .findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        activation: true,
        userType: true,
        hash: true,
        salt: true,
      },
    })
    .then((user) => {
      if (!user) done(null, false)

      const isValid = verifyPassword(password, user.hash, user.salt)

      if (!isValid) done(null, false)

      delete user.hash
      delete user.salt
      return done(null, user)
    })
    .catch((error) => {
      // next(error)
      done(error)
    })
}

const strategy = new LocalStrategy(customFields, verifyCallback)
passport.use(strategy)

// Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // Search user in DB
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.emails[0].value,
          },
        })

        if (user) {
          // Check if already logged in with Google, if never get google profile info into provider entry
          if (!user.provider) {
            const updatedUser = await prisma.user.update({
              where: {
                email: user.email,
              },
              data: {
                activation: 'VALIDATED',
                emailVerificationLink: '',
                provider: {
                  google: {
                    id: profile.id,
                    photo: profile.photos[0].value,
                  },
                },
              },
            })
            // Send back updated user
            done(null, updatedUser)
          } else {
            // Found user that already logged in with google
            done(null, user)
          }
        } else {
          // Create a user
          if (!profile.emails[0].verified) {
            let error = new Error('Google email not verified.')
            error.statusCode = 401
            throw error
          }

          let newUser = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              activation: 'VALIDATED',
              provider: {
                google: {
                  id: profile.id,
                  photo: profile.photos[0].value,
                },
              },
            },
          })

          done(null, newUser)
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
)

// Cookie Sessions
passport.serializeUser((user, done) => {
  /* 
  Persist user data (after successful authentication) into session. 
  use,id is saved to session : req.session.passport.user = {id: '..'}
  */

  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  // Used to retrieve user data from session.

  // Add to 'select' any data you would like to catch from DB when user login
  prisma.user
    .findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        activation: true,
        userType: true,
        // otherData: 'My other data',
      },
    })
    .then((user) => {
      // Attach user to the request as res.user
      done(null, user)
    })
    .catch((error) => {
      // next(error)
      done(error)
    })
})
