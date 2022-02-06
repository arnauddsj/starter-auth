<template>
  <div>
    <div>
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        v-model="input"
        @keyup="validateEmail(input)"
        @blur="validateEmail(input)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <div class="input-not-valid" v-if="validationErrors.email">
      {{ validationErrors.email }}
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { validateEmail, storeValidation } from '../../store/validations'

const { validationErrors } = storeValidation()

const input = ref('')
</script>
<style lang="scss" scoped></style>
