<template>
  <div v-if="type === 'link'">
    <router-link
      :class="['button_default', ...addClass]"
      :to="linkTo"
      :style="overrideStyles"
    >
      <slot />
    </router-link>

    <div
      :class="['button_default', ...addClass]"
      :style="overrideStyles"
      v-if="type === 'btn'"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ["action", "addClass", "linkTo", "overrideStyles", "type"]
};
</script>
