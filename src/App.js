// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import NurseDashboard from "./components/Nurse/NurseDashboard";
import LabDashboard from "./components/Lab/LabDashboard";
import Layout from "./components/Layout/Layout";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("medivaultpro_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("medivaultpro_user", JSON.stringify(userData));
  };

  // const handleLogout = () => {
  //   setUser(null);
  //   localStorage.removeItem('medivaultpro_user');
  // };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Logging out with token:", token);
      const res = await fetch(
        "http://localhost:3000/api/v1/auth/medvaultpro/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // credentials: "include",
        }
      );
      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("medivaultpro_user");
        setUser(null);
      } else {
        console.error("Logout failed", await res.text());
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Router>
      {!user ? (
        // Show login if no user
        <Login onLogin={handleLogin} />
      ) : (
        // Show app routes if logged in
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            <Route
              path="/doctor/*"
              element={
                user.role === "DOCTOR" ? (
                  <DoctorDashboard user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/nurse/*"
              element={
                user.role === "NURSE" || user.role === "MEDICAL_STAFF" ? (
                  <NurseDashboard user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/lab/*"
              element={
                user.role === "LAB_ASSISTANT" ? (
                  <LabDashboard user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            {/* Add admin route if needed */}
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    user.role === "DOCTOR"
                      ? "/doctor"
                      : user.role === "NURSE" || user.role === "MEDICAL_STAFF"
                      ? "/nurse"
                      : user.role === "LAB_ASSISTANT"
                      ? "/lab"
                      : "/"
                  }
                />
              }
            />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App;
