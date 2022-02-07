<template>
  <div>
    <div class="input-wrapper">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="elonmusk@spacex.com"
        v-model="input"
        @keyup="validateEmail(input)"
        @blur="validateEmail(input)"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{ label__error: validationErrors.email }"
      />
    </div>
    <div class="input__error" v-if="validationErrors.email">
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
