const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const verifyPassword = require('../lib/passwordUtils').verifyPassword

// passport.use(
//   new GoogleStrategy({
//     // option for google strategy
//   }),
//   (verify) => {
//     // call back function
//     if (!verify) {
//       throw new TypeError('OAuth2Strategy requires a verify callback')
//     }
//   }
// )

// change default passport expected variable name to email
const customFields = {
  usernameField: 'email',
  passReqToCallback: true,
}

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

// Express session
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
