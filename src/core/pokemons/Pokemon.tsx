import { Box, Button, CardHeader, IconButton, Stack } from "@mui/material";
import AppToolbar from "../../shared/components/toolbar/Toolbar";
import Grid from '@mui/material/Unstable_Grid2';
import useScreenSize from "../../shared/hooks/useIsMobile";
import { useAppDispatch } from "../../store/appHook";
import LayoutWithGutter from "../../shared/components/layouts/LayoutWithGutter";
import Card from '@mui/material/Card';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation, useParams } from "react-router-dom";
import { pokemonApi, pokemonDetailTag, useFetchPokemonDetailQuery } from "../store/pokeapi/pokeapi";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import ErrorPage from "../../404/ErrorPage";
import LoadingBlockSkeleton from "../../shared/components/skeleton/LoadingSkeleton";
import { flexCenter } from "../../shared/utils/css.utils";

function Pokemon() {

  const { isMobile } = useScreenSize();
  const dispatch = useAppDispatch();
  const { pokemonName } = useParams();
  const location = useLocation();
  const { state: { pokemonDetailUrl } } = location;
  const { data, isFetching, isLoading, error, isError } = useFetchPokemonDetailQuery(pokemonDetailUrl ?? skipToken);


  const handlePokemonRefresh = () => {
    dispatch(pokemonApi.util.invalidateTags([{type: pokemonDetailTag, id: data?.id}]));
  };

  if (isLoading) return (
    <Box mt={ 2 } mx={ isMobile ? 2 : 0 } sx={ {width: '100%'} }>
      <LayoutWithGutter size={ 'skinny' }>
        <LoadingBlockSkeleton count={ 1 } />
      </LayoutWithGutter>
    </Box>
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
              <Button onClick={ handlePokemonRefresh } disabled={ isLoading || isFetching }>
                Refresh
              </Button>
            </Stack>
          </Grid>
          <Grid xs={ 2 } sm={ 6 } sx={ {display: 'flex', justifyContent: 'end', alignItems: 'center'} }>
            <Stack direction="row" justifyContent="end" alignItems="center">
              <Box>
                { false && <div>Loading more...</div>}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </AppToolbar>
      <Box mt={ 2 } mx={ isMobile ? 2 : 0 }>
        <LayoutWithGutter size={ 'skinny' }>
          <Card sx={ { width: '100%' } }>
            <CardHeader
              avatar={
                <div style={ { width: 70, height: 70, ...flexCenter } }>
                  <img src={ data.sprites.front_default } style={ {height: '100%', width: '100%'} } alt="avatar" />
                </div>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />


          </Card>
        </LayoutWithGutter>
      </Box>
    </Stack>
  );
}

export default Pokemon;