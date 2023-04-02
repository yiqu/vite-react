import loadable from '@loadable/component';
import { Router } from '@remix-run/router';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';


// Lazy load components
const NotFoundLazy = loadable(() => import('../404/NotFound'));
const HomeLayout = loadable(() => import('../core/home/Home'));
const About = loadable(() => import('../core/about/About'));
const Text = loadable(() => import('../core/text/Text'));

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
        path: 'text',
        element: <Text />
      },
    ]
  }
]);

export default routeList;