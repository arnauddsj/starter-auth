<template>
  <div>
    <h3 class="text-center margin-bottom-2">Password recovered</h3>
    <div class="text-center margin-bottom-2">
      Congratulation, your new password is set.
    </div>
    <p class="text-center">
      <router-link :to="{ name: 'login' }"> Back to login page. </router-link>
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
