// src/components/Doctor/EnhancedPatientDetails.js
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  FileText, 
  Stethoscope, 
  Pill, 
  Activity, 
  AlertCircle,
  Plus,
  Download,
  ChevronDown,
  ChevronUp,
  Heart,
  Thermometer,
  ClipboardList,
  Eye,
  Clock,
  CheckCircle,
  Circle
} from 'lucide-react';
import MedicalHistory from './MedicalHistory';
import Prescriptions from './Prescriptions';
import dataStore from '../../utils/dataStore';

const EnhancedPatientDetails = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    vitals: true,
    carePlans: true,
    medications: true,
    history: true
  });
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    if (patient) {
      // Get comprehensive patient data from data store
      const summary = dataStore.getPatientSummary(patient.id);
      const vitals = dataStore.getVitalSigns(patient.id);
      const carePlans = dataStore.getCarePlans(patient.id);
      const medications = dataStore.getMedications(patient.id);
      const history = dataStore.getMedicalHistory(patient.id);

      setPatientData({
        ...patient,
        summary,
        allVitals: vitals,
        carePlans,
        medications,
        history,
        // Mock additional data for comprehensive view
        email: patient.email || 'patient@email.com',
        address: patient.address || 'Address not provided',
        emergencyContact: {
          name: 'Emergency Contact',
          relationship: 'Family',
          phone: patient.emergencyContact || 'Not provided'
        },
        insurance: {
          provider: 'National Health Insurance',
          policyNumber: 'NHI-' + patient.id,
          groupNumber: 'GRP-001'
        }
      });
    }
  }, [patient]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'vitals', label: 'Vital Signs', icon: Activity },
    { id: 'carePlans', label: 'Care Plans', icon: ClipboardList },
    { id: 'history', label: 'Medical History', icon: FileText },
    { id: 'medications', label: 'Prescriptions', icon: Pill }
  ];

  const getVitalStatus = (vital) => {
    const tempValue = parseFloat(vital.temperature);
    const heartRateValue = parseInt(vital.heartRate);
    const oxygenValue = parseInt(vital.oxygenSaturation);

    if (tempValue > 100.4 || heartRateValue > 100 || oxygenValue < 95) {
      return { status: 'concerning', color: 'text-red-600' };
    } else if (tempValue > 99.5 || heartRateValue > 90 || oxygenValue < 97) {
      return { status: 'elevated', color: 'text-orange-600' };
    } else {
      return { status: 'normal', color: 'text-green-600' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString, timeString) => {
    return `${formatDate(dateString)} at ${timeString}`;
  };

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Patient Basic Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Full Name:</span>
              <span className="text-sm font-medium">
                {patientData.firstName} {patientData.lastName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Age:</span>
              <span className="text-sm font-medium">{patientData.age} years</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Gender:</span>
              <span className="text-sm font-medium">{patientData.gender}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Phone:</span>
              <span className="text-sm font-medium">{patientData.phone}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Address:</span>
              <span className="text-sm font-medium">{patientData.address || 'Not provided'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Condition:</span>
              <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                {patientData.condition}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Assigned Nurse:</span>
              <span className="text-sm font-medium">{patientData.assignedNurse}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Last Visit:</span>
              <span className="text-sm font-medium">{formatDate(patientData.lastVisit)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Vital Signs */}
      {patientData.allVitals.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Latest Vital Signs</h3>
            <button 
              onClick={() => toggleSection('vitals')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.vitals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          {expandedSections.vitals && (
            <div>
              {patientData.allVitals.slice(-1).map((vital, index) => {
                const status = getVitalStatus(vital);
                return (
                  <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-medium text-gray-600">Temperature</span>
                      </div>
                      <p className={`text-lg font-semibold ${status.color}`}>{vital.temperature}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-medium text-gray-600">Heart Rate</span>
                      </div>
                      <p className={`text-lg font-semibold ${status.color}`}>{vital.heartRate}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-medium text-gray-600">Blood Pressure</span>
                      </div>
                      <p className={`text-lg font-semibold ${status.color}`}>{vital.bloodPressure}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Activity className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-medium text-gray-600">O2 Saturation</span>
                      </div>
                      <p className={`text-lg font-semibold ${status.color}`}>{vital.oxygenSaturation}</p>
                    </div>
                  </div>
                );
              })}
              <div className="mt-3 text-sm text-gray-500">
                Recorded by {patientData.allVitals[patientData.allVitals.length - 1]?.recordedBy} on{' '}
                {formatDateTime(
                  patientData.allVitals[patientData.allVitals.length - 1]?.date,
                  patientData.allVitals[patientData.allVitals.length - 1]?.time
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Care Plans */}
      {patientData.carePlans.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Active Care Plans</h3>
            <button 
              onClick={() => toggleSection('carePlans')}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedSections.carePlans ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          {expandedSections.carePlans && (
            <div className="space-y-4">
              {patientData.carePlans.filter(plan => plan.status === 'Active').map((plan) => (
                <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{plan.planType}</h4>
                    <span className="text-sm text-orange-600 font-medium">{plan.progress}% complete</span>
                  </div>
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Duration: {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Created by: {plan.createdBy}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderVitalSigns = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Vital Signs History</h3>
      <div className="space-y-4">
        {patientData.allVitals.map((vital, index) => {
          const status = getVitalStatus(vital);
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {formatDateTime(vital.date, vital.time)}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  status.status === 'normal' ? 'bg-green-100 text-green-800' :
                  status.status === 'elevated' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Temperature</p>
                  <p className={`text-lg font-semibold ${status.color}`}>{vital.temperature}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Heart Rate</p>
                  <p className={`text-lg font-semibold ${status.color}`}>{vital.heartRate}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Blood Pressure</p>
                  <p className={`text-lg font-semibold ${status.color}`}>{vital.bloodPressure}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">O2 Saturation</p>
                  <p className={`text-lg font-semibold ${status.color}`}>{vital.oxygenSaturation}</p>
                </div>
              </div>
              {vital.notes && (
                <div className="mt-3 text-sm text-gray-600">
                  <strong>Notes:</strong> {vital.notes}
                </div>
              )}
              <div className="mt-2 text-xs text-gray-500">
                Recorded by: {vital.recordedBy}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCarePlans = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Care Plans</h3>
      <div className="space-y-6">
        {patientData.carePlans.map((plan) => (
          <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800">{plan.planType}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {plan.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-600">Duration:</span>
                <p className="font-medium">{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Progress:</span>
                <p className="font-medium">{plan.progress}% complete</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-medium text-gray-700 mb-2">Tasks:</h5>
              <div className="space-y-2">
                {plan.tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-2">
                    {task.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {task.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Created by: {plan.createdBy}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'vitals':
        return renderVitalSigns();
      case 'carePlans':
        return renderCarePlans();
      case 'history':
        return <MedicalHistory patient={patientData} />;
      case 'medications':
        return <Prescriptions patient={patientData} />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {patientData.firstName} {patientData.lastName}
          </h1>
          <p className="text-gray-600">Patient ID: {patientData.id}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default EnhancedPatientDetails;
