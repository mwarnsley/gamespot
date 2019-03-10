<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <router-link
          exact
          to="/"
        >
          Gamespot
        </router-link>
      </div>
      <div
        class="login"
        v-if="!isAuth"
      >
        <router-link
          exact
          to="/login"
        >
          <img :src="require('../../assets/images/login.png')" />
        </router-link>
      </div>
      <div v-if="isAuth">
        <ul>
          <li>
            <router-link
              exact
              to="/dashboard"
            >Dashboard</router-link>
          </li>
          <li @click="logoutUser">Logout</li>
        </ul>
      </div>
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
