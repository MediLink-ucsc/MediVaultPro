// src/components/Nurse/VitalSigns.js
import React, { useState, useEffect } from 'react';
import { Activity, Heart, Thermometer, User, Search, Plus, TrendingUp } from 'lucide-react';
import Button from '../Common/Button';
import VitalSignsForm from './VitalSignsForm';
import dataStore from '../../utils/dataStore';

const VitalSigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showVitalSignsModal, setShowVitalSignsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [patients, setPatients] = useState([]);

  // Load data from store on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allVitals = dataStore.getVitalSigns();
    const allPatients = dataStore.getPatients();
    
    // Merge vitals with patient data
    const vitalsWithPatientInfo = allVitals.map(vital => {
      const patient = allPatients.find(p => p.id === vital.patientId);
      return {
        ...vital,
        patient: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
        condition: patient?.condition || 'Unknown condition'
      };
    });

    setVitalSigns(vitalsWithPatientInfo);
    setPatients(allPatients);
  };

  const filteredVitalSigns = vitalSigns.filter(vital =>
    vital.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vital.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusFromVitals = (vital) => {
    // Simple logic to determine status based on vital signs
    const tempValue = parseFloat(vital.temperature);
    const heartRateValue = parseInt(vital.heartRate);
    const oxygenValue = parseInt(vital.oxygenSaturation);

    if (tempValue > 100.4 || heartRateValue > 100 || oxygenValue < 95) {
      return 'concerning';
    } else if (tempValue > 99.5 || heartRateValue > 90 || oxygenValue < 97) {
      return 'elevated';
    } else {
      return 'normal';
    }
  };

  const getStatusColor = (vital) => {
    const status = getStatusFromVitals(vital);
    switch (status) {
      case 'normal':
        return 'bg-teal-100 text-teal-800';
      case 'elevated':
        return 'bg-orange-100 text-orange-800';
      case 'concerning':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (vital) => {
    const status = getStatusFromVitals(vital);
    switch (status) {
      case 'normal':
        return <Activity className="w-4 h-4 text-teal-600" />;
      case 'elevated':
        return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'concerning':
        return <Heart className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleRecordVitals = () => {
    // For now, we'll use the first patient. In a real app, this would be a patient selector
    if (patients.length > 0) {
      setSelectedPatient(patients[0]);
      setShowVitalSignsModal(true);
    } else {
      alert('No patients available. Please register a patient first.');
    }
  };

  const handleVitalSignsSubmit = (vitalSigns) => {
    console.log('Vital signs recorded:', vitalSigns);
    setShowVitalSignsModal(false);
    setSelectedPatient(null);
    // Reload data to show the new vitals
    loadData();
    alert('Vital signs recorded successfully!');
  };

  const handleCancelVitalSigns = () => {
    setShowVitalSignsModal(false);
    setSelectedPatient(null);
  };

  const getTimeAgo = (dateString, timeString) => {
    try {
      const vitalDateTime = new Date(`${dateString} ${timeString}`);
      const now = new Date();
      const diffMs = now - vitalDateTime;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);
      
      if (diffMins < 60) {
        return `${diffMins} minutes ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else {
        return dateString;
      }
    } catch (error) {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Vital Signs Monitor</h1>
          <p className="text-gray-600 mt-2">Track and record patient vital signs</p>
        </div>
        <Button
          variant="primary"
          role="nurse"
          size="md"
          icon={Plus}
          onClick={handleRecordVitals}
        >
          Record Vitals
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredVitalSigns.map((vital) => (
              <div key={vital.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{vital.patient}</h3>
                      <p className="text-sm text-gray-600">{vital.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(vital)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vital)}`}>
                      {getStatusFromVitals(vital).charAt(0).toUpperCase() + getStatusFromVitals(vital).slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-medium text-gray-600">Temperature</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{vital.temperature}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Heart className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-medium text-gray-600">Heart Rate</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{vital.heartRate}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="w-4 h-4 text-teal-500" />
                      <span className="text-xs font-medium text-gray-600">Blood Pressure</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{vital.bloodPressure}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="w-4 h-4 text-teal-500" />
                      <span className="text-xs font-medium text-gray-600">O2 Saturation</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{vital.oxygenSaturation}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">
                    Last updated: {getTimeAgo(vital.date, vital.time)}
                  </span>
                  <span className="text-xs text-gray-400">
                    By: {vital.recordedBy}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredVitalSigns.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No vital signs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Vital Signs Modal */}
      {showVitalSignsModal && selectedPatient && (
        <VitalSignsForm
          patient={selectedPatient}
          onSubmit={handleVitalSignsSubmit}
          onCancel={handleCancelVitalSigns}
        />
      )}
    </div>
  );
};

export default VitalSigns;
