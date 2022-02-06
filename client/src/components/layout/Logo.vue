<template>
  <div class="logo">
    <router-link :to="{ name: 'home' }">
      <img src="/logo.svg" alt="Logo quick start" />
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-weight: 900;
  width: 15rem;
  .router-link-exact-active {
    border-bottom: none;
  }
}
</style>
