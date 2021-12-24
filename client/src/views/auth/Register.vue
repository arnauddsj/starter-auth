<template>
  <div class="">
    <h2>Register</h2>
    <form @submit.prevent="submit">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        v-model="inputs.email"
        @blur="validate('email', inputs)"
        @focus="resetError('email')"
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
        @focus="resetError('password')"
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
import { reactive, ref } from 'vue'
import { register } from '../../store/user'
import { useRouter } from 'vue-router'

import {
  validate,
  validateAll,
  storeValidation,
  resetError,
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
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 5rem;
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
    padding: 1rem 1rem;

    font-weight: 800;
    color: var(--text-on-accent-color);
    background-color: var(--accent-color);
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

.tips {
}
</style>
