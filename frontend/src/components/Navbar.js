import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Toolbar, AppBar, Typography } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import AuthService from "../services/AuthService";

export default function Navbar(props) {
  const navigate = useNavigate();
  function logout() {
    AuthService.logout()
      .then((response) => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.response?.data?.message);
      });
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        {props.auth ? (
          <div>
            <Button
              color="inherit"
              endIcon={<Logout />}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            endIcon={<Login />}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
