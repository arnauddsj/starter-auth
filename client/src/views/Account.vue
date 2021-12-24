<template>
  <div>
    <h1>My account</h1>
    <div>{{ stateUser }}</div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { storeUser } from '../store/user'

const { stateUser } = storeUser()
</script>
<style lang="scss"></style>
