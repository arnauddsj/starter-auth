import { readonly, reactive, computed } from 'vue'

const validationErrors = reactive({
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
const isEmpty = (fieldName) => {
  validationErrors[fieldName] = 'The ' + fieldName + ' is required'
}

const minLength = (fieldValue, minLength) => {
  if (fieldValue.length < minLength) return false
  return true
}

const isEmail = (fieldValue) => {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!emailRegex.test(fieldValue)) return false
  return true
}

// Actions
const validateEmail = (fieldValue) => {
  if (fieldValue === '') {
    validationErrors.email = 'The email is required'
  } else if (!isEmail(fieldValue)) {
    validationErrors.email = 'This is not a valid email address'
  } else {
    validationErrors.email = ''
  }
}

const validatePassword = (fieldValue) => {
  if (fieldValue === '') {
    validationErrors.password = 'The password is required'
  } else if (!minLength(fieldValue, 8)) {
    validationErrors.password =
      'The password field must be at least 8 characters long'
  } else {
    validationErrors.password = ''
  }
}

const resetAllValidationErrors = () => {
  validationErrors.email = ''
  validationErrors.password = ''
  validationErrors.passwordConfirmation = ''
}

// Getter
const formHasError = computed(() => {
  let hasError = false
  for (let field in validationErrors) {
    if (validationErrors[field] !== '') {
      return true
      break
    }
    hasError = false
  }
  return hasError
})

export {
  storeValidation,
  validateEmail,
  validatePassword,
  formHasError,
  resetAllValidationErrors,
}
