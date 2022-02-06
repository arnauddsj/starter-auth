<template>
  <div class="login__container">
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
      <router-link :to="{ name: 'password-reset' }" class="forgot-password"
        >Forgot password?</router-link
      >

      <button type="submit" :disabled="isSubmitValid">Sign In</button>
    </form>
    <p>
      No account?
      <router-link :to="{ name: 'register' }">Please Register.</router-link>
    </p>
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

import {
  storeValidation,
  validateForm,
  isSubmitValid,
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
    validateForm(inputs)
    // const validation = await validateAll(inputs)
    const credentials = {
      email: inputs.email,
      password: inputs.password,
    }

    const res = await useLogin(credentials)
    if (res.status === 200) {
      router.push({
        name: 'home',
      })
    }
  } catch (error) {
    const errorMessage = error.response.data
    let timeOut = 3000

    if (
      errorMessage ===
      'Please sign in with social or create a password for your account with the Forgot password link.'
    ) {
      timeOut = 6000
    }

    toast(error.response.data, {
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
h2 {
  font-size: 1.7rem;
  margin-bottom: 4rem;
  text-align: center;
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
    padding: 1.2rem 1rem;
    font-weight: 800;
    color: var(--text-on-accent-color);
    background-color: var(--accent-color);

    &:hover {
      background-color: rgb(12, 117, 158);
    }

    &:active {
      background-color: #616161;
    }
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

.social-login:not(:first-child) {
  margin-top: 1rem;
}
</style>
