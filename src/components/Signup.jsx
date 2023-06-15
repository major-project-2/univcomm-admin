import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { server } from "../env";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send login request to the server
    fetch(`${server}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Login successful
          return response.json();
        } else {
          throw new Error("Invalid email or password");
        }
      })
      .then((data) => {
        // Save token in local storage
        localStorage.setItem("adminToken", data.access_token);
        // Navigate to the dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("Error during login:", error);
        // Handle login error here (e.g., display error message)
      });
  };

  return (
    <Container maxWidth="xs" sx={containerStyle}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default function App() {
  return <LoginForm />;
}
