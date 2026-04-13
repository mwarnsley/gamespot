<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getGameDetails } from '@/api/rawg';
import FavoriteButton from '@/components/game/FavoriteButton.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import { useFavoritesStore } from '@/stores/favorites';
import type { GameDetails } from '@/types/game';
import { FALLBACK_GAME_IMAGE } from '@/utils/game';

const route = useRoute();
const favoritesStore = useFavoritesStore();

const game = ref<GameDetails | null>(null);
const isLoading = ref(true);
const errorMessage = ref('');

const heroImage = computed(() => game.value?.background_image || FALLBACK_GAME_IMAGE);

async function loadGame() {
  const gameId = route.params.id;

  if (!gameId) {
    errorMessage.value = 'No game was selected.';
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    game.value = await getGameDetails(String(gameId));
  } catch (error) {
    console.error(error);
    errorMessage.value = 'We could not load that game right now. Please try again.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  void loadGame();
});
</script>

<template>
  <div v-if="isLoading" class="flex items-center gap-3 rounded-3xl border border-orange-200 bg-white p-5 shadow-soft">
    <BaseSpinner />
    <p class="text-sm text-slate-700">Loading game details...</p>
  </div>

  <EmptyState
    v-else-if="errorMessage"
    title="Unable to load game"
    :description="errorMessage"
  />

  <section v-else-if="game" class="space-y-8">
    <div class="overflow-hidden rounded-[2rem] border border-orange-200 bg-surface shadow-soft">
      <img :src="heroImage" :alt="game.name" class="h-72 w-full object-cover sm:h-96" />
      <div class="space-y-6 p-6 sm:p-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-orange-600">Game Overview</p>
            <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {{ game.name }}
            </h1>
          </div>
          <FavoriteButton
            :active="favoritesStore.isFavorite(game.id)"
            @toggle="favoritesStore.toggleFavorite(game)"
          />
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <p class="text-sm text-slate-500">Released</p>
            <p class="mt-2 font-medium text-slate-900">{{ game.released || 'Unknown' }}</p>
          </div>
          <div class="rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <p class="text-sm text-slate-500">Rating</p>
            <p class="mt-2 font-medium text-slate-900">{{ game.rating.toFixed(1) }}</p>
          </div>
          <div class="rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:col-span-2">
            <p class="text-sm text-slate-500">Genres</p>
            <p class="mt-2 font-medium text-slate-900">
              {{ game.genres.map((genre) => genre.name).join(', ') || 'No genres listed' }}
            </p>
          </div>
        </div>

        <div class="space-y-3">
          <h2 class="text-xl font-semibold text-slate-950">Description</h2>
          <p class="max-w-3xl whitespace-pre-line text-sm leading-7 text-slate-700">
            {{ game.description_raw || 'No description available.' }}
          </p>
        </div>
      </div>
    </div>

    <section class="space-y-4">
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold text-slate-950">Screenshots</h2>
        <p class="text-sm text-slate-600">{{ game.screenshots.length }} available</p>
      </div>

      <EmptyState
        v-if="!game.screenshots.length"
        title="No screenshots available"
        description="RAWG did not return screenshots for this game."
      />

      <div v-else class="grid gap-4 md:grid-cols-2">
        <img
          v-for="screenshot in game.screenshots.slice(0, 4)"
          :key="screenshot.id"
          :src="screenshot.image"
          :alt="`${game.name} screenshot ${screenshot.id}`"
          class="h-64 w-full rounded-3xl border border-orange-200 object-cover shadow-soft"
          loading="lazy"
        />
      </div>
    </section>
  </section>
</template>
