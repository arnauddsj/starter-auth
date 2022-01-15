const passport = require('passport')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const TwitterStrategy = require('passport-twitter').Strategy

const verifyPassword = require('../lib/passwordUtils').verifyPassword

// change default passport expected variable name to email
const customFields = {
  usernameField: 'email',
  passReqToCallback: true,
}

const callbackURL = '/api/v1/auth/google/callback',

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
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value
      const id = profile.id
      // Uncomment this line if you want to use avatar pictures
      // const photo = profile.photos[0].value

      // Search user in DB
      try {
        const user = await prisma.user.findUnique({
          where: {
            email,
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
                    id,
                    // Uncomment next line if you want to use photos for avatars
                    // photo: profile.photos[0].value,
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
          // if (!profile.emails[0].verified) {
          //   let error = new Error('Google email not verified.')
          //   error.statusCode = 401
          //   throw error
          // }

          let newUser = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              activation: 'VALIDATED',
              provider: {
                google: {
                  id,
                  // Uncomment next line if you want to use photos for avatars
                  // photo,
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

//facebook strategy
passport.use(
  new FacebookStrategy(
    {
      // pull in our app id and secret from our auth.js file
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL,
      profileFields: [
        'id',
        'displayName',
        'name',
        'picture.type(large)',
        'email',
      ],
    }, // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {
      console.log(profile)
      return done(null, profile)
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
