<template>
  <div class="text-center" v-if="isValid === null">
    Checking email, please wait.
  </div>
  <div class="text-center" v-else-if="isValid">
    <h3 class="margin-bottom-2">Validation successful</h3>
    <p>
      <router-link :to="{ name: 'login' }">You can now login.</router-link>
    </p>
  </div>
  <div class="text-center" v-else>
    <h3 class="margin-bottom-2">Validation error</h3>
    <div class="margin-bottom-2">The validation didn't success?</div>
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
/*
  Verify email link send to this page. On load the page check the token and show if account is validate or not.
  If not valid use can resend a validation mail.
  */
import { onMounted, ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import { storeUser } from '../../store/user'
import api from '../../services/apiClient'

const { stateUser } = storeUser()
const route = useRoute()
const toast = inject(['moshaToast'])

const email = ref('')
const isValid = ref(null)
const sendEmailDisabled = ref(false)

onMounted(async () => {
  // Validate token
  email.value = route.query.email
  const token = route.query.evt

  try {
    const res = await api.verifyEmail(token)

    if (res?.status !== 200) {
      let error = new Error('Could not verify email')
      error.statusCode = 401

      isValid.value = false
      throw error
    }

    isValid.value = true

    if (!stateUser.email || !route.query.email) {
      sendEmailDisabled.value = true
    }
  } catch (error) {
    isValid.value = false
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
  }
})

const enableButton = () => {
  setTimeout(function () {
    sendEmailDisabled.value = false
  }, 20000)
}

const genEmailValidation = () => {
  api.genEmailValidation(email.value)
  sendEmailDisabled.value = true
  enableButton()
}
</script>

<style lang="scss" scoped></style>
