export interface RawgPlatformEntry {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface RawgGenre {
  id: number;
  name: string;
  slug: string;
}

export interface RawgScreenshot {
  id: number;
  image: string;
}

export interface GameSummary {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  background_image: string | null;
  rating: number;
  platforms: RawgPlatformEntry[];
}

export interface GameDetails extends GameSummary {
  description_raw: string;
  genres: RawgGenre[];
  screenshots: RawgScreenshot[];
}

export interface RawgSearchResponse {
  results: GameSummary[];
}

export interface FavoriteGame {
  id: number;
  name: string;
  slug: string;
  backgroundImage: string | null;
  rating: number;
  released: string | null;
}
