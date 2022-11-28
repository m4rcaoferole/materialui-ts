import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TraducaoYup';
import { AppRoutes } from './routes';
import { Sidebar } from './shared/components/sidebar/Sidebar';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { Login } from './shared/components';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>
          <DrawerProvider>
            <BrowserRouter>

              <Sidebar>
                <AppRoutes /> 
              </Sidebar>
              
            </BrowserRouter>
          </DrawerProvider>
        </Login>
        
      </AppThemeProvider>
    </AuthProvider>
  );
};
