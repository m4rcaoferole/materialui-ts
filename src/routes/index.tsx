import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages';

import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          // <Button
          //   variant="contained"
          //   color="primary"
          //   onClick={toggleDrawerOpen}
          // >
          //   Toggle Drawer
          // </Button>
          <Dashboard />
        }
      />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
