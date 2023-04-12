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
  errMsg?: string;
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
  name: 'gameVersions',
  initialState: adapter.getInitialState<Partial<GameVersionsEntityState>>({
    firstTimeLoading: true,
    page: 0
  }),
  reducers: {
    setLastFetchedDate: (state, action: PayloadAction<number>) => {
      state.lastFetchedDate = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchGameVersions.pending, (state, action: PendingAction<FetchInputParams>) => {
      state.apiLoading = true;
      //state.page = action.meta.arg.page;
    });
    builder.addCase(fetchGameVersions.fulfilled, (state, action: FulfilledAction<FetchInputParams, HttpResponse<PokemonEntity>>) => {
      state.apiLoading = false;
      state.total = action.payload.count;
      state.errMsg = undefined;
      state.firstTimeLoading = false;
      adapter.setAll(state, action.payload.results);
    });
    builder.addCase(fetchGameVersions.rejected, (state, action) => {
      state.apiLoading = false;
      state.errMsg = action.error.message;
    });
  },
});

export const { setLastFetchedDate, setPage } = gameVersionsSlice.actions;
export default gameVersionsSlice.reducer;