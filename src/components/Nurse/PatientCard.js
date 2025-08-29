import React from 'react';
import { User, Phone } from 'lucide-react';
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';

const PatientCard = ({ patient, latestVitals, activeCarePlans, onRecordVitals, onCreateCarePlan, onViewMedicalHistory, onViewPatientDetails, getConditionColor }) => {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-gray-600">{patient.age} years • {patient.gender}</p>
          <p className="text-xs text-gray-500">ID: {patient.id}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(patient.condition)}`}>
        {patient.condition}
      </span>
    </div>
    <div className="space-y-2 mb-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Phone className="w-4 h-4" />
        <span>{patient.phone}</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="text-xs text-gray-500">Last Vitals</div>
        <div className="text-sm font-medium text-gray-800">
          {latestVitals ? new Date(latestVitals.recordedAt).toLocaleDateString() : 'None'}
        </div>
      </div>
      <div className="text-center border-l border-gray-200">
        <div className="text-xs text-gray-500">Care Plans</div>
        <div className="text-sm font-medium text-orange-600">{activeCarePlans}</div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-3">
      <Button
        variant="primary"
        role="nurse"
        size="sm"
        icon="Activity"
        onClick={() => onRecordVitals(patient)}
        fullWidth
      >
        Record Vitals
      </Button>
      <Button
        variant="outline"
        role="nurse"
        size="sm"
        icon="ClipboardList"
        onClick={() => onCreateCarePlan(patient)}
        fullWidth
      >
        Care Plan
      </Button>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        role="nurse"
        size="sm"
        icon="FileText"
        onClick={() => navigate(`/nurse/patients/history/${patient.id}`)}
        fullWidth
      >
        History
      </Button>
      <Button
        variant="secondary"
        role="nurse"
        size="sm"
        icon="Eye"
        onClick={() => onViewPatientDetails(patient)}
        fullWidth
      >
        Details
      </Button>
    </div>
  </div>

  );
};

export default PatientCard;
