<template>
  <div class="">
    <h2>Register with social</h2>
    <!-- SOCIAL STRATEGIES -->
    <SignInGoogle class="social-login" />
    <SignInFacebook class="social-login" />
    <SignInTwitter class="social-login" />
    <SignInGithub class="social-login" />
    <SignInLinkedin class="social-login" />
    <Divider />
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
      <label for="password"
        >Password
        <button @click.prevent="tips = !tips" class="tips">?</button></label
      >
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
      <div v-show="tips" class="password-rules">
        Min 8 characters with at least:<br />
        1 symbol, uppercase and number.
      </div>
      <button type="submit" class="submit">Register</button>
    </form>
    <ul>
      <li>
        Already have an account?
        <router-link :to="{ name: 'login' }">Please login.</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
/*
  After register, email is sent for validation, user is redirected to /registration-success
  From there user check mail or resend a validation email (this will un-valid the previous one)
  The user email is stored to store/user, it can be used on to resend email.
  */
import { reactive, ref, watchEffect } from 'vue'
import { register, isAuth } from '../../store/user'
import { useRouter } from 'vue-router'
import SignInGoogle from '../../components/auth/SignInGoogle.vue'
import SignInFacebook from '../../components/auth/SignInFacebook.vue'
import SignInTwitter from '../../components/auth/SignInTwitter.vue'
import SignInGithub from '../../components/auth/SignInGithub.vue'
import SignInLinkedin from '../../components/auth/SignInLinkedin.vue'
import Divider from '../../components/auth/Divider.vue'

import {
  validate,
  validateAll,
  storeValidation,
  resetValidationError,
} from '../../store/validations'
const { stateValidation } = storeValidation()

const router = useRouter()

const tips = ref(false)

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
    const res = await register(credentials)
    if (res?.status === 200) {
      router.push({
        name: 'registration-success',
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

  .submit {
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

ul {
  margin-top: 1rem;
  font-size: 1.3rem;
  text-align: center;

  li {
    margin-top: 0.6rem;
  }
}

.password-rules {
  margin-top: 1rem;
  color: rgb(110, 110, 110);
  font-size: 1.2rem;
}

.social-login:not(:first-child) {
  margin-top: 1rem;
}
</style>
