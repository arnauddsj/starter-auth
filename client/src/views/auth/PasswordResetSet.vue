<template>
  <div>
    <h3 class="text-center margin-bottom-4">Recover Password</h3>
    <form @submit.prevent="submitForm">
      <PasswordInput v-model="inputs.password"
        >Password
        <button @click.prevent="tips = !tips" class="tips">
          ?
        </button></PasswordInput
      >

      <div v-show="tips" class="password-rules">Min 8 characters</div>

      <PasswordConfirmationInput
        v-model="inputs.passwordConfirmation"
        :initialPassword="inputs.password"
        >Password</PasswordConfirmationInput
      >

      <button type="submit">Register</button>
    </form>
    <div class="flex-col-center form__bottom">
      <p>
        Wait, I remember!<router-link :to="{ name: 'login' }">
          Back to login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
/*
  Send a password reset email.
*/
import { reactive, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setLoading, resetLoading } from '../../store/loadingHandler'
import {
  validatePasswordMatch,
  formHasError,
  validatePassword,
} from '../../store/validations'

import api from '../../services/apiClient'
import PasswordInput from '../../components/forms/PasswordInput.vue'
import PasswordConfirmationInput from '../../components/forms/PasswordConfirmationInput.vue'

const route = useRoute()
const router = useRouter()
const toast = inject(['moshaToast'])

const tips = ref(false)

const inputs = reactive({
  password: '',
  passwordConfirmation: '',
})

const submitForm = async () => {
  const token = route.query.evt
  try {
    validatePassword(inputs.password)
    validatePasswordMatch(inputs.password, inputs.passwordConfirmation)

    if (formHasError.value) {
      let error = new Error('Please fill the form correctly before submit')
      throw error
    }
    setLoading()
    const res = await api.passwordResetSet(token, inputs.password)

    if (res?.status === 200) {
      router.push({
        name: 'password-reset-success',
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

    if (error.response.status === 404) {
      router.push({
        name: 'password-reset',
      })
    }
    resetLoading()
  }
}
</script>

<style lang="scss" scoped>
.tips {
  background-color: var(--accent-color);
  border-radius: 50px;
  padding: 0.3rem 0.7rem;
  font-size: 1.3rem;
}

.form__bottom {
  margin-top: 1rem;
  font-size: 1.4rem;

  p {
    margin-top: 0.5rem;
  }
}
</style>
