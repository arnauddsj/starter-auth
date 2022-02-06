import { readonly, reactive, computed } from 'vue'

const validationErrors = reactive({
  errors: [],
  email: '',
  password: '',
  passwordConfirmation: '',
})

function storeValidation() {
  return {
    validationErrors: readonly(validationErrors),
  }
}

// Reusable validators
const isEmpty = (fieldName, fieldValue) => {
  return !fieldValue ? 'The ' + fieldName + ' field is required' : ''
}

const minLength = (fieldName, fieldValue, minLength) => {
  return fieldValue.length < minLength
    ? `The ${fieldName} field must be at least ${minLength} characters long`
    : ''
}

const isEmail = (fieldValue) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(fieldValue) ? 'This is not a valid email address' : ''
}

// Actions
const validateEmail = (fieldValue) => {
  validationErrors['email'] = !fieldValue
    ? isEmpty('email', fieldValue)
    : isEmail(fieldValue)
}

const validatePassword = (fieldValue) => {
  validationErrors['password'] = !fieldValue
    ? isEmpty('password', fieldValue)
    : minLength('password', fieldValue, 8)
}

// TO CHECK IF USEFULE
const resetValidationError = (fieldName) => {
  validationErrors[fieldName] = ''
}

const resetAllValidationErrors = () => {
  validationErrors.errors = []
}

const validateForm = (inputs) => {
  console.log(inputs)
}

// Getter
const isSubmitValid = computed((inputs, errors) => {
  // checks if any of its properties are empty or if any of the same properties in the errors object have error messages.
  let disabled = true
  for (let prop in inputs) {
    if (!inputs[prop] || errors[prop]) {
      disabled = true
      break
    }
    disabled = false
  }
  return disabled
})

export {
  resetValidationError,
  resetAllValidationErrors,
  storeValidation,
  validateEmail,
  validatePassword,
  isSubmitValid,
  validateForm,
}
