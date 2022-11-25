import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TraducaoYup';

import { AppRoutes } from './routes';
import { Sidebar } from './shared/components/sidebar/Sidebar';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <Sidebar>
            <AppRoutes /> 
          </Sidebar>
          
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
