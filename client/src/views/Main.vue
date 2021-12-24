<template>
  <div class="app-container">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Nav from '../components/Nav.vue'
</script>

<style lang="scss">
:root {
  --accent-color: rgb(12, 126, 172);
  --text-on-accent-color: white;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%; // 10px/16px = 62.5% -> 1rem = 10px
}

body {
  height: 100vh;
  font-size: 1.6rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9f9f9;

  * > li {
    list-style: none;
  }

  a,
  a:visited,
  a:active {
    color: var(--accent-color);
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }
}

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
