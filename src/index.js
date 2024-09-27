import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IngresoGasto from './components/IngresoGasto';
import Login from './components/sistema/Login';
import PrivateRoute from './components/sistema/PrivateRoute';
import OtroArchivo from './components/OtroArchivo';
import MainLayout from './components/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route element={<MainLayout />}>
            <Route
              path="/ingreso-gasto"
              element={
                <PrivateRoute>
                  <IngresoGasto />
                </PrivateRoute>
              }
            />
            <Route
              path="/otro-archivo"
              element={
                <PrivateRoute>
                  <OtroArchivo />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();
