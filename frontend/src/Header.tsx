import React from "react";
import Cookies from "js-cookie";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

interface HeaderProps {
  onLogin: () => void;
  onSignup: () => void;
}

const Header = ({ onLogin, onSignup }: HeaderProps) => {
  const isLoggedIn = !!Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Phone Shop
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={onLogin}>
                Login
              </Button>
              <Button color="inherit" onClick={onSignup}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
