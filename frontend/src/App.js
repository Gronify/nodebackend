import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Tables from "./components/Tables";
import Home from "./components/Home";

function App() {
  const [update, setUpdate] = useState(false);
  //TODO: auth check
  const auth = localStorage.getItem("token");
  function PrivateRoute({ children }) {
    return auth ? children : <Navigate to="/login" />;
  }
  return (
    <BrowserRouter>
      <Navbar auth={auth} setUpdate={setUpdate} update={update} />

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
          path="/tables"
          element={
            <PrivateRoute>
              <Tables />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setUpdate={setUpdate} update={update} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
