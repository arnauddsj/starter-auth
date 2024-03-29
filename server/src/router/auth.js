const express = require('express')
const router = new express.Router()
const prisma = require('../config/prisma')
const { Prisma } = require('@prisma/client')

const crypto = require('crypto')
const passport = require('passport')

const { genPassword } = require('../lib/passwordUtils')
const { isAuth, isAdmin } = require('../middleware/auth')

const {
  emailRegistration,
  emailRegistrationSuccess,
  emailResetPasswordToken,
  emailResetPasswordSuccess,
} = require('../lib/emails')

const { genIdentityToken, verifyIdentityToken } = require('../lib/tokenUtils')
const {
  validateCredentials,
  validate,
} = require('../middleware/validations.js')

// Local strategy
// Register new user
router.post('/auth/register', validateCredentials, async (req, res, next) => {
  // Those need to match with the customFields setup in config/passport.js
  try {
    const { email, password } = req.body
    const saltHash = await genPassword(password)

    const salt = saltHash.salt
    const hash = saltHash.hash

    const emailVerificationLink = crypto.randomBytes(32).toString('hex')

    const user = await prisma.user.create({
      data: {
        email,
        hash,
        salt,
        emailVerificationLink,
      },
      select: {
        id: true,
        email: true,
      },
    })

    const genToken = await genIdentityToken(user.email, emailVerificationLink)

    await prisma.validationToken.create({
      data: {
        userEmail: user.email,
        token: genToken,
      },
    })

    await emailRegistration(user.email, genToken)

    res.send()
  } catch (error) {
    // prisma error type
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('2')
        let newError = new Error('Email already in use')
        newError.statusCode = 401
        next(newError)
      }
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.log('2')
      let newError = new Error('Prisma unknown error')
      newError.statusCode = 401
      next(newError)
    } else {
      console.log('1')
      let newError = new Error('Unknown error')
      newError.statusCode = 401
      next(newError)
    }
  }
})

// First Email validation after registration
router.post('/auth/verify-email', async (req, res, next) => {
  const { token } = req.body

  try {
    // find token in db
    const getStoredToken = await prisma.validationToken.findFirst({
      where: {
        token: token,
      },
    })

    if (!getStoredToken) {
      let error = new Error(
        'Token not found, please send a new verification email.'
      )
      error.statusCode = 404
      throw error
    }

    const isTokenValid = await verifyIdentityToken(token)

    if (!isTokenValid) {
      // delete all validation token from decoded.userId in database
      await prisma.validationToken.deleteMany({
        where: {
          userEmail: getStoredToken.userEmail,
        },
      })

      let error = new Error(
        'Token not valid, please send a new verification email.'
      )
      error.statusCode = 401
      throw error
    }

    const user = await prisma.user.findUnique({
      where: {
        email: getStoredToken.userEmail,
      },
      select: {
        email: true,
        emailVerificationLink: true,
      },
    })

    if (!user) {
      let error = new Error('Unauthorized user')
      error.statusCode = 401
      throw error
    }

    if (isTokenValid.activationLink !== user.emailVerificationLink) {
      await prisma.validationToken.deleteMany({
        where: {
          userEmail: getStoredToken.userEmail,
        },
      })

      let error = new Error('Wrong activationLink')
      error.statusCode = 401
      throw error
    }

    await prisma.user.update({
      where: {
        email: getStoredToken.userEmail,
      },
      data: {
        activation: 'VALIDATED',
        emailVerificationLink: '',
      },
    })

    await prisma.validationToken.deleteMany({
      where: {
        userEmail: user.email,
      },
    })

    await emailRegistrationSuccess(user.email)

    res.send()
  } catch (error) {
    next(error)
  }
})

// Resend a validation email
router.post(
  '/auth/gen-email-validation',
  validate('email'),
  async (req, res, next) => {
    const { email } = req.body

    try {
      const isUserPending = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          activation: true,
        },
      })

      if (isUserPending.activation === 'VALIDATED') {
        let error = new Error('Email already validated')
        error.statusCode = 401
        throw error
      }

      if (isUserPending.activation === 'REVOKED') {
        let error = new Error(
          'This account is deactivated, please contact support.'
        )
        error.statusCode = 401
        throw error
      }

      const emailVerificationLink = crypto.randomBytes(32).toString('hex')

      const genToken = await genIdentityToken(email, emailVerificationLink)

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          emailVerificationLink,
        },
      })

      await prisma.validationToken.create({
        data: {
          userEmail: email,
          token: genToken,
        },
      })

      await emailRegistration(email, genToken)

      res.send()
    } catch (error) {
      next(error)
    }
  }
)

router.post('/auth/login', validateCredentials, async (req, res, next) => {
  try {
    await passport.authenticate('local', (error, user) => {
      if (error) return next(error)

      if (!user) {
        let error = new Error('Unauthorized user')
        error.statusCode = 401
        throw error
      }

      req.login(user, function (error) {
        if (error) {
          return next(error)
        }

        return res.send()
      })
    })(req, res, next)
  } catch (error) {
    next(error)
  }
})

