import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, mode }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  const handleSubmit = async () => {
    const url = `http://127.0.0.1:4000/auth/${isLogin ? "login" : "signup"}`;
    try {
      const response = await axios.post(url, { email, password });
      console.log(response);
      Cookies.set("token", response.data.token);
      onClose();
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{isLogin ? "Login" : "Signup"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{isLogin ? "Login" : "Signup"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
