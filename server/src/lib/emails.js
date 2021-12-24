const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID_USER_VALIDATION_API_KEY)

const emailRegistration = async (userEmail, token) => {
  const msg = {
    to: `${userEmail}`,
    from: `${process.env.EMAIL_FROM}`,
    subject: 'Please validate email',
    html: `Click on this link to verify your email<br/>
    <a href="${process.env.CLIENT_URL}/verify-email?email=${userEmail}&evt=${token}">VERIFY</a>`,
  }

  try {
    await sgMail.send(msg)
  } catch (err) {
    throw new Error(err)
  }
}

const emailRegistrationSuccess = async (userEmail) => {
  const msg = {
    to: `${userEmail}`,
    from: `${process.env.EMAIL_FROM}`,
    subject: 'Email validation success',
    html: `Your email has been validate, you can now <a href="${process.env.CLIENT_URL}/auth">Login</a>`,
  }

  try {
    await sgMail.send(msg)
  } catch (err) {
    throw new Error(err)
  }
}

const emailResetPasswordToken = async (userEmail, token) => {
  const msg = {
    to: `${userEmail}`,
    from: `${process.env.EMAIL_FROM}`,
    subject: 'Reset your password',
    html: `Click on this link to reset your password<br/>
    <a href="${process.env.CLIENT_URL}/password-reset-set?evt=${token}">CREATE NEW PASSWORD</a>`,
  }

  try {
    await sgMail.send(msg)
  } catch (err) {
    throw new Error(err)
  }
}

const emailResetPasswordSuccess = async (userEmail) => {
  const msg = {
    to: `${userEmail}`,
    from: `${process.env.EMAIL_FROM}`,
    subject: 'Password reset complete',
    html: `Your email has been reset, you can now <a href="${process.env.CLIENT_URL}/auth">Login</a>`,
  }

  try {
    await sgMail.send(msg)
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  emailRegistration,
  emailRegistrationSuccess,
  emailResetPasswordToken,
  emailResetPasswordSuccess,
}
