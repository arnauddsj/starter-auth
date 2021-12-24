<template>
  <div>
    <h2>You have logged in successfully but your account is not validated</h2>
    No email? Check your spam or
    <button @click="validateEmail" :disabled="sendEmailDisabled">
      re-send a validation email.
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeUser } from '../../store/user'
import api from '../../services/apiClient'

const { stateUser } = storeUser()

const sendEmailDisabled = ref(false)

const enableButton = () => {
  setTimeout(function () {
    sendEmailDisabled.value = false
  }, 30000)
}

const validateEmail = () => {
  console.log(stateUser.email)
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

.forgot-password {
  margin-top: 0.6rem;
  font-size: 1.2rem;
}
</style>
