<template>
  <div class="user-menu-container">
    <div v-if="isAuth">
      <button @click="logout" class="logout">Logout</button>
      <router-link :to="{ name: 'user-profile' }"> My account</router-link>
    </div>

    <div v-else>
      <router-link :to="{ name: 'login' }">Login</router-link>
      <button @click="router.push({ name: 'register' })" class="register-btn">
        Get Started
      </button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { storeUser, useLogout, isAuth } from '../../store/user'
const { stateUser } = storeUser()
const router = useRouter()

const logout = async () => {
  await useLogout()
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped>
.user-menu-container {
  display: flex;
  align-items: center;
}
.user-name-wrapper {
  display: flex;
  flex-direction: column;
}
.logout {
  margin-right: 2rem;
  color: rgb(140, 174, 187);
}

.register-btn {
  background: #84888a;
  padding: 1rem 1.5rem;
  margin-left: 2rem;
  color: white;
  border-radius: 5px;
  background-color: var(--accent-color);
}
</style>
