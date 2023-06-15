import React, { useState } from "react";
import Navbar from "./components/Navbar";
// import Tabs from "./components/Tabs";
import Tabs from "./components/tabs";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoutes";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("tadminToken") ? true : false
  );
  console.log(isAuthenticated);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
