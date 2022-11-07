
import { BrowserRouter } from "react-router-dom";

import './shared/form/TraducoesYup';

import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { DrawerProvider } from './shared/contexts/DrawerContext';
import { AuthProvider } from "./shared/contexts/AuthContext";
import { Login } from "./shared/components/Login";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <AppThemeProvider>
      <Login>
        <DrawerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DrawerProvider>
      </Login>
    </AppThemeProvider>
  </AuthProvider>
);


