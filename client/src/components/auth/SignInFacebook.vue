<template>
  <div>
    <button @click="signIn" class="login__btn">
      <svg
        width="13"
        height="25"
        viewBox="0 0 13 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.42584 25V13.6122H12.2649L12.8401 9.15483H8.42584V6.31593C8.42584 5.02847 8.78328 4.15109 10.6295 4.15109H12.9695V0.175129C12.5623 0.121069 11.1655 0 9.54046 0C6.14712 0 3.8247 2.07051 3.8247 5.87451V9.15483H0V13.6122H3.8247V25H8.42584Z"
        />
      </svg>
      <span>Sign in with Facebook</span>
    </button>
  </div>
</template>
<script setup>
const signIn = () => {
  window.open(`${import.meta.env.VITE_API_URL}/auth/facebook`, '_self')
}
</script>
<style lang="scss" scoped>
.login__btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 1rem 3rem 1rem 3rem;
  font-size: 1.6rem;
  font-weight: 800;
  border: 2px solid #4267b2;
  color: #4267b2;

  span {
    margin-left: 1.2em;
  }

  svg {
    position: absolute;
    left: 1.7em;
    height: 18px;
    fill: #4267b2;
  }

  &:hover {
    color: white;
    background-color: #4267b2;

    svg {
      fill: white;
    }
  }

  &:active {
    color: white;
    background-color: #4267b2;
  }
}
</style>
