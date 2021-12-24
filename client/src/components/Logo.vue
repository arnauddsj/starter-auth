<template>
  <div class="logo">
    <router-link :to="{ name: 'home' }">appLogo</router-link>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-weight: 900;
  .router-link-exact-active {
    border-bottom: none;
  }
}
</style>
