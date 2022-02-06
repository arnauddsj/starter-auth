<template>
  <div>
    <h2>Recover Password</h2>
    <form @submit.prevent="submit">
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
      <label for="passwordConfirmation">Confirm password</label>
      <input
        type="password"
        name="passwordConfirmation"
        v-model="inputs.passwordConfirmation"
        @blur="validate('passwordConfirmation', inputs)"
        @focus="resetValidationError('passwordConfirmation')"
      />
      <div v-if="stateValidation.passwordConfirmation" class="validation-error">
        {{ stateValidation.passwordConfirmation }}
      </div>
      <button type="submit">Save new password</button>
    </form>
    <p>
      Wait, I remember!<router-link :to="{ name: 'login' }">
        Back to login
      </router-link>
    </p>
  </div>
</template>

<script setup>
/*
  Send a password reset email.
*/
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeValidation, resetValidationError } from '../../store/validations'
const { stateValidation } = storeValidation()
import api from '../../services/apiClient'

const route = useRoute()
const router = useRouter()

const inputs = reactive({
  password: '',
  passwordConfirmation: '',
})

const submit = async () => {
  const token = route.query.evt
  try {
    const res = await api.passwordResetSet(token, inputs.password)
    if (res?.status === 200) {
      router.push({
        name: 'password-reset-success',
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
