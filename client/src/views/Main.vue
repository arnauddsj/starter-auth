<template>
  <div class="app-container">
    <Nav></Nav>
    <router-view></router-view>
    <div class="error-container" v-if="stateError.error">
      {{ stateError.message }}
    </div>
  </div>
</template>

<script setup>
import { storeUser } from '../store/user'
import { storeError } from '../store/errorHandler'
import Nav from '../components/Nav.vue'

const { stateError } = storeError()
const { stateUser } = storeUser()
</script>
