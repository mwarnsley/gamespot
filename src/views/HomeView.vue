<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GameCard from '@/components/game/GameCard.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import { useGames } from '@/composables/useGames';
import { useFavoritesStore } from '@/stores/favorites';
import type { GameSummary } from '@/types/game';

const query = ref('zelda');
const favoritesStore = useFavoritesStore();
const { games, isLoading, errorMessage, activeQuery, runSearch } = useGames(query.value);

function toggleFavorite(game: GameSummary) {
  favoritesStore.toggleFavorite(game);
}

onMounted(() => {
  void runSearch(query.value);
});
</script>

<template>
  <section class="space-y-8">
    <div
      class="overflow-hidden rounded-[2rem] border border-orange-200 bg-gradient-to-br from-white via-orange-50 to-amber-100 p-6 shadow-soft sm:p-8"
    >
      <p class="text-sm uppercase tracking-[0.3em] text-orange-600">Portfolio Project</p>
      <h1 class="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        Discover your next favorite game.
      </h1>
      <p class="mt-4 max-w-2xl text-base text-slate-600">
        Search the RAWG catalog, scan the essentials, and save games locally for a quick shortlist.
      </p>

      <div class="mt-8 max-w-xl">
        <SearchInput
          v-model="query"
          placeholder="Search for Elden Ring, Halo, Stardew Valley..."
          @search="runSearch"
        />
      </div>
    </div>

    <section class="space-y-4">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-slate-950">Search Results</h2>
          <p class="mt-1 text-sm text-slate-600">
            {{ activeQuery ? `Showing games for "${activeQuery}"` : 'Start typing to search.' }}
          </p>
        </div>
        <div class="rounded-full border border-orange-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm">
          {{ favoritesStore.favorites.length }} saved
        </div>
      </div>

      <div v-if="isLoading" class="flex items-center gap-3 rounded-3xl border border-orange-200 bg-white p-5 shadow-soft">
        <BaseSpinner />
        <p class="text-sm text-slate-700">Loading games...</p>
      </div>

      <EmptyState
        v-else-if="errorMessage"
        title="Something went wrong"
        :description="errorMessage"
      />

      <EmptyState
        v-else-if="!games.length"
        title="No games found"
        description="Try a different title, franchise, or genre keyword."
      />

      <div v-else class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <GameCard
          v-for="game in games"
          :key="game.id"
          :game="game"
          :is-favorite="favoritesStore.isFavorite(game.id)"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </section>

    <section class="space-y-4">
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-xl font-semibold text-slate-950">Favorites</h2>
        <p class="text-sm text-slate-600">Stored locally in your browser.</p>
      </div>

      <EmptyState
        v-if="!favoritesStore.favorites.length"
        title="No favorites yet"
        description="Save a few games and they will appear here."
      />

      <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="favorite in favoritesStore.favorites"
          :key="favorite.id"
          class="rounded-3xl border border-orange-200 bg-white p-4 shadow-soft"
        >
          <RouterLink
            :to="{ name: 'game-details', params: { id: favorite.id } }"
            class="text-base font-semibold text-slate-900 transition hover:text-orange-600"
          >
            {{ favorite.name }}
          </RouterLink>
          <p class="mt-2 text-sm text-slate-600">
            Released {{ favorite.released || 'Unknown' }}
          </p>
          <button
            type="button"
            class="mt-4 text-sm font-medium text-red-500 transition hover:text-red-600"
            @click="favoritesStore.removeFavorite(favorite.id)"
          >
            Remove
          </button>
        </article>
      </div>
    </section>
  </section>
</template>
