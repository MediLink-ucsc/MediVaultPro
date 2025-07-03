// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
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
            path="/" 
            element={<Navigate to="/doctor" />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;