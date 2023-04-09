import { createAsyncThunk } from "@reduxjs/toolkit";
import { lastValueFrom, map } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import urlcat from "urlcat";
import { FetchInputParams } from "./game-version.state";
import { HttpResponse, PokemonEntity } from "../pokeapi/pokeapi.state";


export const fetchGameVersions = createAsyncThunk(
  '[Game Versions / API] Fetch game versions',
  async (thunkParams: FetchInputParams, thunkAPI) => {
    
    const fetchUrl = urlcat(import.meta.env.VITE_POKEAPI_URL, 'version', {offset: (thunkParams.page * 20), limit: 20 });

    const obs$ = ajax.get<any>(fetchUrl).pipe(
      map((res: AjaxResponse<HttpResponse<PokemonEntity>>) => {
        return res.response;
      })
    );

    return lastValueFrom(obs$);
  },
  {
    condition: (args, thunkAPI) => {
      return true;
    },
  }
);
