// src/components/Lab/LabDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LabDashboardOverview from './LabDashboardOverview';

const LabDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<LabDashboardOverview />} />
    </Routes>
  );
};

export default LabDashboard;