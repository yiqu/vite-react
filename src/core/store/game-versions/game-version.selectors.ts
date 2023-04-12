import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { adapter } from "./game-version.reducer";
import { RootState } from "../../../store/appStore";
import { loadLimit } from "./game-version.state";


const gameVersionsSlice = (state: RootState) => {
  return state.gameVersions;
};

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors((state: RootState) => state.gameVersions);

export const isApiLoading = createDraftSafeSelector(
  gameVersionsSlice,
  (state): boolean => {
    return !!state.apiLoading;
  }
);

export const isFirstTimeLoading = createDraftSafeSelector(
  gameVersionsSlice,
  (state): boolean => {
    return !!state.firstTimeLoading;
  }
);

export const isErrored = createDraftSafeSelector(
  gameVersionsSlice,
  (state): string | undefined => {
    return state.errMsg;
  }
);

export const getPage = createDraftSafeSelector(
  gameVersionsSlice,
  (state): number => {
    return state.page ?? 0;
  }
);

export const getTotal = createDraftSafeSelector(
  gameVersionsSlice,
  (state): number => {
    return state.total ?? 0;
  }
);

export const getTotalPages = createDraftSafeSelector(
  gameVersionsSlice,
  (state): number => {
    const pages = Math.ceil(((state.total ?? 0) / loadLimit));
    return pages;
  }
);

export const displayCount = createDraftSafeSelector(
  gameVersionsSlice,
  getPage,
  getTotalPages,
  (state, currentPage, totalPages): string => {
    const start = ((state.page ?? 0) * (loadLimit)) + 1;
    let end = 0;
    if (currentPage+1 < totalPages) {
      end = ((state.page ?? 0) + 1) * (loadLimit);
    } else {
      end = state.total ?? 0;
    }
    return `${start} - ${end}`;
  }
);

