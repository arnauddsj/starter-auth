<template>
  <div>
    <div class="input-wrapper">
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="input"
        @keyup="validatePassword(input)"
        @blur="validatePassword(input)"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ label__error: validationErrors.password }"
      />
    </div>
    <div class="input__error" v-if="validationErrors.password">
      {{ validationErrors.password }}
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { validatePassword, storeValidation } from '../../store/validations'

const { validationErrors } = storeValidation()

const input = ref('')
</script>
<style lang="scss" scoped></style>
