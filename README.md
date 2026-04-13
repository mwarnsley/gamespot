# Gamespot

A small portfolio-style Vue 3 application for discovering video games with the RAWG API. Users can search for games, browse a responsive result grid, open a game details page, and save favorites locally. The interface is intentionally bright and warm-toned, with a white background and orange-red cards that feel more energetic than the earlier blue-heavy direction.

## Features

- Debounced game search powered by the RAWG API
- Responsive game grid with image, title, rating, and platforms
- Game details page with description, release date, rating, genres, and screenshots
- Favorites saved locally with Pinia and `localStorage`
- Loading, empty, and error states for the main flows

## Tech Stack

- Vue 3 with Composition API
- Vite
- TypeScript
- Vue Router 4
- Pinia
- Tailwind CSS
- Axios
- Vitest
- Vue Test Utils

## Project Structure

```text
src/
  api/
    rawg.ts
  assets/
  components/
    game/
    ui/
  composables/
  router/
    index.ts
  stores/
    favorites.ts
  types/
  utils/
  views/
    HomeView.vue
    GameDetailsView.vue

tests/
  unit/
    components/
    stores/
    utils/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add your RAWG API key in `.env`:

```bash
VITE_RAWG_API_KEY=your_rawg_api_key
```

3. Start the development server:

```bash
npm run dev
```

## Environment Variables

- `VITE_RAWG_API_KEY`: RAWG API key used for search and game details requests

The `.env` file is ignored by git and should stay local.

## Available Scripts

- `npm run dev`: Start the Vite development server
- `npm run build`: Type-check and create a production build
- `npm run preview`: Preview the production build locally
- `npm run test`: Run the unit test suite once
- `npm run test:ui`: Open the Vitest UI
- `npm run lint`: Run a lightweight TypeScript check

## Development Notes

- API logic is isolated in `src/api/rawg.ts`
- Search state and async fetching are handled in `src/composables/useGames.ts`
- Favorites are managed in `src/stores/favorites.ts`
- Shared styling tokens live in `tailwind.config.ts`
- Tailwind is used for all app styling, with no heavy component framework

## Testing

Unit tests currently cover:

- `GameCard` rendering
- Debounced search input behavior
- Favorites store persistence and toggling
- Shared utility helpers

Run tests with:

```bash
npm run test
```

## Cleanup

Unused legacy Vue 2 files and folders from the earlier version of the project were removed so the repository now reflects only the current Vite-based implementation and its tests/configuration.

## API Attribution

Game data is provided by the [RAWG Video Games Database API](https://rawg.io/apidocs).
