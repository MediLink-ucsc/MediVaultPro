import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NurseDashboardOverview from './NurseDashboardOverview';
import NursePatients from './NursePatients';
import Medications from './Medications';
import VitalSigns from './VitalSigns';
import CarePlans from './CarePlans';
import NurseSettings from './NurseSettings';

const NurseDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<NurseDashboardOverview />} />
      <Route path="/patients" element={<NursePatients />} />
      <Route path="/medications" element={<Medications />} />
      <Route path="/vitals" element={<VitalSigns />} />
      <Route path="/care-plans" element={<CarePlans />} />
      <Route path="/settings" element={<NurseSettings />} />
    </Routes>
  );
};

export default NurseDashboard;