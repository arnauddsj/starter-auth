<template>
  <div class="divider">
    <hr class="divider__left" />
    <div class="divider__text">
      <slot>or</slot>
    </div>
    <hr class="divider__right" />
  </div>
</template>

<style lang="scss" scope>
.divider {
  display: flex;
  align-items: center;
  margin-block: 3rem;
}

.divider__left {
  flex-grow: 1;
  margin: 0;
}
.divider__right {
  flex-grow: 1;
  margin: 0;
}

.divider__text {
  padding-inline: 2rem;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  clear: both;
}
</style>
