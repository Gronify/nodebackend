import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AuthService from "../services/AuthService";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Fill all fields!");
      return;
    }

    AuthService.login(email, password)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("role", response.data.user.role);
        props.setUpdate(!props.update);
        setError("");
        navigate("/");
      })
      .catch((e) => {
        setError("Incorrect email or password!");
        console.log(e.response?.data?.message);
      });
  };

  return (
    <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
      <Paper maxWidth="md" sx={{ width: "620px", mb: 3, p: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
          >
            <TextField
              fullWidth
              error={error.length > 0 ? true : false}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              variant="outlined"
              label="Email"
              name="email"
              type="text"
              autoFocus
            />
            <TextField
              fullWidth
              error={error.length > 0 ? true : false}
              helperText={error}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              variant="outlined"
              label="Password"
              name="password"
              type="password"
            />

            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
