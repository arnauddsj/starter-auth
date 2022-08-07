import { readonly, reactive } from 'vue'

const stateLoading = reactive({
  loading: false,
})

function storeLoading() {
  return {
    stateLoading: readonly(stateLoading),
  }
}

const setLoading = () => {
  stateLoading.loading = true
}

const resetLoading = () => {
  stateLoading.loading = false
}

export { storeLoading, setLoading, resetLoading }
