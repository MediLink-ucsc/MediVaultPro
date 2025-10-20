// src/components/Doctor/DashboardOverview.js
import React, { useState } from 'react';
import { Users, FileText, Pill, Clipboard, FlaskConical, Stethoscope, Activity } from 'lucide-react';
import StatsCard from '../Common/StatsCard';
import Modal from '../Common/Modal';
import PrescriptionForm from './QuickActions/PrescriptionForm';
import LabOrderForm from './QuickActions/LabOrderForm';
import SOAPForm from './QuickActions/SOAPForm';
import QuickExamForm from './QuickActions/QuickExamForm';
import Button from '../Common/Button';
import axios from 'axios';
import { useEffect } from 'react';

const DashboardOverview = ({user}) => {
  
  console.log("HEADER USER:", user);
  const [activeModal, setActiveModal] = useState(null);

  const [visitedCount, setVisitedCount] = useState('-');
  const [prescriptionCount, setPrescriptionCount] = useState('-');
  const [emergencyCount, setEmergencyCount] = useState('-'); // new state

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchVisitedPatientsCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/patientRecords/doctor/visitedpatientcount`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVisitedCount(res.data.visitedPatientsCount);
      } catch (error) {
        console.error('Error fetching visited patients count:', error);
        setVisitedCount('-');
      }
    };

    const fetchPrescriptionCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/patientRecords/doctor/prescriptioncount`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPrescriptionCount(res.data.prescriptionsCount);
      } catch (error) {
        console.error('Error fetching prescription count:', error);
        setPrescriptionCount('-');
      }
    };

    const fetchEmergencyCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/patientRecords/doctor/emergencypatientcount`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEmergencyCount(res.data.emergencyPatientsCount);
      } catch (error) {
        console.error('Error fetching emergency patients count:', error);
        setEmergencyCount('-');
      }
    };

    fetchVisitedPatientsCount();
    fetchPrescriptionCount();
    fetchEmergencyCount(); // call new API
  }, []);

  const stats = [
  {
    title: 'Patient Visits',
    value: visitedCount,
    icon: Users,
    color: 'teal',
    trend: 'Total patients you have seen',
  },
  {
    title: 'Prescriptions',
    value: prescriptionCount,
    icon: Activity,
    color: 'teal',
    trend: 'Prescriptions you have issued to patients',
  },
  {
    title: 'Emergency Patients',
    value: emergencyCount,
    icon: FileText,
    color: 'orange',
    trend: 'Number of patients in emergency condition',
  },
];


  const quickActions = [
    { title: 'Prescribe', icon: Pill, color: 'orange', description: 'Write prescription' }, // Orange for urgent prescriptions
    { title: 'Order Lab', icon: FlaskConical, color: 'teal', description: 'Laboratory tests' },
    { title: 'SOAP Note', icon: Clipboard, color: 'teal', description: 'Create medical note' },
    { title: 'Quick Exam', icon: Stethoscope, color: 'orange', description: 'Patient examination' }, // Orange for urgent examinations
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      teal: 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
    };
    return colorMap[color] || colorMap.teal;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      teal: 'text-teal-600',
      orange: 'text-orange-600',
    };
    return colorMap[color] || colorMap.teal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted for:', activeModal);
    setActiveModal(null);
  };

  const getModalContent = () => {
    switch (activeModal) {
      case 'Prescribe':
        return <PrescriptionForm onSubmit={handleSubmit} />;
      case 'Order Lab':
        return <LabOrderForm onSubmit={handleSubmit} />;
      case 'SOAP Note':
        return <SOAPForm onSubmit={handleSubmit} />;
      case 'Quick Exam':
        return <QuickExamForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, Dr. {user.firstName} {user.lastName}
        </p>
      </div>

      {/* Stats Cards: 3 cards full width */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[300px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                onClick={() => setActiveModal(action.title)}
                variant="secondary"
                role={action.color === 'orange' ? 'urgent' : 'doctor'}
                size="lg"
                icon={IconComponent}
                className="flex-col h-auto py-4 text-center"
                fullWidth
              >
                <div className="mt-2 py-6">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-80 mt-1">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal}
      >
        {getModalContent()}
      </Modal>
    </div>

  );
};

export default DashboardOverview;