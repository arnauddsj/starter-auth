<template>
  <div class="auth-container flex-col-center">
    <Logo class="logo" />
    <router-view></router-view>
  </div>
</template>

<script setup>
/*
  Layout that shows all pages related to login, registration, validation etc.
*/
import Logo from '../../components/layout/Logo.vue'
</script>

<style lang="scss" scoped>
.auth-container {
  margin-top: 3rem;
  min-width: min-content;
  max-width: 28rem;
}
.logo {
  margin-bottom: 5rem;
}
</style>
