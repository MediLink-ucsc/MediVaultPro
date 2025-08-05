import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../Common/Button';

const PrescriptionForm = ({ onSubmit, selectedPatient }) => {
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [patientId, setPatientId] = useState(selectedPatient?.id || '');


  const handleInputChange = (index, field, value) => {
    const newMeds = [...medications];
    newMeds[index][field] = value;
    setMedications(newMeds);
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      patientId,
      medications: medications.map((med) => ({
        medicineName: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration,
      })),
      additionalInstructions,
    };


    try {
      const response = await fetch('http://localhost:3000/api/v1/patientRecords/prescriptions/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Prescription created: ' + data.prescriptionId);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send prescription');
    }
  };

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6" initial="hidden" animate="visible">
      {/* Patient Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
        <select
          required
          name="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          disabled={!!selectedPatient}
          className="w-full p-3.5 border border-gray-200 rounded-xl"
        >
          {selectedPatient ? (
            <option value={selectedPatient.id}>
              {selectedPatient.firstName} {selectedPatient.lastName} - ID: {selectedPatient.id}
            </option>
          ) : (
            <>
              <option value="">Select patient</option>
              <option value="1">Likitha Chathubhashini - ID: 001</option>
              <option value="2">Dulmini Nureka - ID: 002</option>
              <option value="3">Hansaja Damsara - ID: 003</option>
              <option value="4">Sathya Abeysinghe - ID: 004</option>
            </>
          )}
        </select>

      </div>

      {/* Medications */}
      <div>
        <div className="flex justify-between mb-4">
          <label className="text-sm font-medium">Medications *</label>
          <Button type="button" onClick={addMedication} icon={Plus} size="sm">Add Medication</Button>
        </div>

        <AnimatePresence>
          {medications.map((med, index) => (
            <motion.div key={index} className="border p-4 mb-4 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between">
                <h4 className="font-medium">Medication {index + 1}</h4>
                {medications.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    role="danger"
                    size="xs"
                    icon={Trash2}
                    onClick={() => removeMedication(index)}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  required
                  placeholder="Medicine Name"
                  className="p-3 border rounded-lg"
                  value={med.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
                <input
                  type="text"
                  required
                  placeholder="Dosage"
                  className="p-3 border rounded-lg"
                  value={med.dosage}
                  onChange={(e) => handleInputChange(index, 'dosage', e.target.value)}
                />
                <select
                  required
                  className="p-3 border rounded-lg"
                  value={med.frequency}
                  onChange={(e) => handleInputChange(index, 'frequency', e.target.value)}
                >
                  <option value="">Select frequency</option>
                  <option value="once">Once daily</option>
                  <option value="twice">Twice daily</option>
                  <option value="thrice">Three times daily</option>
                  <option value="four">Four times daily</option>
                  <option value="as-needed">As needed</option>
                </select>
                <input
                  type="text"
                  required
                  placeholder="Duration"
                  className="p-3 border rounded-lg"
                  value={med.duration}
                  onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Additional Instructions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Instructions</label>
        <textarea
          rows="4"
          className="w-full p-3.5 border border-gray-200 rounded-xl"
          value={additionalInstructions}
          onChange={(e) => setAdditionalInstructions(e.target.value)}
          placeholder="Special instructions for the patient..."
        />
      </div>

      <div className="pt-6 border-t">
        <Button type="submit" variant="primary" size="lg" icon={Save} fullWidth>
          Generate Prescription
        </Button>
      </div>
    </motion.form>
  );
};

export default PrescriptionForm;
