
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from '@mui/material'
import { LightTheme } from './shared/themes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={LightTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);


