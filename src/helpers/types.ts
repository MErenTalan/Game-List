export type CategoryType =
  | 'mmorpg'
  | 'shooter'
  | 'strategy'
  | 'action'
  | 'racing'
  | 'sports'
  | 'mmo'
  | 'survival'
  | 'social';
export type PlatformType = 'pc' | 'browser' | 'all';
export type SortByValues =
  | 'release-date'
  | 'popularity'
  | 'alphabetical'
  | 'relevance';
export interface FilterOptions {
  platform: PlatformType;
  category: CategoryType;
  sortBy: SortByValues;
}
export interface Game {
  id: number;
  name: string;
  thumbnail: string;
  platform: PlatformType;
  category: CategoryType;
}
