<template>
  <nav>
    <Logo />
    <ul>
      <li v-if="isAuth">
        <router-link :to="{ name: 'account' }">Account</router-link>
      </li>
      <li v-if="!isAuth">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li v-else>
        <button @click="logout" class="logout">Logout</button>
      </li>
      <li class="register" v-if="!isAuth">
        <router-link :to="{ name: 'register' }"
          ><button>Get Started</button></router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import Logo from './Logo.vue'
import { isAuth, useLogout } from '../store/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  useLogout()
  router.push({ name: 'home' })
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 1rem 10rem;

  margin-top: 1rem;
  margin-bottom: 5rem;

  a,
  a:visited,
  a:active {
    color: rgba(0, 0, 0, 1);
    text-decoration: none;
  }

  .router-link-exact-active {
    border-bottom: 3px solid var(--accent-color);
  }
}

nav ul {
  display: flex;
  align-items: center;
}

li {
  margin-left: 2rem;
}

.register button {
  padding: 1rem 2rem;
  font-weight: 700;
  color: var(--text-on-accent-color);
  background-color: var(--accent-color);
}

.logout {
  line-height: 14px;
}
</style>
