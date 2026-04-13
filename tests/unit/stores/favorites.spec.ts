import { setActivePinia, createPinia } from 'pinia';
import { useFavoritesStore } from '@/stores/favorites';
import type { GameSummary } from '@/types/game';

const game: GameSummary = {
  id: 3498,
  slug: 'grand-theft-auto-v',
  name: 'Grand Theft Auto V',
  released: '2013-09-17',
  background_image: 'https://example.com/gta-v.jpg',
  rating: 4.5,
  platforms: [{ platform: { id: 4, name: 'PC', slug: 'pc' } }],
};

describe('favorites store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
  });

  it('starts with an empty favorites list', () => {
    const store = useFavoritesStore();

    expect(store.favorites).toEqual([]);
  });

  it('adds a game to favorites', () => {
    const store = useFavoritesStore();

    store.addFavorite(game);

    expect(store.favorites).toHaveLength(1);
  });

  it('stores the favorite name', () => {
    const store = useFavoritesStore();

    store.addFavorite(game);

    expect(store.favorites[0]?.name).toBe('Grand Theft Auto V');
  });

  it('prevents duplicate favorites', () => {
    const store = useFavoritesStore();

    store.addFavorite(game);
    store.addFavorite(game);

    expect(store.favorites).toHaveLength(1);
  });

  it('marks a saved game as favorite', () => {
    const store = useFavoritesStore();

    store.addFavorite(game);

    expect(store.isFavorite(game.id)).toBe(true);
  });

  it('removes a saved game', () => {
    const store = useFavoritesStore();

    store.addFavorite(game);
    store.removeFavorite(game.id);

    expect(store.favorites).toEqual([]);
  });

  it('toggles a game off when it is already saved', () => {
    const store = useFavoritesStore();

    store.toggleFavorite(game);
    store.toggleFavorite(game);

    expect(store.favorites).toEqual([]);
  });

  it('persists favorites to localStorage', () => {
    const store = useFavoritesStore();

    store.addFavorite(game);

    expect(window.localStorage.getItem('gamespot:favorites')).toContain('Grand Theft Auto V');
  });

  it('hydrates favorites from localStorage', () => {
    window.localStorage.setItem(
      'gamespot:favorites',
      JSON.stringify([
        {
          id: game.id,
          slug: game.slug,
          name: game.name,
          backgroundImage: game.background_image,
          rating: game.rating,
          released: game.released,
        },
      ])
    );

    const store = useFavoritesStore();

    expect(store.favorites).toHaveLength(1);
  });
});
