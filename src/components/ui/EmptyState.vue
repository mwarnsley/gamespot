<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="rounded-3xl border border-dashed border-orange-200 bg-white/85 p-8 text-center shadow-soft">
    <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
    <p class="mt-2 text-sm text-slate-600">{{ description }}</p>
  </div>
</template>
