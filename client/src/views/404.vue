<template>
  <div class="app-container">
    <h1>404 Page not Found.</h1>
    <p><router-link :to="{ name: 'home' }">Back to home page.</router-link></p>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-top: 20rem;
}
p {
  margin-top: 2rem;
}
</style>
