// src/components/Nurse/CarePlans.js
import React, { useState, useEffect } from 'react';
import { ClipboardList, User, Calendar, CheckCircle, Circle, Search, Plus, Edit, Eye } from 'lucide-react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Button from '../Common/Button';
import CarePlanForm from './CarePlanForm';
import dataStore from '../../utils/dataStore';

const CarePlans = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const patientIdFromUrl = searchParams.get('patientId');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showCarePlanForm, setShowCarePlanForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedCarePlan, setSelectedCarePlan] = useState(null);
  const [carePlans, setCarePlans] = useState([]);
  const [patients, setPatients] = useState([]);

  // Load data from store on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allCarePlans = dataStore.getCarePlans();
    const allPatients = dataStore.getPatients();
    
    // Merge care plans with patient data
    const carePlansWithPatientInfo = allCarePlans.map(plan => {
      const patient = allPatients.find(p => p.id === plan.patientId);
      return {
        ...plan,
        patient: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
        condition: patient?.condition || 'Unknown condition'
      };
    });

    setCarePlans(carePlansWithPatientInfo);
    setPatients(allPatients);
  };

  const filteredCarePlans = carePlans.filter(plan => {
    // If patientId is provided in URL, filter by that patient first
    if (patientIdFromUrl && plan.patientId !== parseInt(patientIdFromUrl)) {
      return false;
    }
    
    // Then apply search term filter
    return (
      plan.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.planType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCreateCarePlan = () => {
    // For now, we'll use the first patient. In a real app, this would be a patient selector
    if (patients.length > 0) {
      setSelectedPatient(patients[0]);
      setSelectedCarePlan(null);
      setShowCarePlanForm(true);
    } else {
      alert('No patients available. Please register a patient first.');
    }
  };

  const handleEditCarePlan = (carePlan) => {
    const patient = patients.find(p => p.id === carePlan.patientId);
    if (patient) {
      setSelectedPatient(patient);
      setSelectedCarePlan(carePlan);
      setShowCarePlanForm(true);
    }
  };

  const handleCarePlanSubmit = (carePlan) => {
    console.log('Care plan saved:', carePlan);
    setShowCarePlanForm(false);
    setSelectedPatient(null);
    setSelectedCarePlan(null);
    // Reload data to show the new/updated care plan
    loadData();
    alert(`Care plan ${selectedCarePlan ? 'updated' : 'created'} successfully!`);
  };

  const handleCancelCarePlan = () => {
    setShowCarePlanForm(false);
    setSelectedPatient(null);
    setSelectedCarePlan(null);
  };

  const handleToggleTask = (carePlanId, taskId) => {
    const carePlan = carePlans.find(cp => cp.id === carePlanId);
    const task = carePlan.tasks.find(t => t.id === taskId);
    
    const taskUpdate = {
      completed: !task.completed,
      completedDate: !task.completed ? new Date().toISOString().split('T')[0] : null,
      completedBy: !task.completed ? 'Current Nurse' : null
    };

    const updatedPlan = dataStore.updateCarePlanTask(carePlanId, taskId, taskUpdate);
    if (updatedPlan) {
      loadData(); // Reload to show updated progress
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-teal-500';
    if (progress >= 60) return 'bg-teal-400';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {patientIdFromUrl ? `Care Plans` : 'Care Plans'}
          </h1>
          <p className="text-gray-600 mt-2">
            {patientIdFromUrl 
              ? `Viewing care plans for selected patient` 
              : 'Manage and track patient care plans'
            }
          </p>
        </div>
        <button 
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200 flex items-center space-x-2"
          onClick={handleCreateCarePlan}
        >
          <Plus className="w-5 h-5" />
          <span>New Care Plan</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search care plans or patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {filteredCarePlans.map((plan) => (
              <div key={plan.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{plan.patient}</h3>
                      <p className="text-sm text-gray-600">{plan.condition} • {plan.planType}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(plan.progress)}`}
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{plan.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                    <span>Care Plan Tasks</span>
                  </h4>
                  
                  <div className="space-y-2">
                    {plan.tasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-3">
                        <button
                          onClick={() => handleToggleTask(plan.id, task.id)}
                          className="flex-shrink-0"
                        >
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-teal-500 hover:text-teal-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                        <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {task.task}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {plan.tasks.filter(task => task.completed).length} of {plan.tasks.length} tasks completed
                    </span>
                    <button 
                      onClick={() => handleEditCarePlan(plan)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Update Plan</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCarePlans.length === 0 && (
            <div className="text-center py-12">
              <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No care plans found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Care Plan Modal */}
      {showCarePlanForm && selectedPatient && (
        <CarePlanForm
          patient={selectedPatient}
          existingPlan={selectedCarePlan}
          onSubmit={handleCarePlanSubmit}
          onCancel={handleCancelCarePlan}
        />
      )}
    </div>
  );
};

export default CarePlans;
