<template>
  <div>
    <div class="input-wrapper">
      <label for="password"><slot>Password confirmation</slot></label>
      <input
        type="password"
        name="password"
        placeholder="Rewrite the same password"
        v-model="input"
        @keyup="validatePasswordMatch(props.initialPassword, input)"
        @blur="validatePasswordMatch(props.initialPassword, input)"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <div class="input__error" v-if="validationErrors.passwordConfirmation">
      {{ validationErrors.passwordConfirmation }}
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { validatePasswordMatch, storeValidation } from '../../store/validations'

const { validationErrors } = storeValidation()

const input = ref('')

const props = defineProps(['initialPassword'])
</script>
<style lang="scss" scoped></style>
