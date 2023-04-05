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


function Pokemon() {

  const { isMobile } = useScreenSize();
  const dispatch = useAppDispatch();
  const { pokemonName } = useParams();
  const location = useLocation();
  const { state: { pokemonDetailUrl } } = location;
  const { data, isFetching, isLoading, error, isError } = useFetchPokemonDetailQuery(pokemonDetailUrl ?? skipToken);

console.log(data);

  const handlePokemonRefresh = () => {
    dispatch(pokemonApi.util.invalidateTags([{type: pokemonDetailTag, id: data?.id}]));
  };

  if (isLoading) return (
    <Stack direction="column" width="100%" justifyContent="center" alignItems="center" height="100vh">
      <>Loading</>
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
                <></>
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