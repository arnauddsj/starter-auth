import { readonly, reactive } from 'vue'
import { setError } from '../store/errorHandler'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup

const stateValidation = reactive({
  errors: [],
  email: '',
  password: '',
  passwordConfirmation: '',
})

function storeValidation() {
  return {
    stateValidation: readonly(stateValidation),
  }
}

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

// MUTATIONS

const SET_VALIDATION_ERROR = (error) => {
  stateValidation[error.path] = error.message
}

const RESET_VALIDATION_ERROR = (input) => {
  stateValidation[input] = ''
}

const RESET_ALL_VALIDATION_ERROR = () => {
  stateValidation.email = ''
  stateValidation.password = ''
}

// ACTIONS

const resetError = (input) => {
  RESET_VALIDATION_ERROR(input)
}

const validate = async (input, value) => {
  try {
    await schema.validateAt(input, value)
  } catch (error) {
    SET_VALIDATION_ERROR(error)
  }
}

/*
    {
        errors: ["email is a required field"],
        inner: [],
        message: "email is a required field",
        name: "ValidationError",
        params: {path: "email", value: "", originalValue: "", label: undefined},
        path: "email",
        type: "required",
        value: "",
        // ..
    }
    */

/*
method will be called when the user clicks on the submit button. 
Here, you need to validate both the fields using the validate() method. 
By default the validate() method will reject the promise as soon as it finds 
the error and wont validate any further fields. 
So to avoid that you need to pass the abortEarly option and set the boolean 
to false { abortEarly: false }.
*/

const SET_VALIDATION_ERRORS = (errors) => {
  stateValidation.errors = errors
}

const validateAll = async (inputs) => {
  try {
    await schema.validate(inputs, { abortEarly: true })
    RESET_ALL_VALIDATION_ERROR()
  } catch (error) {
    console.log('Form validation error: ', { error })
    if (error.errors.length > 0) {
      setError(error.message)
    } else {
      setError('Please fix form issues and submit again')
    }
    throw error
  }
}

export { storeValidation, validate, validateAll, resetError }
