<template>
  <div class="text-center">
    <h3 class="margin-bottom-2">Recovery Link Sent</h3>
    <div>
      If account exists, an email will be sent with further instructions.
    </div>
    <p>
      <router-link :to="{ name: 'home' }">Back to website home.</router-link>
    </p>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 5rem;
}

form {
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.3rem;

    &:not(:first-child) {
      margin-top: 1.5rem;
    }
  }

  input {
    height: 2.5rem;
    padding: 1.5rem 0.8rem;
    margin-top: 0.6rem;
  }

  button {
    margin-top: 2rem;
    padding: 1rem 1rem;

    font-weight: 800;
    color: var(--text-on-accent-color);
    background-color: var(--accent-color);
  }
}

p {
  margin-top: 1rem;
  font-size: 1.3rem;
  text-align: center;
}
</style>
