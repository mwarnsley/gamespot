import axios from 'axios';
import type { GameDetails, RawgScreenshot, RawgSearchResponse } from '@/types/game';

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

const rawgClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: apiKey,
  },
});

function assertApiKey(): void {
  if (!apiKey) {
    throw new Error('Missing RAWG API key. Add VITE_RAWG_API_KEY to your environment.');
  }
}

export async function searchGames(query: string) {
  assertApiKey();

  const { data } = await rawgClient.get<RawgSearchResponse>('/games', {
    params: {
      search: query,
      page_size: 12,
    },
  });

  return data.results;
}

export async function getGameDetails(id: string | number): Promise<GameDetails> {
  assertApiKey();

  const [detailsResponse, screenshotsResponse] = await Promise.all([
    rawgClient.get<Omit<GameDetails, 'screenshots'>>(`/games/${id}`),
    rawgClient.get<{ results: RawgScreenshot[] }>(`/games/${id}/screenshots`),
  ]);

  return {
    ...detailsResponse.data,
    screenshots: screenshotsResponse.data.results ?? [],
  };
}
