import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const auth = sessionStorage.getItem("user");
  function PrivateRoute({ children }) {
    return auth ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <div>
        <Navbar auth={auth} />

        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          /> */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
