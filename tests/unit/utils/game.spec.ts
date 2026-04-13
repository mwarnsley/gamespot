import { formatPlatforms, getPlatformNames, toFavoriteGame } from '@/utils/game';
import type { GameSummary } from '@/types/game';

const game: GameSummary = {
  id: 1,
  slug: 'sample-game',
  name: 'Sample Game',
  released: '2024-10-01',
  background_image: 'https://example.com/sample.jpg',
  rating: 4.2,
  platforms: [
    { platform: { id: 1, name: 'PC', slug: 'pc' } },
    { platform: { id: 2, name: 'Xbox Series S/X', slug: 'xbox-series-x' } },
    { platform: { id: 3, name: 'PlayStation 5', slug: 'playstation5' } },
  ],
};

describe('game utils', () => {
  it('returns platform names', () => {
    expect(getPlatformNames(game.platforms)).toEqual(['PC', 'Xbox Series S/X', 'PlayStation 5']);
  });

  it('formats a short platform string', () => {
    expect(formatPlatforms(game.platforms, 2)).toBe('PC • Xbox Series S/X');
  });

  it('returns a fallback label when platforms are missing', () => {
    expect(formatPlatforms([])).toBe('Platform info unavailable');
  });

  it('maps a game summary into a favorite shape', () => {
    expect(toFavoriteGame(game)).toEqual({
      id: 1,
      name: 'Sample Game',
      slug: 'sample-game',
      backgroundImage: 'https://example.com/sample.jpg',
      rating: 4.2,
      released: '2024-10-01',
    });
  });
});
