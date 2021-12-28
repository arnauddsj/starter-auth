<template>
  <teleport to="body" v-if="stateLoading.loading">
    <div class="loading-container">
      <div class="loading-wrapper">
        <div class="loading-content"><h1>LOADING</h1></div>
      </div>
    </div>
  </teleport>
  <router-view></router-view>
</template>

<script setup>
import { onErrorCaptured } from 'vue'
import { storeLoading } from './store/loadingHandler'
import { setError } from './store/errorHandler'

const { stateLoading } = storeLoading()

onErrorCaptured((e) => {
  setError(e)
  return true
})
</script>

<style lang="scss">
:root {
  --accent-color: rgb(12, 126, 172);
  --text-on-accent-color: white;
  --body: #f9f9f9;
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
  background-color: var(--body);

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
}

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-container {
  margin-top: 5rem;
  color: red;
}

.validation-error {
  margin-top: 1rem;
  color: red;
  font-size: 1.2rem;
}

.loading-container {
  position: fixed;
  z-index: 99;
  overflow-y: auto;
  background: var(--body);
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.loading-content {
  transform: translateY(-10rem);
  display: flex;
  overflow: hidden;
}
</style>
