
import { BrowserRouter } from "react-router-dom";

import './shared/form/TraducoesYup';

import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { DrawerProvider } from './shared/contexts/DrawerContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppThemeProvider>
    <DrawerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DrawerProvider>
  </AppThemeProvider>
);


