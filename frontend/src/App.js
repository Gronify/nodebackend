import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [update, setUpdate] = useState(false);
  const auth = localStorage.getItem("token");
  function PrivateRoute({ children }) {
    return auth ? children : <Navigate to="/login" />;
  }
  return (
    <BrowserRouter>
      <Navbar auth={auth} />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setUpdate={setUpdate} update={update} />}
        />
        {/* <PrivateRoute path="/" element={<Home />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
