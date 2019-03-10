<template>
  <div>
    <Featured />
    <Content />
  </div>
</template>

<script>
import Featured from "./Featured.vue";
import Content from "./Content.vue";

export default {
  name: "Home",
  components: {
    Featured,
    Content
  }
};
</script>
