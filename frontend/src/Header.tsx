import React from "react";
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
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Phone Shop
          </Typography>
          <Button color="inherit" onClick={onLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={onSignup}>
            Signup
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
