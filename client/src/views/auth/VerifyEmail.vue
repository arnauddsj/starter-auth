<template>
  <div v-if="stateError.error">
    <h2>Validation error</h2>
    The validation didn't success? Check your spam or
    <button @click="genEmailValidation" :disabled="sendEmailDisabled">
      re-send a validation email.
    </button>
  </div>
  <div v-else-if="isValid">
    <h2>Validation successful</h2>
    <p>
      <router-link :to="{ name: 'login' }">You can now login.</router-link>
    </p>
  </div>
  <div v-else>Checking email, please wait.</div>
</template>

<script setup>
/*
  Verify email link send to this page. On load the page check the token and show if account is validate or not.
  If not valid use can resend a validation mail.
  */
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import api from '../../services/apiClient'

import { storeError } from '../../store/errorHandler'
const { stateError } = storeError()

import { storeUser } from '../../store/user'
const { stateUser } = storeUser()

const isValid = ref(false)
const sendEmailDisabled = ref(false)

onMounted(async () => {
  // Validate token
  const token = route.query.evt
  const res = await api.verifyEmail(token)

  // [ ] Use errorHandler
  if (res?.status !== 200) {
    let error = new Error('Could not verify email')
    error.statusCode = 401
    throw error
  }

  isValid.value = true

  if (!stateUser.email || !route.query.email) {
    sendEmailDisabled.value = true
  }
})

const enableButton = () => {
  setTimeout(function () {
    sendEmailDisabled.value = false
  }, 20000)
}

const genEmailValidation = () => {
  api.genEmailValidation(stateUser.email)
  sendEmailDisabled.value = true
  enableButton()
}
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 5rem;
}

form {
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.3rem;

    &:not(:first-child) {
      margin-top: 1.5rem;
    }
  }

  input {
    height: 2.5rem;
    padding: 1.5rem 0.8rem;
    margin-top: 0.6rem;
  }

  button {
    margin-top: 2rem;
    padding: 1rem 1rem;

    font-weight: 800;
    color: var(--text-on-accent-color);
    background-color: var(--accent-color);
  }
}

p {
  margin-top: 1rem;
  font-size: 1.3rem;
  text-align: center;
}
</style>
