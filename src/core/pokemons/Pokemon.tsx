import { Box, CardHeader, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import AppToolbar from "../../shared/components/toolbar/Toolbar";
import Grid from '@mui/material/Unstable_Grid2';
import useScreenSize from "../../shared/hooks/useIsMobile";
import { useAppDispatch } from "../../store/appHook";
import LayoutWithGutter from "../../shared/components/layouts/LayoutWithGutter";
import Card from '@mui/material/Card';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation, useParams } from "react-router-dom";
import { pokemonApi, pokemonDetailTag, useEditPokemonDetailMutation, useFetchPokemonDetailQuery } from "../store/pokeapi/pokeapi";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import ErrorPage from "../../404/ErrorPage";
import LoadingBlockSkeleton from "../../shared/components/skeleton/LoadingSkeleton";
import { flexCenter } from "../../shared/utils/css.utils";
import LoadingButton from '@mui/lab/LoadingButton';
import { startCase } from 'lodash';
import { useEffect, useState } from "react";
import { toast } from 'sonner';

const pokeUrl = 'https://pokeapi.co/api/v2/pokemon';

function Pokemon() {

  const { isMobile } = useScreenSize();
  const dispatch = useAppDispatch();
  const { pokemonId } = useParams();
  const location = useLocation();
  const pokemonDetailUrl = pokemonId ? `${pokeUrl}/${pokemonId}` : undefined;
  const { data, isFetching, isLoading, error, isError } = useFetchPokemonDetailQuery(pokemonDetailUrl ?? skipToken);
  const [ editPokemonDetail, editPokemonDetailResult ] = useEditPokemonDetailMutation();
  const [cardMenuanchorEl, setCardMenuanchorEl] = useState<null | HTMLElement>(null);

  const handleCardMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
    setCardMenuanchorEl(event.currentTarget);
  };

  const handleCardMenuClose = () => {
    setCardMenuanchorEl(null);
  };

  /**
   * Refresh current Pokemon Tag
   */
  const handlePokemonRefresh = () => {
    dispatch(pokemonApi.util.invalidateTags([{type: pokemonDetailTag, id: data?.id}]));
  };

  /**
   * Send a PUT to edit current Pokemon
   * @param menuId 
   * @returns 
   */
  const handleMenuItemClick = (menuId: string) => () => {
    if (data) {
      editPokemonDetail({
        ...data
      });
    }
    handleCardMenuClose();
  };

  /**
   * Toast
   */
  useEffect(() => {
    if (editPokemonDetailResult.isError) {
      toast.error(`Error ${(editPokemonDetailResult.error as any).originalStatus}: ${(editPokemonDetailResult.error as any).error}`);
    }
  }, [editPokemonDetailResult]);


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
              <LoadingButton loading={ isLoading || isFetching } variant="outlined" onClick={ handlePokemonRefresh }>
                Refresh
              </LoadingButton>
            </Stack>
          </Grid>
          <Grid xs={ 2 } sm={ 6 } sx={ {display: 'flex', justifyContent: 'end', alignItems: 'center'} }>
            <Stack direction="row" justifyContent="end" alignItems="center">
              <Box>
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
                <IconButton aria-label="settings" onClick={ handleCardMenuToggle }>
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Stack direction="row">
                  <Box mr={ 1 }>
                    <Typography variant="h6"> { startCase(data.name) } </Typography>
                  </Box>
                  <Box>
                    { editPokemonDetailResult.isLoading ? '(Editing)' : '' }
                  </Box>
                </Stack>
              }
              subheader={ <Typography color="grey">{`ID: ${data.id}`}</Typography>  }
            />
          </Card>
        </LayoutWithGutter>

      </Box>

      <Menu
        open={ !!cardMenuanchorEl }
        onClose={ handleCardMenuClose }
        anchorEl={ cardMenuanchorEl }
      >
        <MenuItem onClick={ handleMenuItemClick('edit') }>Edit</MenuItem>
      </Menu>
        
    </Stack>
  );
}

export default Pokemon;