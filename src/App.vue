<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "./components/Header-Footer/Header.vue";
import AppFooter from "./components/Header-Footer/Footer.vue";

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter
  },
  created() {
    this.$store.dispatch("admin/refreshToken");
  }
};
</script>

<style>
@import "./assets/style.css";
</style>
