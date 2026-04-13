import { ref } from 'vue';
import { searchGames } from '@/api/rawg';
import type { GameSummary } from '@/types/game';

export function useGames(initialQuery = 'zelda') {
  const games = ref<GameSummary[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref('');
  const activeQuery = ref(initialQuery);

  async function runSearch(query: string) {
    const normalizedQuery = query.trim();
    activeQuery.value = normalizedQuery;

    if (!normalizedQuery) {
      games.value = [];
      errorMessage.value = '';
      isLoading.value = false;
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    try {
      games.value = await searchGames(normalizedQuery);
    } catch (error) {
      console.error(error);
      errorMessage.value = 'We could not load games right now. Please try again.';
    } finally {
      isLoading.value = false;
    }
  }

  return {
    games,
    isLoading,
    errorMessage,
    activeQuery,
    runSearch,
  };
}
