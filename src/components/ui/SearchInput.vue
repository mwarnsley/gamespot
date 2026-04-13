<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    delay?: number;
    placeholder?: string;
  }>(),
  {
    modelValue: '',
    delay: 400,
    placeholder: 'Search games',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  search: [value: string];
}>();

const localValue = ref(props.modelValue);
let timeoutId: number | undefined;

watch(
  () => props.modelValue,
  (nextValue) => {
    localValue.value = nextValue;
  }
);

watch(localValue, (nextValue) => {
  emit('update:modelValue', nextValue);

  window.clearTimeout(timeoutId);
  timeoutId = window.setTimeout(() => {
    emit('search', nextValue);
  }, props.delay);
});

onBeforeUnmount(() => {
  window.clearTimeout(timeoutId);
});
</script>

<template>
  <label class="block">
    <span class="sr-only">Search games</span>
    <input
      v-model="localValue"
      type="search"
      :placeholder="placeholder"
      class="w-full rounded-2xl border-orange-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-accent focus:ring-accent"
    />
  </label>
</template>
