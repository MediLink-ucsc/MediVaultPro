// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Auth from "./components/Auth/Auth";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import NurseDashboard from "./components/Nurse/NurseDashboard";
import LabDashboard from "./components/Lab/LabDashboard";
import SystemAdminDashboard from "./components/SystemAdmin/SystemAdminDashboard";
import Layout from "./components/Layout/Layout";
import ApiService from "./services/apiService";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("landing"); // 'landing', 'login', 'signup'

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

  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem("medivaultpro_user", JSON.stringify(userData));
  };

  // const handleLogout = () => {
  //   setUser(null);
  //   localStorage.removeItem('medivaultpro_user');
  // };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");

      // Use ApiService instead of direct fetch
      await ApiService.logout();

      localStorage.removeItem("token");
      localStorage.removeItem("medivaultpro_user");
      setUser(null);
      setCurrentView("landing");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const switchToLogin = () => {
    setCurrentView("login");
  };

  const switchToLanding = () => {
    setCurrentView("landing");
  };

  if (!user) {
    if (currentView === "signup" || currentView === "login") {
      return (
        <Auth
          context="page"
          onLogin={handleLogin}
          onSignup={handleSignup}
          onBackToLanding={switchToLanding}
        />
      );
    }

    // Default to landing page
    return <LandingPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route
            path="/doctor/*"
            element={
              user.role === "doctor" ? <DoctorDashboard /> : <Navigate to="/" />
            }
          />
          <Route
            path="/nurse/*"
            element={
              user.role === "nurse" ? <NurseDashboard /> : <Navigate to="/" />
            }
          />
          <Route
            path="/lab/*"
            element={
              user.role === "lab" ? <LabDashboard /> : <Navigate to="/" />
            }
          />
          <Route
            path="/systemadmin/*"
            element={
              user.role === "systemadmin" ? (
                <SystemAdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={
              <Navigate
                to={
                  user.role === "doctor"
                    ? "/doctor"
                    : user.role === "nurse"
                    ? "/nurse"
                    : user.role === "systemadmin"
                    ? "/systemadmin"
                    : "/lab"
                }
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
