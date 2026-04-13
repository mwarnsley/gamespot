import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { FavoriteGame, GameSummary } from '@/types/game';
import { readStorage, writeStorage } from '@/utils/storage';
import { toFavoriteGame } from '@/utils/game';

const FAVORITES_STORAGE_KEY = 'gamespot:favorites';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<FavoriteGame[]>(readStorage<FavoriteGame[]>(FAVORITES_STORAGE_KEY, []));

  const favoriteIds = computed(() => new Set(favorites.value.map((game) => game.id)));

  function persist() {
    writeStorage(FAVORITES_STORAGE_KEY, favorites.value);
  }

  function isFavorite(gameId: number) {
    return favoriteIds.value.has(gameId);
  }

  function addFavorite(game: GameSummary | FavoriteGame) {
    if (isFavorite(game.id)) {
      return;
    }

    favorites.value = [...favorites.value, 'backgroundImage' in game ? game : toFavoriteGame(game)];
    persist();
  }

  function removeFavorite(gameId: number) {
    favorites.value = favorites.value.filter((game) => game.id !== gameId);
    persist();
  }

  function toggleFavorite(game: GameSummary | FavoriteGame) {
    if (isFavorite(game.id)) {
      removeFavorite(game.id);
      return;
    }

    addFavorite(game);
  }

  return {
    favorites,
    favoriteIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
});
