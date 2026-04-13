import { mount } from '@vue/test-utils';
import SearchInput from '@/components/ui/SearchInput.vue';

describe('SearchInput', () => {
  it('renders the provided placeholder', () => {
    const wrapper = mount(SearchInput, {
      props: {
        placeholder: 'Search for games',
      },
    });

    expect(wrapper.get('input').attributes('placeholder')).toBe('Search for games');
  });

  it('emits update:modelValue immediately when typing', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        delay: 300,
      },
    });

    await wrapper.get('input').setValue('Halo');

    expect(wrapper.emitted('update:modelValue')).toEqual([['Halo']]);
  });

  it('does not emit search before the debounce delay', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        delay: 300,
      },
    });

    await wrapper.get('input').setValue('Halo');
    vi.advanceTimersByTime(299);

    expect(wrapper.emitted('search')).toBeUndefined();

    vi.useRealTimers();
  });

  it('emits search after the debounce delay', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        delay: 300,
      },
    });

    await wrapper.get('input').setValue('Halo');
    vi.advanceTimersByTime(300);

    expect(wrapper.emitted('search')).toEqual([['Halo']]);

    vi.useRealTimers();
  });

  it('only emits the latest search value when typing quickly', async () => {
    vi.useFakeTimers();

    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
        delay: 300,
      },
    });

    await wrapper.get('input').setValue('Ha');
    vi.advanceTimersByTime(150);
    await wrapper.get('input').setValue('Halo');
    vi.advanceTimersByTime(300);

    expect(wrapper.emitted('search')).toEqual([['Halo']]);

    vi.useRealTimers();
  });
});
