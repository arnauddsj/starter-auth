const jwt = require('jsonwebtoken')

const secret = process.env.JWT_EMAIL_SECRET

const genIdentityToken = async (email, activationLink) => {
  try {
    const token = await jwt.sign(
      {
        email,
        activationLink,
      },
      secret,
      { expiresIn: '30m' }
    )
    return token
  } catch (error) {
    error.statusCode = 401
    throw error
  }
}

const verifyIdentityToken = async (token) => {
  try {
    const isValid = await jwt.verify(token, secret, function (error, decoded) {
      if (error) {
        throw error
      }
      return decoded
    })
    return isValid
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  genIdentityToken,
  verifyIdentityToken,
}
