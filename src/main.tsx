import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeContextProvider } from './theme/ThemeContext';
import { Provider } from 'react-redux';
import { appStore } from './store/appStore';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { Toaster } from 'sonner';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ appStore }>
      <ThemeContextProvider>
        <App />
        <Toaster richColors  />
      </ThemeContextProvider>
    </Provider>
    
  </React.StrictMode>
);
