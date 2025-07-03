// src/components/LabOperator/LabDashboardOverview.js
import React, { useState } from 'react';
import { FlaskConical, Upload, FileText, Clock, Plus, TestTube, Microscope, FileCheck, AlertCircle } from 'lucide-react';
import StatsCard from '../Common/StatsCard';
import Modal from '../Common/Modal';
import UploadReportForm from './UploadReportForm';
import CreateTemplateForm from './CreateTemplateForm';
import ProcessTestForm from './ProcessTestForm';

const LabDashboardOverview = () => {
  const [activeModal, setActiveModal] = useState(null);

  const stats = [
    { title: 'Pending Tests', value: '47', icon: Clock, color: 'orange', trend: '+8%' },
    { title: 'Completed Today', value: '23', icon: FileCheck, color: 'teal', trend: '+15%' },
    { title: 'Total Reports', value: '892', icon: FileText, color: 'teal', trend: '+12%' },
    { title: 'Urgent Tests', value: '5', icon: AlertCircle, color: 'orange', trend: '-3%' },
  ];

  const quickActions = [
    { title: 'Upload Report', icon: Upload, color: 'teal', description: 'Upload lab results' },
    { title: 'Create Template', icon: Plus, color: 'orange', description: 'New report template' },
    { title: 'Process Test', icon: TestTube, color: 'teal', description: 'Mark test complete' },
    { title: 'Quality Check', icon: Microscope, color: 'orange', description: 'Verify results' },
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
      case 'Upload Report':
        return <UploadReportForm onSubmit={handleSubmit} />;
      case 'Create Template':
        return <CreateTemplateForm onSubmit={handleSubmit} />;
      case 'Process Test':
        return <ProcessTestForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Lab Operator Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Lab Technician Sarah Johnson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveModal(action.title)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getColorClasses(action.color)}`}
              >
                <div className="text-center">
                  <div className="mb-2 flex justify-center">
                    <IconComponent className={`w-6 h-6 ${getIconColorClasses(action.color)}`} />
                  </div>
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-80 mt-1">{action.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Urgent Tests</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Blood Test - Patient {i}</div>
                  <div className="text-sm text-red-600">Due: {2 + i} hours ago</div>
                </div>
                <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">URGENT</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'upload', patient: 'Patient A', test: 'CBC Report', time: '2 min ago' },
              { type: 'complete', patient: 'Patient B', test: 'Urinalysis', time: '15 min ago' },
              { type: 'process', patient: 'Patient C', test: 'Lipid Panel', time: '32 min ago' },
              { type: 'upload', patient: 'Patient D', test: 'X-Ray Results', time: '1 hour ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'upload' ? 'bg-teal-100' : 'bg-orange-100'
                }`}>
                  {activity.type === 'upload' ? (
                    <Upload className={`w-5 h-5 ${activity.type === 'upload' ? 'text-teal-600' : 'text-orange-600'}`} />
                  ) : (
                    <FileCheck className={`w-5 h-5 ${activity.type === 'upload' ? 'text-teal-600' : 'text-orange-600'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{activity.test} - {activity.patient}</div>
                  <div className="text-sm text-gray-600">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Categories</h3>
          <div className="space-y-3">
            {[
              { name: 'Blood Tests', count: 23, color: 'teal' },
              { name: 'Urine Tests', count: 15, color: 'orange' },
              { name: 'Imaging', count: 8, color: 'teal' },
              { name: 'Cultures', count: 6, color: 'orange' },
            ].map((category, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${category.color === 'teal' ? 'bg-teal-500' : 'bg-orange-500'}`}></div>
                  <span className="font-medium text-gray-800">{category.name}</span>
                </div>
                <span className="text-sm text-gray-600">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Equipment Status</h3>
          <div className="space-y-3">
            {[
              { name: 'Microscope A', status: 'Active', color: 'teal' },
              { name: 'Analyzer B', status: 'Active', color: 'teal' },
              { name: 'Centrifuge C', status: 'Maintenance', color: 'orange' },
              { name: 'X-Ray Machine', status: 'Active', color: 'teal' },
            ].map((equipment, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">{equipment.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  equipment.color === 'teal' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {equipment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Summary</h3>
          <div className="space-y-4">
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">23</div>
              <div className="text-sm text-teal-700">Tests Completed</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">47</div>
              <div className="text-sm text-orange-700">Tests Pending</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">92%</div>
              <div className="text-sm text-gray-700">Efficiency Rate</div>
            </div>
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

export default LabDashboardOverview;