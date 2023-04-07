import { createApi, fetchBaseQuery, TagDescription } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line unused-imports/no-unused-imports
import urlcat from "urlcat";
import { HttpResponse, PokemonDetail, PokemonEntity } from './pokeapi.state';

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
export const COUNT_LIMIT = 20;

export const pokemonsTag = 'pokemons';
export const pokemonDetailTag = 'pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokeapi',
  baseQuery: fetchBaseQuery({
    baseUrl: POKEAPI_BASE_URL
  }),
  tagTypes: [pokemonsTag, pokemonDetailTag],
  endpoints: (builder) => ({
    fetchPokemons: builder.query<HttpResponse<PokemonEntity>, string | null>({
      query: (nextUrl: string | null) => {
        return {
          url: `${nextUrl}`,
          params: undefined,
          method: 'GET'
        };
      },
      transformResponse: (response: HttpResponse<PokemonEntity>, meta, args: string | null) => {
        return response;
      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache: HttpResponse<PokemonEntity>, newItems: HttpResponse<PokemonEntity>) => {
        currentCache.results.push(...newItems.results);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, args, meta) => {
        const tags: TagDescription<"pokemons">[] = [pokemonsTag];
        return tags;
      }
    }),

    fetchPokemonDetail: builder.query<PokemonDetail, string | null>({
      query: (pokemonDetailUrl: string | null) => {
        return {
          url: `${pokemonDetailUrl}`,
          params: undefined,
          method: 'GET'
        };
      },
      providesTags: (result: PokemonDetail | undefined, error, args, meta) => {
        return [{ type: pokemonDetailTag, id: result?.id }];
      }
    }),

    editPokemonDetail: builder.mutation({
      query: (pokemonDetail: PokemonDetail) => {
        return {
          url: `${POKEAPI_BASE_URL}${pokemonDetail.id}`,
          method: 'PUT',
          body: {
            ...pokemonDetail
          }
        };
      },
      invalidatesTags: (result, error, args, meta) => {
        return [{type: pokemonDetailTag, id: args.id}];
      },
    })

  })
});


export const { useFetchPokemonsQuery, useFetchPokemonDetailQuery, useEditPokemonDetailMutation } = pokemonApi;