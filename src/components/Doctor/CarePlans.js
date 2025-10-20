// src/components/Doctor/CarePlans.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus,
  Calendar,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

const CarePlans = ({ patient }) => {
  const [carePlans, setCarePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = [
    { id: 'all', label: 'All Care Plans', icon: ClipboardList },
    // { id: 'Active', label: 'Active', icon: CheckCircle },
    // { id: 'Completed', label: 'Completed', icon: AlertCircle }
  ];

  useEffect(() => {
    if (!patient?.id) return;

    const fetchCarePlans = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:3000/api/v1/patientRecords/careplans/${patient.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCarePlans(response.data || []);
      } catch (err) {
        console.error('Error fetching care plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarePlans();
  }, [patient]);

  const filteredCarePlans = carePlans.filter(cp => {
    const matchesStatus = filterStatus === 'all' || cp.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      cp.planType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cp.description && cp.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cp.goals && cp.goals.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cp.tasks || []).some(task =>
        task.taskDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderCarePlanCard = (plan) => (
    <div key={plan.id} className="bg-white rounded-lg border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-gray-700">{plan.planType}</h4>
        <span className={`px-2 py-1 rounded-full text-sm ${
          plan.status === 'Active' ? 'bg-teal-100 text-teal-700' :
          plan.status === 'Completed' ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-700'
        }`}>{plan.status || 'N/A'}</span>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        {`Start: ${formatDate(plan.startDate)} • End: ${formatDate(plan.endDate)} • Priority: ${plan.priority}`}
      </div>

      {plan.description && (
        <div className="text-sm text-gray-700 mb-2">
          <strong>Description:</strong> {plan.description}
        </div>
      )}

      {plan.goals && (
        <div className="text-sm text-gray-700 mb-2">
          <strong>Goals:</strong> {plan.goals}
        </div>
      )}

      {(plan.tasks || []).length > 0 && (
        <div className="space-y-2 mt-2">
          <h5 className="font-medium text-gray-700">Tasks:</h5>
          {(plan.tasks || []).map(task => (
            <div key={task.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div>
                <span className="text-gray-800">{task.taskDescription}</span>
                <div className="text-xs text-gray-500">
                  {`Due: ${formatDate(task.dueDate)} • Priority: ${task.priority}`}
                </div>
              </div>
              {task.completed && <CheckCircle className="w-4 h-4 text-teal-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-wrap gap-3 items-center">
        {filterOptions.map(option => (
          <button
            key={option.id}
            onClick={() => setFilterStatus(option.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              filterStatus === option.id ? 'bg-teal-100 text-teal-700 border-teal-200' :
              'bg-gray-50 text-gray-600 hover:bg-gray-100 border'
            }`}
          >
            <option.icon className="w-4 h-4" />
            <span>{option.label}</span>
          </button>
        ))}
        <input
          type="text"
          placeholder="Search care plans..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-auto px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Care Plan List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading care plans...</div>
        ) : filteredCarePlans.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No care plans found.</div>
        ) : (
          filteredCarePlans.map(renderCarePlanCard)
        )}
      </div>
    </div>
  );
};

export default CarePlans;

