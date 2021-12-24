import { readonly, reactive } from 'vue'

const stateError = reactive({
  error: false,
  message: '',
})

function storeError() {
  return {
    stateError: readonly(stateError),
  }
}

// MUTATIONS
const SET_ERROR = (message) => {
  stateError.error = true
  stateError.message = message
}

const RESET_ERROR = () => {
  stateError.error = false
  stateError.message = ''
}

// ACTIONS
const setError = (error) => {
  console.log('Error Handler: ', { error })
  if (error.response?.data) {
    SET_ERROR(error.response.data)
  } else if (error.message) {
    SET_ERROR(error.message)
  } else {
    SET_ERROR(error)
  }
}

const resetError = () => {
  RESET_ERROR()
}

export { storeError, setError, resetError }
