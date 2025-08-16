import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../Common/Button';
import axios from 'axios';

const LabOrderForm = ({ onSubmit, selectedPatient }) => {
  const [tests, setTests] = useState([{ name: '', urgency: '', specialInstructions: '' }]);
  const [clinicalInformation, setClinicalInformation] = useState('');
  const [patientId, setPatientId] = useState(selectedPatient?.id || '');
  const [username, setUsername] = useState('');
  const [fetchedPatient, setFetchedPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, field, value) => {
    const newTests = [...tests];
    newTests[index][field] = value;
    setTests(newTests);
  };

  const addTest = () => setTests([...tests, { name: '', urgency: '', specialInstructions: '' }]);
  const removeTest = (index) => setTests(tests.filter((_, i) => i !== index));

  const fetchPatientByUsername = async () => {
    if (!username) return alert('Enter username/contact number');

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/auth/medvaultpro/doctor/patient/${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFetchedPatient(data);
      setPatientId(data.patientId.toString());
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Patient not found');
      setFetchedPatient(null);
      setPatientId('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId) return alert('Fetch a valid patient first');

    const payload = {
      patientId: Number(patientId),
      clinicalInformation,
      tests,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/patientRecords/laborders/insert',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Lab order created: ' + data.labOrderId);
      if (onSubmit) onSubmit(e);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to send lab order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6" initial="hidden" animate="visible">
      
      {/* Username & Fetch */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient Username / Contact *</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter username or contact"
            className="flex-1 p-3 border rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!!selectedPatient}
          />
          <Button type="button" onClick={fetchPatientByUsername} size="sm" disabled={loading}>
            {loading ? 'Loading...' : 'Get ID'}
          </Button>
        </div>
      </div>

      {/* Patient ID */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID *</label>
        <input
          type="text"
          className="w-full p-3.5 border border-gray-200 rounded-xl"
          value={patientId}
          readOnly
          placeholder="Fetch patient first"
          required
        />
        {fetchedPatient && (
          <p className="mt-2 text-green-600">
            Patient: {fetchedPatient.user.firstName} {fetchedPatient.user.lastName} ({fetchedPatient.user.username})
          </p>
        )}
      </div>

      {/* Tests Section */}
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
        <Button type="submit" variant="primary" size="lg" icon={Save} fullWidth disabled={loading}>
          {loading ? 'Saving...' : 'Create Lab Order'}
        </Button>
      </div>
    </motion.form>
  );
};

export default LabOrderForm;

