// src/components/Lab/LabDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LabDashboardOverview from './LabDashboardOverview';
import LabReports from './LabReports';
import Settings from './Settings';
import Analytics from './Analytics';
import Samples from './Samples';

const LabDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<LabDashboardOverview />} />
      <Route path="/samples" element={<Samples />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/reports" element={<LabReports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default LabDashboard;