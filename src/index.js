import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importamos Router, Routes y Route
import IngresoGasto from './components/IngresoGasto';
import OtroArchivo from './components/OtroArchivo'; // Importa la nueva página
import MainLayout from './components/MainLayout';  // Importa el Layout
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
        <MainLayout>
          <Routes>
            {/* Define las rutas y a qué componentes deben apuntar */}
            <Route path="/" element={<IngresoGasto />} />
            <Route path="/otro-archivo" element={<OtroArchivo />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
