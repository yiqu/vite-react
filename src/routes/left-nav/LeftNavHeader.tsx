import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import leftNavLogo from '/death-star.png';
import { DrawerHeader } from '../layouts//layout-components';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Link, useLocation, useNavigation } from 'react-router-dom';
import { Stack } from '@mui/material';
import { flexCenter } from '../../shared/utils/css.utils';

export interface LeftNavHeaderProps {
  closeDrawerHandler: (openState: boolean) => void;
}

function LeftNavHeader({ closeDrawerHandler }: LeftNavHeaderProps) {

  const leftNavTitle = 'Vite React';
  const theme = useTheme();
  const location = useLocation();
  const navigation = useNavigation();

  const handleDrawerClose = () => {
    closeDrawerHandler(false);
  };

  const [displayLogo, setDisplayLogo] = useState(leftNavLogo);

  useEffect(() => {
    setDisplayLogo(leftNavLogo);
  }, [location.pathname]);

  return (
    <DrawerHeader >
      <Link to={ "/" } style={ {color: '#000'} }>
        <Stack direction="row" sx={ {...flexCenter} }>
          <Typography component="img" src={ displayLogo } sx={ {height: '2rem', mr: '10px'} } alt="logo"></Typography>
          <Typography variant='h6' 
            sx={ {color: (theme) => theme.palette.mode === 'light' ? '#000' : '#fff'} }>
            { leftNavTitle }
          </Typography>
        </Stack>
      </Link>
        
      <IconButton onClick={ handleDrawerClose }>
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </DrawerHeader>
  );
};

export default LeftNavHeader;