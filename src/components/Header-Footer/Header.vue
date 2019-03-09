<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <a href="/">
          Gamespot
        </a>
      </div>
      <div class="login">
        <a href="/login">
          <img :src="require('../../assets/images/login.png')" />
        </a>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  name: "Header"
};
</script>
