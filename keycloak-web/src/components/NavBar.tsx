import React from 'react';
import { Link } from 'react-router-dom';
import { useKeycloak } from '../context/KeycloakContext';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { keycloak, authenticated } = useKeycloak();

  const handleLogin = () => {
    keycloak?.login();
  };

  const handleLogout = () => {
    keycloak?.logout();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Keycloak POC
          </Link>
        </Typography>
        {authenticated ? (
          <>
            <Button color="inherit" component={Link} to="/my-account">
              My Account
            </Button>
            <Button color="inherit" component={Link} to="/my-items">
              My Items
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
