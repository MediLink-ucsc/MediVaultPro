import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Common/Button";
import { useToast } from "../../Common/Toast";
import axios from "axios";

const PrescriptionForm = ({ onSubmit, selectedPatient }) => {
  const { showToast, ToastComponent } = useToast();

  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [patientId, setPatientId] = useState(selectedPatient?.patientId || "");
  const [username, setUsername] = useState("");
  const [fetchedPatient, setFetchedPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, field, value) => {
    const newMeds = [...medications];
    newMeds[index][field] = value;
    setMedications(newMeds);
  };

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "" },
    ]);
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const fetchPatientByUsername = async () => {
    if (!username) {
      showToast("Please enter username/contact number", "warning");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:3000/api/v1/auth/medvaultpro/doctor/patient/${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFetchedPatient(data);
      setPatientId(data.patientId.toString());
    } catch (error) {
      console.error(error);
      showToast(
        error.response?.data?.message || "Failed to fetch patient",
        "error"
      );
      setFetchedPatient(null);
      setPatientId("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId) {
      showToast("Please fetch a valid patient first", "warning");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const payload = {
        patientId: patientId.toString(),
        medications: medications.map((med) => ({
          medicineName: med.name,
          dosage: med.dosage,
          frequency: med.frequency,
          duration: med.duration,
        })),
        additionalInstructions,
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/patientRecords/prescriptions/insert",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast(
        `Prescription sent successfully! ID: ${data.prescriptionId}`,
        "success"
      );

      if (onSubmit) onSubmit(e);
    } catch (error) {
      console.error(error);
      showToast(
        error.response?.data?.message || "Failed to send prescription",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial="hidden"
      animate="visible"
    >
      {/* Username & Fetch */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Patient Username / Contact *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter username or contact"
            className="flex-1 p-3 border rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!!selectedPatient}
          />
          <Button
            type="button"
            onClick={fetchPatientByUsername}
            size="sm"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get ID"}
          </Button>
        </div>
      </div>

      {/* Patient ID Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Patient ID *
        </label>
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
            Patient: {fetchedPatient.user.firstName}{" "}
            {fetchedPatient.user.lastName} ({fetchedPatient.user.username})
          </p>
        )}
      </div>

      {/* Medications Section */}
      <div>
        <div className="flex justify-between mb-4">
          <label className="text-sm font-medium">Medications *</label>
          <Button type="button" onClick={addMedication} icon={Plus} size="sm">
            Add Medication
          </Button>
        </div>

        <AnimatePresence>
          {medications.map((med, index) => (
            <motion.div
              key={index}
              className="border p-4 mb-4 rounded-lg shadow-sm bg-white"
            >
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
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  required
                  placeholder="Dosage"
                  className="p-3 border rounded-lg"
                  value={med.dosage}
                  onChange={(e) =>
                    handleInputChange(index, "dosage", e.target.value)
                  }
                />
                <select
                  required
                  className="p-3 border rounded-lg"
                  value={med.frequency}
                  onChange={(e) =>
                    handleInputChange(index, "frequency", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleInputChange(index, "duration", e.target.value)
                  }
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Additional Instructions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Instructions
        </label>
        <textarea
          rows="4"
          className="w-full p-3.5 border border-gray-200 rounded-xl"
          value={additionalInstructions}
          onChange={(e) => setAdditionalInstructions(e.target.value)}
          placeholder="Special instructions for the patient..."
        />
      </div>

      {/* Submit */}
      <div className="pt-6 border-t">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={Save}
          fullWidth
          disabled={loading}
        >
          {loading ? "Saving..." : "Generate Prescription"}
        </Button>
      </div>

      <ToastComponent />
    </motion.form>
  );
};

export default PrescriptionForm;
