<template>
  <div class="auth-container">
    <Logo class="logo" />
    <router-view class="auth-wrapper"></router-view>
    <div class="error-container" v-if="stateError.error">
      {{ stateError.message }}
    </div>
  </div>
</template>

<script setup>
/*
  Layout that shows all pages related to login, registration, validation etc.
*/
import { storeError } from '../../store/errorHandler'
import Logo from '../../components/Logo.vue'
const { stateError } = storeError()
</script>

<style lang="scss" scoped>
.auth-container {
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-wrapper {
  width: 25rem;
}

.logo {
  margin-bottom: 5rem;
}
</style>
