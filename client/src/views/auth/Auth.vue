<template>
  <div class="auth-container">
    <Logo class="logo" />
    <router-view class="auth-wrapper"></router-view>
    <div class="error-container" v-if="errors.error">
      {{ errors.message }}
    </div>
  </div>
</template>

<script setup>
/* 
  Layout that shows all pages related to login, registration, validation etc.
*/
import { inject } from 'vue'
import Logo from '../../components/Logo.vue'

const errors = inject('stateError')
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
