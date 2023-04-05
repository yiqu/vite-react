export interface PokemonEntity {
  name: string;
  url: string;
}

export interface HttpResponse<T> {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
}

export interface PokeApiState {
  nextUrl: string | null;
  previousUrl: string | null;
  fetchUrl: string | null;
  total?: number;
}

export interface PokemonDetail {
  id: string;
  name: string;
  is_default: boolean;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  species: PokemonEntity;
  location_area_encounters: string;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}