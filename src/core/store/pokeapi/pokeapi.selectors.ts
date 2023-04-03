import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/appStore";

const pokemonApiConfigSlice = (state: RootState) => {
  return state.pokemonApiConfig;
};

export const getPokemonApiNextUrl = createDraftSafeSelector(
  pokemonApiConfigSlice,
  (state): string | null => {
    return state.nextUrl;
  }
);

export const getPokemonApiPreviousUrl = createDraftSafeSelector(
  pokemonApiConfigSlice,
  (state): string | null => {
    return state.previousUrl;
  }
);

export const getPokemonApiFetchUrl = createDraftSafeSelector(
  pokemonApiConfigSlice,
  (state): string | null => {
    return state.fetchUrl;
  }
);

export const getCountInformation = createDraftSafeSelector(
  pokemonApiConfigSlice,
  (state): number | undefined => {
    const total = state.total;
    return total;
  }
);