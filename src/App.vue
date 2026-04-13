<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-canvas text-slate-900">
    <header class="border-b border-orange-200/80 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <RouterLink to="/" class="text-xl font-semibold tracking-tight text-slate-950">
          Gamespot
        </RouterLink>
        <nav class="flex items-center gap-4 text-sm text-slate-600">
          <RouterLink to="/" class="transition hover:text-orange-600">Discover</RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
