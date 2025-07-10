import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Auth from './components/Auth/Auth';
import ForgotPassword from './components/Auth/ForgotPassword';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import NurseDashboard from './components/Nurse/NurseDashboard';
import LabDashboard from './components/Lab/LabDashboard';
import SystemAdminDashboard from './components/SystemAdmin/SystemAdminDashboard';
import Layout from './components/Layout/Layout';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'signup', 'forgot-password'

  // Check for user in localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('medivaultpro_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Store user in localStorage
    localStorage.setItem('medivaultpro_user', JSON.stringify(userData));
  };

  const handleSignup = (userData) => {
    // In a real app, this would make an API call to create the user
    setUser(userData);
    // Store user in localStorage
    localStorage.setItem('medivaultpro_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    // Remove user from localStorage
    localStorage.removeItem('medivaultpro_user');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  const switchToForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const switchToLanding = () => {
    setCurrentView('landing');
  };

  if (!user) {
    if (currentView === 'forgot-password') {
      return <ForgotPassword onBackToLogin={switchToLogin} />;
    }
    
    if (currentView === 'signup' || currentView === 'login') {
      return (
        <Auth 
          context="page"
          onLogin={handleLogin} 
          onSignup={handleSignup}
          onSwitchToForgotPassword={switchToForgotPassword}
          onBackToLanding={switchToLanding}
        />
      );
    }
    
    // Default to landing page
    return (
      <LandingPage 
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route 
            path="/doctor/*" 
            element={user.role === 'doctor' ? <DoctorDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/nurse/*" 
            element={user.role === 'nurse' ? <NurseDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/lab/*" 
            element={user.role === 'lab' ? <LabDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/systemadmin/*" 
            element={user.role === 'systemadmin' ? <SystemAdminDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={
              <Navigate to={
                user.role === 'doctor' ? '/doctor' : 
                user.role === 'nurse' ? '/nurse' : 
                user.role === 'systemadmin' ? '/systemadmin' : '/lab'
              } />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;