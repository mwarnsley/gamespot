<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <router-link to="/">
          Gamespot
        </router-link>
      </div>
      <div
        class="login"
        v-if="!isAuth"
      >
        <router-link to="/login">
          <img :src="require('../../assets/images/login.png')" />
        </router-link>
      </div>
    </div>
    <div v-if="isAuth">
      <ul>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li @click="logoutUser">Logout</li>
      </ul>
    </div>
  </header>
</template>


<script>
export default {
  name: "Header",
  computed: {
    isAuth() {
      return this.$store.getters["admin/isAuth"];
    }
  },
  methods: {
    logoutUser() {
      this.$store.commit("admin/logoutUser");
    }
  }
};
</script>
