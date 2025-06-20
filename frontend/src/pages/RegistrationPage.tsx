import React, { useState, type JSX } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Registration page component for new user signup.
 * Collects user information including username, email, password, name, and age.
 * Submits data to the API and redirects to login on success.
 * 
 * @component
 * @returns {JSX.Element} Registration page component
 */
const RegistrationPage = (): JSX.Element => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handles registration form submission
  // Sends a POST request to the registration endpoint with user data
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, age: parseInt(formData.age) }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // Redirects to the main page after 2 seconds
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handles Enter key press to submit the form
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  // Renders the registration form with input fields and a submit button
  // Displays error or success messages based on registration outcome
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">Registration successful! Redirecting...</Typography>}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          margin="normal"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister} onKeyDown={handleKeyDown}>
          Register
        </Button>
        <Typography
          variant="body2"
          sx={{ marginTop: "16px", textAlign: "center", color: "#1a2b6d", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;