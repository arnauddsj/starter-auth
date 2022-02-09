<template>
  <div>
    <h3 class="text-center margin-bottom-2">Recover Password</h3>
    <form @submit.prevent="submitForm">
      <EmailInput v-model="inputs.email" />
      <button type="submit">Email me a recovery link</button>
    </form>
    <div class="flex-col-center form__bottom">
      <p>
        Wait, I remember!<router-link :to="{ name: 'login' }">
          Back to login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { setLoading, resetLoading } from '../../store/loadingHandler'
import api from '../../services/apiClient'
import { formHasError, validateEmail } from '../../store/validations'

import EmailInput from '../../components/forms/EmailInput.vue'

const router = useRouter()
const toast = inject(['moshaToast'])

const inputs = reactive({
  email: '',
})

const submitForm = async () => {
  try {
    validateEmail(inputs.email)

    if (formHasError.value) {
      let error = new Error('Please fill the form correctly before submit')
      throw error
    }

    setLoading()
    const res = await api.passwordResetRequest(inputs.email)
    if (res?.status === 200) {
      router.push({
        name: 'password-reset-confirmation',
      })
    }
    resetLoading()
  } catch (error) {
    let errorMessage

    if (error.response?.data) {
      errorMessage = error.response.data
    } else {
      errorMessage = error.message
    }

    toast(errorMessage, {
      position: 'bottom-right',
      transition: 'bounce',
      showIcon: 'true',
      type: 'danger',
      timeout: 3000,
    })
    resetLoading()
  }
}
</script>

<style lang="scss" scoped>
.form__bottom {
  margin-top: 1rem;
  font-size: 1.4rem;

  p {
    margin-top: 0.5rem;
  }
}
</style>
