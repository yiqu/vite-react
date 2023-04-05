import loadable from '@loadable/component';
import { Router } from '@remix-run/router';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import PokemonLayout from '../core/pokemons/Layout';


// Lazy load components
const NotFoundLazy = loadable(() => import('../404/NotFound'));
const HomeLayout = loadable(() => import('../core/home/Home'));
const About = loadable(() => import('../core/about/About'));
const PokemonInfinityScroll = loadable(() => import('../core/pokemons/Pokemons'));
const PokemonDetail = loadable(() => import('../core/pokemons/Pokemon'));


const routeList: Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundLazy />,
    children: [
      { index: true, element: <Navigate replace to="home" /> },
      {
        path: 'home',
        element: <HomeLayout />,
        children: [
        ]
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'pokemons',
        element: <PokemonLayout />,
        children: [
          { index: true, element: <Navigate replace to="all" /> },
          {
            path: 'all',
            element: <PokemonInfinityScroll />
          },
          {
            path: ':pokemonId',
            element: <PokemonDetail />
          },
        ]
      },
    ]
  }
]);

export default routeList;