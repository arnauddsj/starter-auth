<template>
  <div>
    <!-- SOCIAL STRATEGIES -->
    <SignInGoogle class="social-login" />
    <SignInFacebook class="social-login" />
    <SignInTwitter class="social-login" />
    <SignInGithub class="social-login" />
    <SignInLinkedin class="social-login" />
    <Divider />

    <!-- LOCAL STRATEGIES -->
    <form @submit.prevent="submitForm">
      <EmailInput v-model="inputs.email" />
      <PasswordInput v-model="inputs.password" />

      <button type="submit">Sign In</button>
    </form>
    <div class="flex-col-center form__bottom">
      <p>
        <router-link :to="{ name: 'password-reset' }" class="forgot-password"
          >Forgot password?</router-link
        >
      </p>

      <p>
        No account?
        <router-link :to="{ name: 'register' }">Please Register.</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, watchEffect, inject } from 'vue'
import { useLogin, isAuth } from '../../store/user'
import { useRouter } from 'vue-router'
import SignInGoogle from '../../components/auth/SignInGoogle.vue'
import SignInFacebook from '../../components/auth/SignInFacebook.vue'
import SignInTwitter from '../../components/auth/SignInTwitter.vue'
import SignInGithub from '../../components/auth/SignInGithub.vue'
import SignInLinkedin from '../../components/auth/SignInLinkedin.vue'
import Divider from '../../components/auth/Divider.vue'

import EmailInput from '../../components/forms/EmailInput.vue'
import PasswordInput from '../../components/forms/PasswordInput.vue'

import { setLoading, resetLoading } from '../../store/loadingHandler'

import {
  storeValidation,
  formHasError,
  validateEmail,
  validatePassword,
} from '../../store/validations'
const { validationErrors } = storeValidation()

const router = useRouter()
const toast = inject(['moshaToast'])

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

    // const validation = await validateAll(inputs)
    const credentials = {
      email: inputs.email,
      password: inputs.password,
    }
    setLoading()
    const res = await useLogin(credentials)
    if (res.status === 200) {
      router.push({
        name: 'user-profile',
      })
    }
    resetLoading()
  } catch (error) {
    let errorMessage
    let timeOut = 3000

    if (error.response?.data) {
      errorMessage = error.response.data

      if (
        errorMessage ===
        'Please sign in with social or create a password for your account with the Forgot password link.'
      ) {
        timeOut = 6000
      }
    } else {
      errorMessage = error.message
    }

    toast(errorMessage, {
      position: 'bottom-right',
      transition: 'bounce',
      showIcon: 'true',
      type: 'danger',
      timeout: timeOut,
    })
  }
}

watchEffect(() => {
  // If user is logged-in force redirection to account
  if (isAuth.value) {
    router.push({ name: 'home' })
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

.social-login:not(:first-child) {
  margin-top: 1.2rem;
}
</style>
