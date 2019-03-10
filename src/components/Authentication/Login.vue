<template>
  <div class="cotnainer">
    <div class="signin_container">
      <h1>Login</h1>
      <form @submit.prevent="onSubmit">
        <div
          class="input_field"
          :class="{ invalid: $v.formData.email.$error }"
        >
          <label for="email">Email</label>
          <input
            @blur="$v.formData.email.$touch()"
            type="email"
            v-model="formData.email"
          />
          <div v-if="$v.formData.email.$error">
            <p
              class="error_label"
              v-if="!$v.formData.email.required"
            >
              This field is required
            </p>
          </div>
        </div>
        <div
          class="input_field"
          :class="{ invalid: $v.formData.password.$error }"
        >
          <label for="password">Password</label>
          <input
            @blur="$v.formData.password.$touch()"
            type="password"
            v-model="formData.password"
          />
          <div v-if="$v.formData.password.$error">
            <p
              class="error_label"
              v-if="!$v.formData.password.required"
            >
              This field is required
            </p>
          </div>
        </div>
        <button type="submit">Log in</button>

        <p
          class="error_label"
          v-if="error"
        >
          Something went wrong
        </p>
        <p
          class="error_label"
          v-if="authFailed"
        >
          Please check your email and password
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      error: false,
      formData: {
        email: "marcus@gmail.com",
        password: "marcu1234"
      }
    };
  },
  destroyed() {
    this.$store.commit("admin/authFailed", "reset");
  },
  computed: {
    authFailed() {
      return this.$store.state.admin.authFailed;
    }
  },
  validations: {
    formData: {
      email: {
        email,
        required
      },
      password: {
        minLength: minLength(4),
        required
      }
    }
  },
  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("admin/login", this.formData);
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    }
  }
};
</script>


<style>
.input_field.invalid input,
.input_field.invalid select {
  border: 1px solid red;
}
</style>
