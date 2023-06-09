import React, { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import routeList from './routes/Routes';
import { useLocalStorage } from 'react-use';
import ThemeContext, { ThemeContextProp } from './theme/ThemeContext';
import { PaletteMode } from '@mui/material';
import { LS_APP_THEME } from './shared/utils/constants';

function App() {

  const [theme, setTheme, remove] = useLocalStorage<PaletteMode>(LS_APP_THEME, 'light');
  const themeContext: ThemeContextProp = useContext(ThemeContext);

  useEffect(() => {
    themeContext.setTheme(theme!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <React.Fragment>
      <RouterProvider router={ routeList } />
    </React.Fragment>
  );
}

export default App;
