import * as React from 'react';
import { useContext, useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { Outlet } from 'react-router-dom';
import { Drawer, DrawerHeader } from './layouts/layout-components';
import TopNav from './top-nav/TopNav';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import ThemeContext from '../theme/ThemeContext';
import { useAppDispatch } from '../store/appHook';
import LeftNav from './left-nav/LeftNav';
import LeftNavHeader from './left-nav/LeftNavHeader';
import { getMyTheme } from '../theme/AppTheme';
import { GREY } from '../theme/palette';

const Layout = () => {
  
  const currentTheme = useTheme();
  const themeContext = useContext(ThemeContext);
  const [open, setOpen] = React.useState(true);
  const isMobileScreenSize = useMediaQuery(currentTheme.breakpoints.down('sm'));
  const theme: Theme = useMemo(() => {
    return createTheme(getMyTheme(themeContext.currentTheme));
  }, [themeContext.currentTheme]);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = (openState: boolean) => {
    setOpen(openState);
  };

  const handleDrawerClose = (openState: boolean) => {
    setOpen(openState);
  };

  useEffect(() => {
    if (isMobileScreenSize) {
      setOpen(false);
    }
  }, [isMobileScreenSize]);

  return (
    <ThemeProvider theme={ theme }>
      <Box sx={ { display: 'flex', height: '100%' } }>
        <CssBaseline />
      
        <TopNav open={ open } onNavOpen={ handleDrawerOpen } />

        <Drawer variant="permanent" open={ open }>

          <LeftNavHeader closeDrawerHandler={ handleDrawerClose } />

          <Divider />
        
          <LeftNav open={ open } />

        </Drawer>

        <Box component="main" sx={ { flexGrow: 1, bgcolor:(theme) => theme.palette.mode === 'light' ? GREY[100] : null } }>
          <DrawerHeader />
          <Grid container sx={ {bgcolor:(theme) => theme.palette.mode === 'light' ? GREY[100] : null } } pb={ 5 }>

            <Outlet />

          </Grid>
        </Box>

      </Box>
    </ThemeProvider>
    
  );
};

export default Layout;