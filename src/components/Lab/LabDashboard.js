// src/components/Lab/LabDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LabDashboardOverview from './LabDashboardOverview';
import LabReports from './LabReports';
import Settings from './Settings';

const LabDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<LabDashboardOverview />} />
      <Route path="/reports" element={<LabReports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default LabDashboard;