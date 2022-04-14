import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { Sidebar } from "./shared/components/sidebar/Sidebar";
import { AppThemeProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Sidebar>
          <AppRoutes />
        </Sidebar>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
