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
  display: inline-block;
  width: 30rem;
  max-width: 30rem;
  margin-top: 3rem;
}
.logo {
  margin: 0 auto 5rem auto;
}
</style>
