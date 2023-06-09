import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useAppDispatch, useAppSelector } from "../../store/appHook";
import { useFetchPokemonsQuery } from "../store/pokeapi/pokeapi";
import { getCountInformation, getPokemonApiFetchUrl, getPokemonApiNextUrl } from "../store/pokeapi/pokeapi.selectors";
import { Box, Button, Stack } from "@mui/material";
import AppToolbar from "../../shared/components/toolbar/Toolbar";
import useScreenSize from "../../shared/hooks/useIsMobile";
import Grid from '@mui/material/Unstable_Grid2';
import LayoutWithGutter from "../../shared/components/layouts/LayoutWithGutter";
import ErrorPage from "../../404/ErrorPage";
import { PokemonEntity } from "../store/pokeapi/pokeapi.state";
import { flexCenter } from "../../shared/utils/css.utils";
import { setFetchPageUrl } from "../store/pokeapi/pokeapi.reducer";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSkeleton from "../../shared/components/loading/LoadingSkeleton";
import { Link } from "react-router-dom";
import SplashLoadingScreen from "../../shared/components/loading/splash/SplashLoading";


function PokemonInfinityScroll() {

  const { isMobile } = useScreenSize();
  const dispatch = useAppDispatch();
  const fetchPageURl: string | null = useAppSelector(getPokemonApiFetchUrl);
  const nextPageUrl: string | null = useAppSelector(getPokemonApiNextUrl);
  const totalCount: number | undefined = useAppSelector(getCountInformation);
  const { data, isFetching, isLoading, error, isError } = useFetchPokemonsQuery(fetchPageURl ?? skipToken);

  const nextPageAddHandler = () => {
    dispatch(setFetchPageUrl(nextPageUrl));
  };

  const extractId = (pokemonUrl: string) => {
    const segs = pokemonUrl.split("/");
    return segs[segs.length - 2];
  };

  if (isLoading) return (
    <SplashLoadingScreen />
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
        sx: {top: isMobile ? '56px':'64px', marginTop: isMobile ? 2 : ''}
      } }>
        <Grid container xs={ 12 }>
          <Grid xs={ 12 } sm={ 6 } mb={ isMobile ? 2 : undefined }>
            <Stack direction="row" justifyContent={ isMobile ? 'end' : "start" } alignItems="center">
              <Box mr={ 3 }>
                Infinite Scrolling Example
              </Box>
              <Button onClick={ nextPageAddHandler } variant="outlined">
                Manually Load 20 more
              </Button>
            </Stack>
          </Grid>
          <Grid xs={ 12 } sm={ 6 } sx={ {display: 'flex', justifyContent: 'end', alignItems: 'center'} }>
            <Stack direction="row" justifyContent="end" alignItems="center">
              <Box>
                { isFetching && <div>Loading more...</div>}
              </Box>
              <Box>
                {data.results.length} / { totalCount }
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </AppToolbar>
      <Box mt={ 2 } mx={ isMobile ? 2 : 0 }>
        <LayoutWithGutter size={ 'skinny' }>
          
          <InfiniteScroll
            dataLength={ data.results.length }
            next={ nextPageAddHandler }
            hasMore={ !!nextPageUrl }
            loader={ <LoadingSkeleton count={ 3 } sxProps={ {height: '4rem'} }/> }
            endMessage={ <></> }
            className="scroller-parent">
            {
              data.results.map((display: PokemonEntity) => {
                return (
                  <Grid key={ display.name } xs={ 12 }>
                    {
                      <Box sx={ {py: 2, ...flexCenter, width: '100%'} }>
                        <Button fullWidth component={ Link } to={ `./${extractId(display.url)}` } state={ {someData: 'some-cool-data' } }> { display.name } </Button>
                      </Box>
                    }
                  </Grid>
                );
              })
            }
          </InfiniteScroll>
        </LayoutWithGutter>
      </Box>
    </Stack>
  );
}

export default PokemonInfinityScroll;