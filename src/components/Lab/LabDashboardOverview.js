// src/components/Lab/LabDashboardOverview.js
import React, { useState } from 'react';
import { FlaskConical, Upload, FileText, Clock, TestTube, Microscope, FileCheck, AlertCircle, TrendingUp } from 'lucide-react';
import StatsCard from '../Common/StatsCard';
import Modal from '../Common/Modal';
import ProcessTestForm from './ProcessTestForm';
import UploadReportForm from './UploadReportForm';


const LabDashboardOverview = ({user}) => {
  const [activeModal, setActiveModal] = useState(null);

  const stats = [
    { title: 'Pending Tests', value: '47', icon: Clock, color: 'orange', trend: '+8%', description: 'Tests awaiting processing' },
    { title: 'Completed Today', value: '23', icon: FileCheck, color: 'teal', trend: '+15%', description: 'Successfully completed' },
    { title: 'Total Reports', value: '892', icon: FileText, color: 'teal', trend: '+12%', description: 'All time reports' },
    { title: 'Urgent Tests', value: '5', icon: AlertCircle, color: 'orange', trend: '-3%', description: 'High priority items' },
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
      case 'Process Test':
        return <ProcessTestForm onSubmit={handleSubmit} />;
      case 'Upload Report':
        return <UploadReportForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Lab Operator Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.firstName} {user.lastName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <stat.icon className={`w-5 h-5 ${getIconColorClasses(stat.color)}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{stat.description}</p>
                  <div className={`flex items-center text-xs font-medium ${
                    stat.trend.startsWith('+') ? 'text-teal-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${
                      stat.trend.startsWith('-') ? 'transform rotate-180' : ''
                    }`} />
                    {stat.trend}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Urgent Tests</h3>
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
              {[1, 2, 3, 4].length} Active
            </span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 transition-colors duration-200">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Blood Test - Patient {i}</div>
                  <div className="text-sm text-red-600 font-medium">Due: {2 + i} hours ago</div>
                  <div className="text-xs text-gray-500 mt-1">Sample ID: BT-{1000 + i}</div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <div className="text-xs bg-red-200 text-red-800 px-3 py-1 rounded-full font-medium">URGENT</div>
                  <button className="text-xs text-red-600 hover:text-red-800 font-medium">Process →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All →</button>
          </div>
          <div className="space-y-3">
            {[
              { type: 'upload', patient: 'Patient A', test: 'CBC Report', time: '2 min ago', status: 'completed' },
              { type: 'complete', patient: 'Patient B', test: 'Urinalysis', time: '15 min ago', status: 'completed' },
              { type: 'process', patient: 'Patient C', test: 'Lipid Panel', time: '32 min ago', status: 'in-progress' },
              { type: 'upload', patient: 'Patient D', test: 'X-Ray Results', time: '1 hour ago', status: 'completed' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  activity.type === 'upload' ? 'bg-teal-100' : 'bg-orange-100'
                }`}>
                  {activity.type === 'upload' ? (
                    <Upload className={`w-6 h-6 text-teal-600`} />
                  ) : (
                    <FileCheck className={`w-6 h-6 text-orange-600`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{activity.test}</div>
                  <div className="text-sm text-gray-600">{activity.patient}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
                <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                  activity.status === 'completed' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {activity.status}
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

export default LabDashboardOverview;