<template>
  <div class="loading-container">
    <div class="loading-wrapper">
      <div class="loading__content">
        <!-- <div>
          <img src="/loading.png" alt="loading" class="loading__img" />
        </div> -->
        <div>
          <h1>LOADING</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.loading-container {
  position: fixed;
  z-index: 99;
  overflow-y: auto;
  background: white;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
}

.loading__content {
  transform: translateY(-10rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h1 {
    margin-bottom: 1rem;
  }
}

.loading__img {
  width: 12rem;
}
</style>
