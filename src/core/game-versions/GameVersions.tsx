import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useAppDispatch, useAppSelector } from "../../store/appHook";
import { useFetchPokemonsQuery } from "../store/pokeapi/pokeapi";
import { getCountInformation, getPokemonApiFetchUrl, getPokemonApiNextUrl } from "../store/pokeapi/pokeapi.selectors";
import { Box, Button, Stack } from "@mui/material";
import AppToolbar from "../../shared/components/toolbar/Toolbar";
import useScreenSize from "../../shared/hooks/useIsMobile";
import Grid from '@mui/material/Unstable_Grid2';
import LayoutWithGutter from "../../shared/components/layouts/LayoutWithGutter";
import LoadingLogo from "../../shared/components/loading/full-logo/LoadingLogo";
import ErrorPage from "../../404/ErrorPage";
import { setFetchPageUrl } from "../store/pokeapi/pokeapi.reducer";
import { useEffect } from "react";
import { fetchGameVersions } from "../store/game-versions/game-version.thunks";


function GameVersions() {

  const { isMobile } = useScreenSize();
  const dispatch = useAppDispatch();
  const fetchPageURl: string | null = useAppSelector(getPokemonApiFetchUrl);
  const nextPageUrl: string | null = useAppSelector(getPokemonApiNextUrl);
  const totalCount: number | undefined = useAppSelector(getCountInformation);
  const { data, isFetching, isLoading, error, isError } = useFetchPokemonsQuery(fetchPageURl ?? skipToken);

  const handleRefresh = () => {
    dispatch(setFetchPageUrl(nextPageUrl));
  };

  useEffect(() => {
    dispatch(fetchGameVersions({page: 0}));
  }, [dispatch]);


  if (isLoading) return (
    <Stack direction="column" width="100%" justifyContent="center" alignItems="center" height="100vh">
      <LoadingLogo message={ 'Game Versions' } />
    </Stack>
  );

  if (isError) {
    return <ErrorPage reason={ (error as any).status } debug={ (error as any).error } />;
  }

  if (!data) {
    return null;
  }

  return (
    <Stack direction="column" width="100%">
      <AppToolbar toolbarProps={ {
        position: "sticky",
        sx: {top: isMobile ? '56px':'64px'}
      } }>
        <Grid container xs={ 12 }>
          <Grid xs={ 10 } sm={ 6 }>
            <Stack direction="row" justifyContent="start" alignItems="center">
              <Box mr={ 3 }>
                Thunks Example 
              </Box>
              <Button onClick={ handleRefresh } variant="outlined">
                Refresh
              </Button>
            </Stack>
          </Grid>
          <Grid xs={ 2 } sm={ 6 } sx={ {display: 'flex', justifyContent: 'end', alignItems: 'center'} }>
            <Stack direction="row" justifyContent="end" alignItems="center">
              <Box>
                { isFetching && <div>Loading more...</div>}
              </Box>
              <Box>
                Count
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </AppToolbar>
      <Box mt={ 2 } mx={ isMobile ? 2 : 0 }>
        <LayoutWithGutter size={ 'skinny' }>
          
        </LayoutWithGutter>
      </Box>
    </Stack>
  );
}

export default GameVersions;