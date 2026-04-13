<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { GameSummary } from '@/types/game';
import FavoriteButton from '@/components/game/FavoriteButton.vue';
import { FALLBACK_GAME_IMAGE, formatPlatforms } from '@/utils/game';

const props = defineProps<{
  game: GameSummary;
  isFavorite: boolean;
}>();

defineEmits<{
  toggleFavorite: [game: GameSummary];
}>();

const imageUrl = computed(() => props.game.background_image || FALLBACK_GAME_IMAGE);
const platformLabel = computed(() => formatPlatforms(props.game.platforms));
</script>

<template>
  <article
    class="group overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 shadow-soft transition hover:-translate-y-1 hover:shadow-xl"
  >
    <RouterLink :to="{ name: 'game-details', params: { id: game.id } }" class="block">
      <img :src="imageUrl" :alt="game.name" class="h-48 w-full object-cover" loading="lazy" />
    </RouterLink>

    <div class="space-y-4 bg-gradient-to-b from-white/18 to-black/10 p-4 backdrop-blur-[2px]">
      <div class="flex items-start justify-between gap-4">
        <div>
          <RouterLink
            :to="{ name: 'game-details', params: { id: game.id } }"
            class="text-lg font-semibold text-white transition group-hover:text-orange-100"
          >
            {{ game.name }}
          </RouterLink>
          <p class="mt-1 text-sm text-orange-50/90">{{ platformLabel }}</p>
        </div>
        <FavoriteButton :active="isFavorite" @toggle="$emit('toggleFavorite', game)" />
      </div>

      <div class="flex items-center justify-between text-sm text-orange-50/90">
        <span>Rating</span>
        <span class="font-medium text-white">{{ game.rating.toFixed(1) }}</span>
      </div>
    </div>
  </article>
</template>
