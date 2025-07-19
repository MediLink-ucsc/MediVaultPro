// src/components/Doctor/DashboardOverview.js
import React, { useState } from 'react';
import { Users, Calendar, FileText, Pill, Clipboard, FlaskConical, Stethoscope } from 'lucide-react';
import StatsCard from '../Common/StatsCard';
import Modal from '../Common/Modal';
import PrescriptionForm from './QuickActions/PrescriptionForm';
import LabOrderForm from './QuickActions/LabOrderForm';
import SOAPForm from './QuickActions/SOAPForm';
import QuickExamForm from './QuickActions/QuickExamForm';
import Button from '../Common/Button';

const DashboardOverview = ({user}) => {
  
  console.log("HEADER USER:", user);
  const [activeModal, setActiveModal] = useState(null);

  const stats = [
    { title: 'Total Patients', value: '1,234', icon: Users, color: 'teal', trend: '+12%' },
    { title: 'Today\'s Calendar Events', value: '24', icon: Calendar, color: 'orange', trend: '+3%' }, // Orange for urgent appointments
    { title: 'Pending Reports', value: '8', icon: FileText, color: 'orange', trend: '-2%' }, // Orange for pending urgent reports
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
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Dr. {user.firstName} {user.lastName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                <div className="mt-2">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-80 mt-1">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Patients</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Patient {i}</div>
                  <div className="text-sm text-orange-600">Requires immediate attention</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medication Schedule</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Pill className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Patient {i} - Medication</div>
                  <div className="text-sm text-gray-600">Due at {8 + i}:00 AM</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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