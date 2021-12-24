const yup = require('yup')
require('yup-password')(yup) // extend yup

// Validation
const schema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .minSymbols(1, 'Password must contain at least 1 symbol')
    .minUppercase(1, 'Password must contain at least 1 uppercase')
    .minNumbers(1, 'Password must contain at least 1 number'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const validate = (input) => async (req, res, next) => {
  try {
    await schema.validateAt(input, req.body)
    next()
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

const validateCredentials = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: true })
    next()
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

module.exports = {
  validateCredentials,
  validate,
}