router.post(
  '/auth/password-reset-request',
  validate('email'),
  async (req, res, next) => {
    const { email } = req.body

    try {
      const emailVerificationLink = crypto.randomBytes(32).toString('hex')

      const genToken = await genIdentityToken(email, emailVerificationLink)

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          emailVerificationLink,
        },
      })

      await prisma.validationToken.create({
        data: {
          userEmail: email,
          token: genToken,
        },
      })

      await emailResetPasswordToken(email, genToken)

      res.send()
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/auth/password-reset-set',
  validate('password'),
  async (req, res, next) => {
    const { token, password } = req.body

    try {
      // find token in db
      const getStoredToken = await prisma.validationToken.findFirst({
        where: {
          token: token,
        },
      })

      if (!getStoredToken) {
        let error = new Error('Token not found, please try again.')
        error.statusCode = 404
        throw error
      }

      const isTokenValid = await verifyIdentityToken(token)

      if (!isTokenValid) {
        // delete all validation token from decoded.userId in database
        await prisma.validationToken.deleteMany({
          where: {
            userEmail: getStoredToken.userEmail,
          },
        })

        let error = new Error('Token not valid, please try again.')
        error.statusCode = 401
        throw error
      }

      const user = await prisma.user.findUnique({
        where: {
          email: getStoredToken.userEmail,
        },
        select: {
          email: true,
          emailVerificationLink: true,
        },
      })

      if (!user) {
        let error = new Error('Unauthorized user')
        error.statusCode = 401
        throw error
      }

      if (isTokenValid.activationLink !== user.emailVerificationLink) {
        await prisma.validationToken.deleteMany({
          where: {
            userEmail: getStoredToken.userEmail,
          },
        })

        let error = new Error('Wrong activationLink')
        error.statusCode = 401
        throw error
      }

      // Hash new password
      const saltHash = await genPassword(password)

      const salt = saltHash.salt
      const hash = saltHash.hash

      await prisma.user.update({
        where: {
          email: getStoredToken.userEmail,
        },
        data: {
          hash,
          salt,
          activation: 'VALIDATED',
          emailVerificationLink: '',
        },
      })

      await prisma.validationToken.deleteMany({
        where: {
          userEmail: user.email,
        },
      })

      await emailResetPasswordSuccess(user.email)

      res.send()
    } catch (error) {
      next(error)
    }
  }
)

// Google strategy
/* 
Route called from front-end and open in popup or main window 
depending on how is set the front.
It use the GoogleStrategy info set in src/config/passport.js
*/

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL}/member/profile`,
    failureUrl: `${process.env.CLIENT_URL}/auth`,
    failureMessage: true,
  })
)

// Facebook strategy
router.get('/auth/facebook', passport.authenticate('facebook'))

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: `${process.env.CLIENT_URL}/member/profile`,
    failureUrl: `${process.env.CLIENT_URL}/auth`,
    failureMessage: true,
  })
)

// Twitter strategy
router.get('/auth/twitter', passport.authenticate('twitter'))

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: `${process.env.CLIENT_URL}/member/profile`,
    failureUrl: `${process.env.CLIENT_URL}/auth`,
    failureMessage: true,
  })
)

// Github strategy
router.get('/auth/github', passport.authenticate('github'))

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: `${process.env.CLIENT_URL}/member/profile`,
    failureUrl: `${process.env.CLIENT_URL}/auth`,
    failureMessage: true,
  })
)

// Linkedin strategy
router.get('/auth/linkedin', passport.authenticate('linkedin'))

router.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: `${process.env.CLIENT_URL}/member/profile`,
    failureUrl: `${process.env.CLIENT_URL}/auth`,
    failureMessage: true,
  })
)

// Logout
router.get('/auth/logout', (req, res, next) => {
  // logout with passport
  req.logout()
  req.session.destroy()
  res.send()
})

/* 
On navigation auth check
If needed use this route to check if user is still auth to navigate to required auth routes.
*/

router.get('/auth/auth-check', (req, res, next) => {
  //Auth check is a server side route guard to not throw errors on app load if user not logged in and visit public pages
  if (!req.isAuthenticated()) {
    res.status(200).send()
  } else {
    // Add here more data you want to receive from server/db
    const user = {
      email: req.user.email,
      activation: req.user.activation,
    }
    res.send(user)
  }
})

// router.get('/auth/check-admin', isAdmin, (req, res, next) => {
//   res.send('admin validated')
// })

module.exports = router

// Error middleware template
// try {
//   if (someError) {
//     let error = new Error('Error message')
//     error.statusCode = 405
//     throw error
//   }
// } catch (error) {
//   next(error)
// }
