import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardList, FileText, Stethoscope, Pill } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SOAPForm from './QuickActions/SOAPForm';
import LabOrderForm from './QuickActions/LabOrderForm';
import QuickExamForm from './QuickActions/QuickExamForm';
import PrescriptionForm from './QuickActions/PrescriptionForm';

const PatientDetailsTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('soap');

  // Get patient data from navigation state
  const patient = location.state?.patient;

  // If no patient data, redirect back to patient list
  if (!patient) {
    navigate('/doctor/patients');
    return null;
  }

  const handleBack = () => {
    navigate('/doctor/patients');
  };

  // Tab configuration with icons and labels
  const tabs = [
    {
      id: 'soap',
      label: 'SOAP Note',
      icon: ClipboardList,
      color: 'teal',
      description: 'Document patient examination',
      activeClass: 'text-teal-600 bg-teal-50',
      indicatorClass: 'bg-teal-600',
      mobileActiveClass: 'bg-teal-100 text-teal-600'
    },
    {
      id: 'lab',
      label: 'Lab Order',
      icon: FileText,
      color: 'teal',
      description: 'Order laboratory tests',
      activeClass: 'text-teal-600 bg-teal-50',
      indicatorClass: 'bg-teal-600',
      mobileActiveClass: 'bg-teal-100 text-teal-600'
    },
    {
      id: 'exam',
      label: 'Quick Exam',
      icon: Stethoscope,
      color: 'orange',
      description: 'Record quick examination',
      activeClass: 'text-orange-600 bg-orange-50',
      indicatorClass: 'bg-orange-600',
      mobileActiveClass: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'prescription',
      label: 'Prescription',
      icon: Pill,
      color: 'orange',
      description: 'Prescribe medications',
      activeClass: 'text-orange-600 bg-orange-50',
      indicatorClass: 'bg-orange-600',
      mobileActiveClass: 'bg-orange-100 text-orange-600'
    }
  ];

  // Tab content animation variants
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };

  const renderTabContent = () => {
    const commonProps = {
      selectedPatient: patient,
      onSubmit: (e) => {
        // Handle form submission if needed
        console.log(`${activeTab} form submitted for patient:`, patient.name);
      }
    };

    switch (activeTab) {
      case 'soap':
        return <SOAPForm {...commonProps} />;
      case 'lab':
        return <LabOrderForm {...commonProps} />;
      case 'exam':
        return <QuickExamForm {...commonProps} />;
      case 'prescription':
        return <PrescriptionForm {...commonProps} />;
      default:
        return <SOAPForm {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with patient info and back button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Patients</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Patient Actions - {patient.name}
              </h1>
              <p className="text-gray-600">
                ID: {patient.id} | Age: {patient.age} | Gender: {patient.gender}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                patient.condition === "Critical"
                  ? "bg-red-100 text-red-800"
                  : patient.condition === "Serious"
                  ? "bg-orange-100 text-orange-800"
                  : patient.condition === "Fair"
                  ? "bg-yellow-100 text-yellow-800"
                  : patient.condition === "Good"
                  ? "bg-green-100 text-green-800"
                  : patient.condition === "Stable"
                  ? "bg-teal-100 text-teal-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {patient.condition}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 group relative flex flex-col items-center py-4 px-6 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? tab.activeClass
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon 
                    className={`w-6 h-6 mb-2 transition-colors ${
                      isActive ? tab.activeClass.split(' ')[0] : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  <span className="font-semibold">{tab.label}</span>
                  <span className="text-xs text-gray-400 mt-1 hidden sm:block">
                    {tab.description}
                  </span>
                  
                  {/* Active tab indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-1 ${tab.indicatorClass} rounded-t-md`}
                      initial={false}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-[600px]"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Optional: Quick navigation pills for mobile */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-2 px-1 rounded-full transition-all ${
                  isActive
                    ? tab.mobileActiveClass
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsTabs;