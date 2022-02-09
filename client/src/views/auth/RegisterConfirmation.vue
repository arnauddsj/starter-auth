<template>
  <div>
    <h3 class="text-center margin-bottom-2">You are registered</h3>
    <h4 class="margin-bottom-2">Please check your emails for validation</h4>
    <p class="text-center margin-bottom-2 ">
      <div class="text-center" > No email?</div> 
      <div class="text-center ">Check your spam or</div>
       <button
      :class="{ 'text-action': !sendEmailDisabled }"
      @click="genEmailValidation"
      :disabled="sendEmailDisabled"
    >
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
</style>
