import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom

const MainLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
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
            <ListItem button component={Link} to="/">
              <ListItemText primary="Ingresar Gasto" />
            </ListItem>
            <ListItem button component={Link} to="/otro-archivo">
              <ListItemText primary="Otra Página" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
