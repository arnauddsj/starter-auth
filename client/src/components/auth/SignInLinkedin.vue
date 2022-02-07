<template>
  <div>
    <button @click="signIn" class="login__btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
        />
      </svg>
      <span> Sign in with Linkedin </span>
    </button>
  </div>
</template>
<script setup>
const signIn = () => {
  window.open(`${import.meta.env.VITE_API_URL}/auth/linkedin`, '_self')
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
  border: 2px solid #0077b5;
  color: #0077b5;

  span {
    margin-left: 2em;
  }

  svg {
    position: absolute;
    left: 1.5em;
    height: 19px;
    fill: #0077b5;
  }

  &:hover {
    color: white;
    background-color: #0077b5;

    svg > path {
      fill: rgb(255, 255, 255);
    }
  }

  &:active {
    color: white;
    background-color: #0077b5;
  }
}
</style>
