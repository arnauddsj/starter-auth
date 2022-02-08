<template>
  <div>
    <!-- SOCIAL STRATEGIES -->
    <SignInGoogle class="social-login" />
    <SignInFacebook class="social-login" />
    <SignInTwitter class="social-login" />
    <SignInGithub class="social-login" />
    <SignInLinkedin class="social-login" />
    <Divider>or register</Divider>
    <form @submit.prevent="submitForm">
      <EmailInput v-model="inputs.email" />
      <PasswordInput v-model="inputs.password"
        >Password
        <button @click.prevent="tips = !tips" class="tips">
          ?
        </button></PasswordInput
      >

      <div v-show="tips" class="password-rules">Min 8 characters</div>
      <button type="submit">Register</button>
    </form>
    <div class="flex-col-center form__bottom">
      <p>
        Already have an account?
        <router-link :to="{ name: 'login' }">Please Login.</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
/*
  After register, email is sent for validation, user is redirected to /registration-success
  From there user check mail or resend a validation email (this will un-valid the previous one)
  The user email is stored to store/user, it can be used on to resend email.
  */
import { reactive, ref, watchEffect, inject } from 'vue'
import { register, isAuth } from '../../store/user'
import { useRouter } from 'vue-router'
import { setLoading, resetLoading } from '../../store/loadingHandler'
import {
  storeValidation,
  formHasError,
  validateEmail,
  validatePassword,
} from '../../store/validations'

import SignInGoogle from '../../components/auth/SignInGoogle.vue'
import SignInFacebook from '../../components/auth/SignInFacebook.vue'
import SignInTwitter from '../../components/auth/SignInTwitter.vue'
import SignInGithub from '../../components/auth/SignInGithub.vue'
import SignInLinkedin from '../../components/auth/SignInLinkedin.vue'
import Divider from '../../components/auth/Divider.vue'
import EmailInput from '../../components/forms/EmailInput.vue'
import PasswordInput from '../../components/forms/PasswordInput.vue'

const { validationErrors } = storeValidation()

const router = useRouter()
const toast = inject(['moshaToast'])

const tips = ref(false)

const inputs = reactive({
  email: '',
  password: '',
})

const submitForm = async () => {
  try {
    validateEmail(inputs.email)
    validatePassword(inputs.password)

    if (formHasError.value) {
      let error = new Error('Please fill the form correctly before submit')
      throw error
    }

    const credentials = {
      email: inputs.email,
      password: inputs.password,
    }
    setLoading()
    const res = await register(credentials)
    if (res?.status === 200) {
      router.push({
        name: 'registration-success',
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
  }
}

watchEffect(() => {
  // If user is logged-in force redirection to account
  if (isAuth.value) {
    router.push({ name: 'account' })
  }
})
</script>

<style lang="scss" scoped>
.form__bottom {
  margin-top: 1rem;
  font-size: 1.4rem;

  p {
    margin-top: 0.5rem;
  }
}

.tips {
  background-color: var(--accent-color);
  border-radius: 50px;
  padding: 0.3rem 0.7rem;
  font-size: 1.3rem;
}
.social-login:not(:first-child) {
  margin-top: 1.2rem;
}
</style>
