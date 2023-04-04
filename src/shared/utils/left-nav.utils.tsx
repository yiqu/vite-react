import React from "react";
import InfoIconOutlined from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';
import RocketIconOutlined from '@mui/icons-material/RocketOutlined';
import RocketIcon from '@mui/icons-material/Rocket';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import CatchingPokemonIconO from '@mui/icons-material/CatchingPokemonOutlined';

export class NavigationItem {
  constructor(public display: string, public id: string, public url: string[], public icon: any) {
  }
}

export const GET_LEFT_NAV_ITEMS = () => {
  const LEFT_NAV_ITEMS = [
    new NavigationItem('Home', 'home', ['/', 'home'], <RocketIconOutlined color='primary' />),
    new NavigationItem('Pokemons', 'pokemons', ['/', 'pokemons'], <CatchingPokemonIcon color='primary' />),
    new NavigationItem('About', 'about', ['/', 'about'], <InfoIconOutlined color='primary' />),
    ...Array.from(Array(40).keys()).map((res) => {
      return new NavigationItem(`${res}`, `${res}`, ['/', `${res}`], <InfoIconOutlined color='primary' />);
    })
  ];
  return LEFT_NAV_ITEMS;
};

export const getFilledIcon = (pathName: string): JSX.Element => {
  switch (pathName) {
    case 'home': {
      return <RocketIcon color='primary' />;
    }
    case 'pokemons': {
      return <CatchingPokemonIconO color='primary' />;
    }
    case 'about': {
      return <InfoIcon color='primary' />;
    }
  }
  return <>None</>;
};

