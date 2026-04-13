import type { FavoriteGame, GameSummary, RawgPlatformEntry } from '@/types/game';

export const FALLBACK_GAME_IMAGE =
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';

export function getPlatformNames(platforms: RawgPlatformEntry[]): string[] {
  return platforms.map((entry) => entry.platform.name);
}

export function formatPlatforms(platforms: RawgPlatformEntry[], max = 3): string {
  const names = getPlatformNames(platforms);

  if (names.length === 0) {
    return 'Platform info unavailable';
  }

  return names.slice(0, max).join(' • ');
}

export function toFavoriteGame(game: GameSummary): FavoriteGame {
  return {
    id: game.id,
    name: game.name,
    slug: game.slug,
    backgroundImage: game.background_image,
    rating: game.rating,
    released: game.released,
  };
}
