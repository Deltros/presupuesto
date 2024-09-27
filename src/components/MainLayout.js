import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleLogout = () => {

    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar con menú de hamburguesa */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mi Aplicación
          </Typography>
          {/* Botón de Logout a la derecha del AppBar */}
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (Menú Lateral) */}
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component="a" href="/ingreso-gasto">
              <ListItemText primary="Ingresar Gasto" />
            </ListItem>
            <ListItem button component="a" href="/otro-archivo">
              <ListItemText primary="Otra Página" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        {/* Aquí se renderizan las rutas hijas */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
