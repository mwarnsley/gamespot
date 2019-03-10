<template>
  <div class="cotnainer">
    <div class="signin_container">
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <div class="input_field">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="formData.email"
          />
        </div>
        <div class="input_field">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="formData.password"
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formData: {
        email: "marcus.warnsley@gmail.com",
        password: "marcus1234"
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("admin/login", this.formData);
    }
  }
};
</script>
