<template>
  <nav>
    <div class="nav-wrapper container-size">
      <Logo />
      <div class="menu-items">
        <ul>
          <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'user-profile' }">Profile</router-link>
          </li>
        </ul>
      </div>
      <userAccount class="menu-member"></userAccount>
    </div>
  </nav>
</template>

<script setup>
import Logo from './Logo.vue'
import userAccount from './userAccount.vue'
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: center;
  padding: 1rem 0;

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

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(60, 73, 73, 0.09);
}

.nav-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

nav ul {
  display: flex;
  align-items: center;
}

li {
  margin-left: 5rem;
  font-size: 1.8rem;
}

.register button {
  padding: 1rem 2rem;
  font-weight: 700;
  color: var(--text-on-accent-color);
  background-color: var(--accent-color);
}
</style>
