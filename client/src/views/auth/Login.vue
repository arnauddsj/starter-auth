<template>
  <div class="login__container">
    <h2>Login with social</h2>
    <!-- SOCIAL STRATEGIES -->
    <SignInGoogle class="social-login" />
    <SignInFacebook class="social-login" />
    <SignInTwitter class="social-login" />
    <Divider />

    <!-- LOCAL STRATEGIES -->
    <form @submit.prevent="submit">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        v-model="inputs.email"
        @blur="validate('email', inputs)"
        @focus="resetValidationError('email')"
      />
      <div v-if="stateValidation.email" class="validation-error">
        {{ stateValidation.email }}
      </div>
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        v-model="inputs.password"
        @blur="validate('password', inputs)"
        @focus="resetValidationError('password')"
      />
      <div v-if="stateValidation.password" class="validation-error">
        {{ stateValidation.password }}
      </div>

      <router-link :to="{ name: 'password-reset' }" class="forgot-password"
        >Forgot password?</router-link
      >

      <button type="submit">Login</button>
    </form>
    <p>
      No account?
      <router-link :to="{ name: 'register' }">Please Register.</router-link>
    </p>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'
import { useLogin, isAuth } from '../../store/user'
import { useRouter } from 'vue-router'
import SignInGoogle from '../../components/auth/SignInGoogle.vue'
import SignInFacebook from '../../components/auth/SignInFacebook.vue'
import Divider from '../../components/auth/Divider.vue'

import {
  validate,
  validateAll,
  storeValidation,
  resetValidationError,
} from '../../store/validations'
import SignInTwitter from '../../components/auth/SignInTwitter.vue'
const { stateValidation } = storeValidation()

const router = useRouter()

const inputs = reactive({
  email: '',
  password: '',
})

const submit = async () => {
  try {
    await validateAll(inputs)
    const credentials = {
      email: inputs.email,
      password: inputs.password,
    }

    const res = await useLogin(credentials)
    if (res.status === 200) {
      router.push({
        name: 'account',
      })
    }
  } catch (error) {
    console.log(error)
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

.social-login:not(:first-child) {
  margin-top: 1rem;
}
</style>
