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