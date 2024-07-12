import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import Header from "./Header";
import AuthModal from "./AuthModal";
import { useState } from "react";

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleAuthModalOpen = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div>
      <Header
        onLogin={() => handleAuthModalOpen("login")}
        onSignup={() => handleAuthModalOpen("signup")}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        mode={authMode}
      />
    </div>
  );
};

export default App;
