/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import MovieIcon from '@mui/icons-material/Movie';

import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import Person4Icon from '@mui/icons-material/Person4';

import InfoIconOutlined from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { CameraRoll } from "@mui/icons-material";

import PublicIcon from '@mui/icons-material/Public';

import RocketIconOutlined from '@mui/icons-material/RocketOutlined';
import RocketIcon from '@mui/icons-material/Rocket';

import TwoWheelerIcon from '@mui/icons-material/TwoWheelerOutlined';

import GroupsIcon from '@mui/icons-material/GroupsOutlined';

export class NavigationItem {
  constructor(public display: string, public id: string, public url: string[], public icon: any) {
  }
}

export const GET_LEFT_NAV_ITEMS = () => {
  const LEFT_NAV_ITEMS = [
    new NavigationItem('Home', 'home', ['/', 'home'], <RocketIconOutlined color='primary' />),
    new NavigationItem('About', 'about', ['/', 'about'], <InfoIconOutlined color='primary' />),
  ];
  return LEFT_NAV_ITEMS;
};

export const getFilledIcon = (pathName: string): JSX.Element => {
  switch (pathName) {
    case 'favorites': {
      return <FavoriteOutlinedIcon color='primary' />;
    }
    case 'movies': {
      return <MovieIcon color='primary' />;
    }
    case 'characters': {
      return <Person4Icon color='primary' />;
    }
    case 'planets': {
      return <PublicIcon color='primary' />;
    }
    case 'vehicles': {
      return <TwoWheelerIcon color='primary' />;
    }
    case 'home': {
      return <RocketIcon color='primary' />;
    }
    case 'species': {
      return <GroupsIcon color='primary' />;
    }
    case 'about': {
      return <InfoIcon color='primary' />;
    }
    case 'create-new': {
      return <AddAPhotoIcon color='primary' />;
    }
    case 'personal-films': {
      return <CameraRoll color='primary' />;
    }
  }
  return <>None</>;
};

