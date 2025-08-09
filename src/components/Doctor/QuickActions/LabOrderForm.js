import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../Common/Button';

const LabOrderForm = ({ onSubmit, selectedPatient }) => {
  const [tests, setTests] = useState([{ name: '', urgency: '', specialInstructions: '' }]);
  const [clinicalInformation, setClinicalInformation] = useState('');
  const [patientId, setPatientId] = useState(selectedPatient?.id || '');

  const handleInputChange = (index, field, value) => {
    const newTests = [...tests];
    newTests[index][field] = value;
    setTests(newTests);
  };

  const addTest = () => {
    setTests([...tests, { name: '', urgency: '', specialInstructions: '' }]);
  };

  const removeTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      patientId: Number(patientId),
      clinicalInformation,
      tests
    };

    try {
      const token = localStorage.getItem('token'); // adjust based on your auth setup

      const response = await fetch('http://localhost:3000/api/v1/patientRecords/laborders/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ✅ include token
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Lab order created: ' + data.labOrderId);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send lab order');
    }
  };

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6" initial="hidden" animate="visible">
      {/* Patient Dropdown */}
      <div>
        <label className="block text-sm font-medium mb-2">Patient *</label>
        <select
          required
          name="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          disabled={!!selectedPatient}
          className="w-full p-3.5 border rounded-xl"
        >
          {selectedPatient ? (
            <option value={selectedPatient.id}>
              {selectedPatient.firstName} {selectedPatient.lastName} - ID: {selectedPatient.id}
            </option>
          ) : (
            <>
              <option value="">Select patient</option>
              <option value="102">Patient 102</option>
              <option value="103">Patient 103</option>
            </>
          )}
        </select>
      </div>

      

      {/* Tests */}
      <div>
        <div className="flex justify-between mb-4">
          <label className="text-sm font-medium">Tests *</label>
          <Button type="button" onClick={addTest} icon={Plus} size="sm">Add Test</Button>
        </div>

        <AnimatePresence>
          {tests.map((test, index) => (
            <motion.div key={index} className="border p-4 mb-4 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between">
                <h4 className="font-medium">Test {index + 1}</h4>
                {tests.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    role="danger"
                    size="xs"
                    icon={Trash2}
                    onClick={() => removeTest(index)}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  required
                  placeholder="Test Name"
                  className="p-3 border rounded-lg"
                  value={test.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
                <select
                  className="p-3 border rounded-lg"
                  value={test.urgency}
                  onChange={(e) => handleInputChange(index, 'urgency', e.target.value)}
                >
                  <option value="">Select urgency</option>
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                </select>
                <input
                  type="text"
                  placeholder="Special Instructions"
                  className="p-3 border rounded-lg"
                  value={test.specialInstructions}
                  onChange={(e) => handleInputChange(index, 'specialInstructions', e.target.value)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Clinical Information */}
      <div>
        <label className="block text-sm font-medium mb-2">Clinical Information *</label>
        <textarea
          rows="3"
          required
          className="w-full p-3.5 border rounded-xl"
          value={clinicalInformation}
          onChange={(e) => setClinicalInformation(e.target.value)}
          placeholder="Enter clinical details..."
        />
      </div>

      {/* Submit */}
      <div className="pt-6 border-t">
        <Button type="submit" variant="primary" size="lg" icon={Save} fullWidth>
          Create Lab Order
        </Button>
      </div>
    </motion.form>
  );
};

export default LabOrderForm;
