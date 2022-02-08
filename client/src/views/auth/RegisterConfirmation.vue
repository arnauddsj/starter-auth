<template>
  <div class="text-center">
    <h2>You are registered</h2>
    <h4 class="margin-bottom-2">Please check your emails for validation</h4>
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
  }, 20000)
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
