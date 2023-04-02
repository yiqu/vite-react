import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokeApiState } from './pokeapi.state';
import { POKEAPI_BASE_URL, pokemonApi } from './pokeapi';

const initialState: PokeApiState = {
  nextUrl: `${POKEAPI_BASE_URL}?offset=0&limit=20`,
  previousUrl: null,
  fetchUrl: `${POKEAPI_BASE_URL}?offset=0&limit=20`
};

const pokemonApiSlice = createSlice({
  name: 'pokeApiConfig',
  initialState,
  reducers: {
    setFetchPageUrl: (state, action: PayloadAction<string | null>) => {
      state.fetchUrl = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(pokemonApi.endpoints.fetchPokemons.matchFulfilled, (state, action) => {
      const payload = action.payload;
      state.nextUrl = payload.next;
      state.previousUrl = payload.previous;
    });
  }
});

export const { setFetchPageUrl } = pokemonApiSlice.actions;
export default pokemonApiSlice.reducer;