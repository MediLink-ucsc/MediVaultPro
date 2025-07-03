import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NurseDashboardOverview from './NurseDashboardOverview';

const NurseDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<NurseDashboardOverview />} />
    </Routes>
  );
};

export default NurseDashboard;