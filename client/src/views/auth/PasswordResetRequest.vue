<template>
  <div>
    <h2>Recover Password</h2>
    <form @submit.prevent="submit">
      <label for="email">Email</label>
      <input
        name="email"
        v-model="inputs.email"
        type="email"
        @blur="validate('email', inputs)"
        @focus="resetValidationError('email')"
      />
      <div v-if="stateValidation.email" class="validation-error">
        {{ stateValidation.email }}
      </div>
      <button type="submit">Email me a recovery link</button>
    </form>
    <p>
      Wait, I remember!<router-link :to="{ name: 'login' }">
        Back to login
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { storeValidation, resetValidationError } from '../../store/validations'
const { stateValidation } = storeValidation()
import api from '../../services/apiClient'

const router = useRouter()

const inputs = reactive({
  email: '',
})

const submit = async () => {
  try {
    const res = await api.passwordResetRequest(inputs.email)
    if (res?.status === 200) {
      router.push({
        name: 'password-reset-confirmation',
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
</style>
