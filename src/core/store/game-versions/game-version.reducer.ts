import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { HttpResponse, PokemonEntity } from '../pokeapi/pokeapi.state';
import { fetchGameVersions } from './game-version.thunks';
import { FulfilledAction, PendingAction } from '../../../shared/models/redux.model';
import { FetchInputParams } from './game-version.state';

export interface GameVersionsEntityState extends EntityState<PokemonEntity> {
  apiLoading: boolean;
  firstTimeLoading?: boolean;
  lastFetchedDate: number;
  error: boolean;
  errMsg?: string;
  offset: number;
  limit: 20;
  page: number;
  total: number;
}

export function selectIdentifer(config: PokemonEntity) {
  return config.name;
}

export function comparator(a: PokemonEntity, b: PokemonEntity): number {
  if (a.name < b.name) {
    return 1;
  }
  return -1;
}

export const adapter = createEntityAdapter<PokemonEntity>({
  selectId: selectIdentifer,
 // sortComparer: comparator
});

export const gameVersionsSlice = createSlice({
  name: 'characters',
  initialState: adapter.getInitialState<Partial<GameVersionsEntityState>>({
    firstTimeLoading: true,
    limit: 20,
    page: 0
  }),
  reducers: {
    setLastFetchedDate: (state, action: PayloadAction<number>) => {
      state.lastFetchedDate = action.payload;
    }
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchGameVersions.pending, (state, action: PendingAction<FetchInputParams>) => {
      state.apiLoading = true;
      state.page = action.meta.arg.page;
    });
    builder.addCase(fetchGameVersions.fulfilled, (state, action: FulfilledAction<FetchInputParams, HttpResponse<PokemonEntity>>) => {
      state.apiLoading = false;
      state.total = action.payload.count;
      adapter.setAll(state, action.payload.results);
    });
    builder.addCase(fetchGameVersions.rejected, (state, action) => {
      
    });
  },
});

export const { setLastFetchedDate } = gameVersionsSlice.actions;
export default gameVersionsSlice.reducer;