<template>
  <div>
    <div>
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <div class="input-not-valid" v-if="validationErrors.password">
      {{ validationErrors.password }}
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { validatePassword, storeValidation } from '../../store/validations'

const { validationErrors } = storeValidation()

const input = ref('')

const validateInput = () => {
  validatePassword('password', input.value)
}
</script>
<style lang="scss" scoped></style>
