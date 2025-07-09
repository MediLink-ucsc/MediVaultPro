import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NurseDashboardOverview from './NurseDashboardOverview';

const NurseDashboard = ({user}) => {
  return (
    <Routes>
      <Route path="/" element={<NurseDashboardOverview user={user}/>} />
    </Routes>
  );
};

export default NurseDashboard;