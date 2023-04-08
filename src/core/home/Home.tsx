import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import LayoutWithGutter from "../../shared/components/layouts/LayoutWithGutter";
import useScreenSize from "../../shared/hooks/useIsMobile";
import { useAppDispatch } from "../../store/appHook";
import { flexCenter } from "../../shared/utils/css.utils";
import styles from './Home.module.scss';
import { Link } from "react-router-dom";


function Home() {

  const { isMobile } = useScreenSize();
  const dispatch = useAppDispatch();
  
  return (
    <Stack direction="column" width="100%">
      <Box mt={ 2 } mx={ isMobile ? 2 : 0 }>
        <LayoutWithGutter size={ 'skinny' }>
          <div style={ {textAlign: 'center', width: '100%'} }>
            <Stack direction="column" sx={ {mb: 5} }>
              <Typography variant="h4" className={ `${styles.title}` } sx={ {...flexCenter, mb: 5} }>Vite + React Starter with PokeAPI.</Typography>
              <div style={ {...flexCenter} }>
                <img src="/pikachu.png" alt="logo" style={ {height: '10rem', width: '10rem'} } />
              </div>
            </Stack>
            <Divider sx={ {width: '100%'} }> Features </Divider>
            <Stack>
              <List>
                <ListItem disablePadding disableGutters>
                  <ListItemButton component={ Link } to={ "/" }>
                    <ListItemText primary="Routing + Lazy Route" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding disableGutters>
                  <ListItemButton component={ Link } to={ "/pokemons" }>
                    <ListItemText primary="Redux Toolkit Query - Infinite Scrolling" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding disableGutters>
                  <ListItemButton component={ Link } to={ "/pokemons/1" }>
                    <ListItemText primary="Redux ToolKit Query - Invalid Tag After Edit" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding disableGutters>
                  <ListItemButton component={ Link } to={ "/game-versions" }>
                    <ListItemText primary="Redux - Thunks" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          </div>
        </LayoutWithGutter>
      </Box>
    </Stack>
  );
}

export default Home;