<template>
  <teleport to="body" v-if="stateLoading.loading">
    <Loading />
  </teleport>
  <Navbar v-if="!route.meta.hideNavigation" />
  <div class="app-wrapper flex-col-center">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script setup>
import { onErrorCaptured, onBeforeMount, inject } from 'vue'
import { useRoute } from 'vue-router'
import { storeLoading } from './store/loadingHandler'
import { authCheck } from './store/user'

import Loading from './components/layout/Loading.vue'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

const route = useRoute()
const { stateLoading } = storeLoading()

const toast = inject(['moshaToast'])

onErrorCaptured((e) => {
  return toast(e.message, {
    position: 'bottom-right',
    transition: 'bounce',
    showIcon: 'true',
    type: 'danger',
    timeout: 3000,
  })
})

onBeforeMount(async () => {
  // Check if user is logged-in
  await authCheck()
})
</script>

<style lang="scss">
:root {
  --accent-color: rgb(41, 166, 216);
  --text-on-accent-color: white;
  --text-error: rgba(255, 0, 85, 0.733);
  --body-txt-color: #2e3d3d;
  --body-bg: #f9fdfd;

  --min-desktop-width: 90%;
  --max-desktop-width: 148rem;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  line-height: 2.2em;
  font-size: 62.5%; // 10px/16px = 62.5% -> 1rem = 10px
}

body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  font-size: 1.6rem;
  font-weight: 400;

  font-family: 'Ubuntu', helvetica, arial, sans-serif;
  color: var(--body-txt-color);
  background-color: var(--body-bg);

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
    font-size: 1.6rem;
    background: none;
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
  }
}

// GENERAL CLASSES
h1,
h2,
h3 {
  font-weight: 900;
  line-height: 1; // Let picture shrink but not get oversized.
}

.text-center {
  text-align: center;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-row-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-size {
  width: min(var(--min-desktop-width), var(--max-desktop-width));
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  label {
    font-size: 1.4rem;

    &:not(:first-child) {
      margin-top: 1.5rem;
    }
  }

  input {
    height: 2.5rem;
    padding: 1.7rem 0.8rem;
    margin-top: 0.6rem;
    font-size: 1.6rem;
  }

  button {
    padding: 1.2rem 1rem;
    font-weight: 800;
    color: var(--text-on-accent-color);
    background-color: var(--accent-color);

    &:hover {
      background-color: rgb(12, 117, 158);
    }

    &:active {
      background-color: #616161;
    }
  }
}

// Inputs general class
.input-wrapper {
  display: flex;
  flex-direction: column;
}

.input__error {
  font-size: 1.4rem;
  margin-top: 0.5em;
  color: var(--text-error);
}

.label__error {
  color: var(--text-error);
}

// App classes
#app {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.app-wrapper {
  width: 100%;
  flex: 1 0 auto;
}
</style>
