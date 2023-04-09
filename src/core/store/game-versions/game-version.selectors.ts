import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { adapter } from "./game-version.reducer";
import { RootState } from "../../../store/appStore";


const gameVersionsSlice = (state: RootState) => {
  return state.gameVersions;
};

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors((state: RootState) => state.gameVersions);

export const isApiLoading = createDraftSafeSelector(
  gameVersionsSlice,
  (state): boolean | undefined => {
    return state.apiLoading;
  }
);

