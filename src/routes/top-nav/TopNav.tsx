import React, { useContext } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '../layouts/layout-components';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { PaletteMode, Stack, Tooltip } from "@mui/material";
import { useLocalStorage } from 'react-use';
import { startCase } from 'lodash';
import ThemeContext from "../../theme/ThemeContext";
import { LS_APP_THEME, TransformPageTitle } from "../../shared/utils/constants";
import Account from "./Account";


export interface TopNavProps {
  open: boolean;
  onNavOpen: (openState: boolean) => void;
}

export default function TopNav({ open, onNavOpen }: TopNavProps) {

  const location = useLocation();
  const [title, setTitle] = useState<string>();
  const [titleUrlPath, setTitleUrlPath] = useState<string>('');
  const themeContext = useContext(ThemeContext);
  const [currentTheme, setLocalStorageTheme, remove] = useLocalStorage<PaletteMode>(LS_APP_THEME, 'light');
  
  useEffect(() => {
    const urlArray: string[] = location.pathname.split("/");
    let pathTitle: string = urlArray[1];
    setTitleUrlPath(pathTitle);
    setTitle(pathTitle);
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    onNavOpen(true);
  };
  const toggleThemeHandler = () => {
    const themeToSet = themeContext.currentTheme==='light' ? 'dark' : 'light';
    themeContext.setTheme(themeToSet);
    setLocalStorageTheme(themeToSet);
  };



  return (
    <>
      <AppBar position="fixed" open={ open } elevation={ 0 }>
        <Toolbar sx={ {borderBottom: '1px solid #3c3c3c'} }>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row" justifyContent="start" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={ handleDrawerOpen }
                edge="start"
                sx={ {
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                } }
              >
                <MenuIcon />
              </IconButton>
              <Link to={ `/${titleUrlPath}` }>
                <Typography variant="h5" noWrap sx={ {fontWeight: 400, fontFamily:'Poppins', color: "#fff"} }>
                  { startCase(TransformPageTitle[title+'']) }
                </Typography>
              </Link>
            </Stack>

            <Stack direction="row">
              <Tooltip title={ `Turn ${themeContext.currentTheme==='light'?'off':'on'} the lights` }>
                <IconButton sx={ { ml: 1 } } color="inherit" onClick={ toggleThemeHandler }>
                  { themeContext.currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
                </IconButton>
              </Tooltip>
              
              <Account />
            </Stack>
          </Stack>
        </Toolbar>

        {/* Nested Action bar that is sticky under main top nav */}
        {/* <AppBar position="sticky" elevation={ 0 }>
          <Toolbar variant="dense" sx={ {bgcolor: '#fff', color: '#000'} }>
            <Button color="inherit" variant="text">
              <RefreshIcon sx={ {mr: '10px'} } />
              Refresh
            </Button>
          </Toolbar>
        </AppBar> */}
          
      </AppBar>
    </>
  );
};
