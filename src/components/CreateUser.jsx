import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const branchOptions = ["CSE", "Electronics", "Chemical Engineering"];
const batchOptions = ["2019-2023", "2020-2024", "2021-2025"];

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [batch, setBatch] = useState("");
  const [branch, setBranch] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== reenterPassword) {
      console.log("Passwords do not match");
      return;
    }

    const userData = {
      firstName,
      lastName,
      phoneNo,
      email,
      rollNo,
      batch,
      branch,
      password,
    };

    fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          // User creation successful
          console.log("User created successfully");

          // Reset form fields
          setFirstName("");
          setLastName("");
          setPhoneNo("");
          setEmail("");
          setRollNo("");
          setBatch("");
          setBranch("");
          setPassword("");
          setReenterPassword("");
        } else {
          // User creation failed
          console.log("User creation failed");
          throw new Error("User creation failed");
        }
      })
      .catch((error) => {
        console.log("Error during user creation:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone No"
              fullWidth
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Roll No"
              fullWidth
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Batch</InputLabel>
              <Select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                required
              >
                <MenuItem value="">Select Batch</MenuItem>
                {batchOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <MenuItem value="">Select Branch</MenuItem>
                {branchOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Re-enter Password"
              type="password"
              fullWidth
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Create User
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateUser;
