import { mount } from '@vue/test-utils';
import GameCard from '@/components/game/GameCard.vue';
import type { GameSummary } from '@/types/game';

const game: GameSummary = {
  id: 3328,
  slug: 'the-witcher-3-wild-hunt',
  name: 'The Witcher 3: Wild Hunt',
  released: '2015-05-18',
  background_image: 'https://example.com/witcher.jpg',
  rating: 4.7,
  platforms: [
    { platform: { id: 4, name: 'PC', slug: 'pc' } },
    { platform: { id: 187, name: 'PlayStation 5', slug: 'playstation5' } },
  ],
};

describe('GameCard', () => {
  it('renders the game title', () => {
    const wrapper = mount(GameCard, {
      props: {
        game,
        isFavorite: false,
      },
    });

    expect(wrapper.text()).toContain('The Witcher 3: Wild Hunt');
  });

  it('renders the formatted platform list', () => {
    const wrapper = mount(GameCard, {
      props: {
        game,
        isFavorite: false,
      },
    });

    expect(wrapper.text()).toContain('PC');
    expect(wrapper.text()).toContain('PlayStation 5');
  });

  it('renders the rating with one decimal place', () => {
    const wrapper = mount(GameCard, {
      props: {
        game,
        isFavorite: false,
      },
    });

    expect(wrapper.text()).toContain('4.7');
  });

  it('shows the saved label when the game is already a favorite', () => {
    const wrapper = mount(GameCard, {
      props: {
        game,
        isFavorite: true,
      },
    });

    expect(wrapper.text()).toContain('Saved');
  });

  it('emits the selected game when the favorite button is clicked', async () => {
    const wrapper = mount(GameCard, {
      props: {
        game,
        isFavorite: false,
      },
    });

    await wrapper.get('button').trigger('click');

    expect(wrapper.emitted('toggleFavorite')).toEqual([[game]]);
  });
});
