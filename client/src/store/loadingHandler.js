import { readonly, reactive } from 'vue'

const stateLoading = reactive({
  loading: false,
})

function storeLoading() {
  return {
    stateLoading: readonly(stateLoading),
  }
}

// MUTATIONS
const SET_LOADING = () => {
  stateLoading.loading = true
}

const RESET_LOADING = () => {
  stateLoading.loading = false
}

// ACTIONS
const setLoading = () => {
  SET_LOADING()
}

const resetLoading = () => {
  RESET_LOADING()
}

export { storeLoading, setLoading, resetLoading }
