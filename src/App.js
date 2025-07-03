// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import NurseDashboard from './components/Nurse/NurseDashboard';
import LabDashboard from './components/Lab/LabDashboard';
import Layout from './components/Layout/Layout';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

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

  const handleLogout = () => {
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem('medivaultpro_user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
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
            path="/" 
            element={
              <Navigate to={
                user.role === 'doctor' ? '/doctor' : 
                user.role === 'nurse' ? '/nurse' : '/lab'
              } />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;