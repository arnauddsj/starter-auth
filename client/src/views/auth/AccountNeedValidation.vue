<template>
  <div class="text-center">
    <h3 class="margin-bottom-2">
      You have logged in successfully but your account is not validated
    </h3>
    <div>No email?</div>
    <div>Check your spam or</div>
    <button
      :class="{ 'text-action': !sendEmailDisabled }"
      @click="genEmailValidation"
      :disabled="sendEmailDisabled"
    >
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

const genEmailValidation = () => {
  api.genEmailValidation(stateUser.email)
  sendEmailDisabled.value = true
  enableButton()
}
</script>
