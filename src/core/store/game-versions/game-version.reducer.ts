import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { PokemonEntity } from '../pokeapi/pokeapi.state';

export interface GameVersionsEntityState extends EntityState<PokemonEntity> {
  apiLoading: boolean;
  firstTimeLoading?: boolean;
  lastFetchedDate: number;
  error: boolean;
  errMsg?: string;
  offset: number;
  limit: 20;
  total: number;
}

export function selectIdentifer(config: PokemonEntity) {
  return config.name;
}

export function comparator(a: PokemonEntity, b: PokemonEntity): number {
  if (+a.name > +b.name) {
    return 1;
  }
  return -1;
}

export const adapter = createEntityAdapter<PokemonEntity>({
  selectId: selectIdentifer,
  sortComparer: comparator
});

export const gameVersionsSlice = createSlice({
  name: 'characters',
  initialState: adapter.getInitialState<Partial<GameVersionsEntityState>>({
    firstTimeLoading: true,
    limit: 20
  }),
  reducers: {
    setLastFetchedDate: (state, action: PayloadAction<number>) => {
      state.lastFetchedDate = action.payload;
    }
  },
  extraReducers: (builder) => {

  },
});

export const { setLastFetchedDate } = gameVersionsSlice.actions;
export default gameVersionsSlice.reducer;