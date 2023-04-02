import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authSliceReducer from './auth/auth.reducer';
import pokemonApiReducer from '../core/store/pokeapi/pokeapi.reducer';
import { pokemonApi } from '../core/store/pokeapi/pokeapi';

export const appStore = configureStore({
  reducer: {
    auth: authSliceReducer,
    pokemonApiConfig: pokemonApiReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokemonApi.middleware);
  },
  
  devTools: {
    trace: true,
    name: 'Vite React',
    actionsDenylist: ['__rtkq/focused', '__rtkq/unfocused']
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(appStore.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;
