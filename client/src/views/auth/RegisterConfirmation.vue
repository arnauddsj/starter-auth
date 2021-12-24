<template>
  <div>
    <h2>You are registered</h2>
    <div>Please validate your email</div>
    <p>
      No email? Check your spam or
      <button @click="validateEmail" :disabled="sendEmailDisabled">
        re-send a validation email.
      </button>
    </p>
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
  api.genEmailValidation(stateUser.email)
  sendEmailDisabled.value = true
  enableButton()
}
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 5rem;
}
</style>
