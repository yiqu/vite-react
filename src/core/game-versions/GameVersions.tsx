import { useAppDispatch, useAppSelector } from "../../store/appHook";
import { Box, Button, Pagination, Stack } from "@mui/material";
import AppToolbar from "../../shared/components/toolbar/Toolbar";
import useScreenSize from "../../shared/hooks/useIsMobile";
import Grid from '@mui/material/Unstable_Grid2';
import LayoutWithGutter from "../../shared/components/layouts/LayoutWithGutter";
import LoadingLogo from "../../shared/components/loading/full-logo/LoadingLogo";
import ErrorPage from "../../404/ErrorPage";
import { useEffect } from "react";
import { fetchGameVersions } from "../store/game-versions/game-version.thunks";
import * as fromGameVersionsSelectors from '../store/game-versions/game-version.selectors';
import { PokemonEntity } from "../store/pokeapi/pokeapi.state";
import { flexCenter } from "../../shared/utils/css.utils";
import { Link } from "react-router-dom";
import { setPage } from "../store/game-versions/game-version.reducer";

function GameVersions() {

  const { isMobile } = useScreenSize();
  const dispatch = useAppDispatch();
  const currentPage: number = useAppSelector(fromGameVersionsSelectors.getPage);
  const totalPages: number = useAppSelector(fromGameVersionsSelectors.getTotalPages);
  const displayCount: string = useAppSelector(fromGameVersionsSelectors.displayCount);

  const totalCount: number = useAppSelector(fromGameVersionsSelectors.getTotal);
  const data: PokemonEntity[] = useAppSelector(fromGameVersionsSelectors.selectAll);
  const isFirstTimeLoading: boolean = useAppSelector(fromGameVersionsSelectors.isFirstTimeLoading);
  const isErrored: string | undefined = useAppSelector(fromGameVersionsSelectors.isErrored);
  const isApiLoading: boolean = useAppSelector(fromGameVersionsSelectors.isApiLoading);

  const handleRefresh = () => {
  };

  useEffect(() => {
    dispatch(fetchGameVersions({page: currentPage}));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPage(page - 1));
  };


  if (isFirstTimeLoading) return (
    <Stack direction="column" width="100%" justifyContent="center" alignItems="center" height="100vh">
      <LoadingLogo message={ 'Game Versions' } />
    </Stack>
  );

  if (isErrored) {
    return <ErrorPage reason={ (isErrored as any) } debug={ (isErrored as any) } />;
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
                { isApiLoading && <div>Loading more...</div>}
              </Box>
              <Box>
                { displayCount } of { totalCount }
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </AppToolbar>
      <Box mt={ 2 } mx={ isMobile ? 2 : 0 }>
        <LayoutWithGutter size={ 'skinny' }>
          {
            data.map((display: PokemonEntity) => {
              return (
                <Grid key={ display.name } xs={ 12 }>
                  {
                    <Box sx={ {py: 2, ...flexCenter, width: '100%'} }>
                      <Button fullWidth component={ Link } to={ `./${extractId(display.url)}` } state={ {someData: 'some-cool-data' } } > { display.name } </Button>
                    </Box>
                  }
                </Grid>
              );
            })
          }
          <Stack spacing={ 2 } sx={ {py: 2, ...flexCenter, width: '100%'} }>
            <Pagination count={ totalPages } page={ currentPage+1 } shape="rounded" showFirstButton showLastButton 
              disabled={ isApiLoading } onChange={ handlePageChange } />
          </Stack>
        </LayoutWithGutter>
      </Box>
    </Stack>
  );
}

export default GameVersions;

const extractId = (pokemonUrl: string) => {
  const segs = pokemonUrl.split("/");
  return segs[segs.length - 2];
};