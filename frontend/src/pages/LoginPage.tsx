import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", credentials.username);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin(); // Az Enter lenyomásakor aktiválja a gombot
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "#ffffff", // Fehér háttér
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} onKeyDown={handleKeyDown}>
          Login
        </Button>
        <Typography
          variant="body2"
          sx={{ marginTop: "16px", textAlign: "center", color: "#1a2b6d", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
        Don't have an account? Register here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;