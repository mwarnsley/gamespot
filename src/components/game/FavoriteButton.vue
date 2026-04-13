<script setup lang="ts">
defineProps<{
  active: boolean;
}>();

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <button
    type="button"
    class="rounded-full border border-orange-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-orange-700 transition hover:border-orange-500 hover:bg-orange-50"
    @click.stop="$emit('toggle')"
  >
    {{ active ? 'Saved' : 'Save' }}
  </button>
</template>
