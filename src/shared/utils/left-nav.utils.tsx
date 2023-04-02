/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import InfoIconOutlined from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';

import RocketIconOutlined from '@mui/icons-material/RocketOutlined';
import RocketIcon from '@mui/icons-material/Rocket';

export class NavigationItem {
  constructor(public display: string, public id: string, public url: string[], public icon: any) {
  }
}

export const GET_LEFT_NAV_ITEMS = () => {
  const LEFT_NAV_ITEMS = [
    new NavigationItem('Home', 'home', ['/', 'home'], <RocketIconOutlined color='primary' />),
    new NavigationItem('Text', 'text', ['/', 'text'], <InfoIconOutlined color='primary' />),
    new NavigationItem('About', 'about', ['/', 'about'], <InfoIconOutlined color='primary' />),
  ];
  return LEFT_NAV_ITEMS;
};

export const getFilledIcon = (pathName: string): JSX.Element => {
  switch (pathName) {
    case 'home': {
      return <RocketIcon color='primary' />;
    }
    case 'text':
    case 'about': {
      return <InfoIcon color='primary' />;
    }
  }
  return <>None</>;
};

