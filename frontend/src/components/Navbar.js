import React from "react";
import { Link } from "react-router-dom";
import { Button, Toolbar, AppBar, Typography } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
export default function Navbar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        {props.auth ? (
          <Button color="inherit" component={Link} endIcon={<Logout />}>
            Logout
          </Button>
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
