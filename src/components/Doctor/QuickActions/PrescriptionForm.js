import { useState, useRef, useEffect } from "react";
import { Save, Plus, Trash2, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Common/Button";
import { useToast } from "../../Common/Toast";
import axios from "axios";

// Interactive Medication Input Component
const MedicationInput = ({
  medication,
  index,
  onChange,
  onRemove,
  canRemove,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchMedications = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.fda.gov/drug/ndc.json?search=brand_name:${encodeURIComponent(
          query
        )}*&limit=10`
      );

      const drugs =
        response.data.results?.map((drug) => ({
          brandName: drug.brand_name,
          genericName: drug.generic_name,
          dosageForm: drug.dosage_form,
          strength: drug.active_ingredients?.[0]?.strength || "",
          route: drug.route?.[0] || "",
          labeler: drug.labeler_name,
        })) || [];

      // Remove duplicates based on brand name
      const uniqueDrugs = drugs.filter(
        (drug, index, self) =>
          index === self.findIndex((d) => d.brandName === drug.brandName)
      );

      console.log(uniqueDrugs);
      setSuggestions(uniqueDrugs);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching medications:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (value) => {
    onChange(index, "name", value);

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for API call
    const newTimeout = setTimeout(() => {
      searchMedications(value);
    }, 300); // Debounce for 300ms

    setSearchTimeout(newTimeout);
  };

  const selectMedication = (drug) => {
    onChange(index, "name", drug.brandName);

    // Auto-fill dosage if strength is available
    if (drug.strength) {
      const dosageText = `${drug.strength}${
        drug.dosageForm ? ` (${drug.dosageForm})` : ""
      }`;
      onChange(index, "dosage", dosageText);
    }

    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="flex justify-between mb-2">
        <h4 className="font-medium">Medication {index + 1}</h4>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            role="danger"
            size="xs"
            icon={Trash2}
            onClick={() => onRemove(index)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Medicine Name with Autocomplete */}
        <div className="relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              required
              placeholder="Type medicine name..."
              className="w-full p-3 border rounded-lg pr-10"
              value={medication.name}
              onChange={(e) => handleNameChange(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionRef}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((drug, idx) => (
                <div
                  key={idx}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => selectMedication(drug)}
                >
                  <div className="font-medium text-gray-900">
                    {drug.brandName}
                  </div>
                  {drug.genericName && (
                    <div className="text-sm text-gray-600">
                      Generic: {drug.genericName}
                    </div>
                  )}
                  {drug.strength && (
                    <div className="text-sm text-blue-600">
                      Strength: {drug.strength}
                      {drug.dosageForm && ` | Form: ${drug.dosageForm}`}
                    </div>
                  )}
                  {drug.labeler && (
                    <div className="text-xs text-gray-500">
                      Manufacturer: {drug.labeler}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          required
          placeholder="Dosage"
          className="p-3 border rounded-lg"
          value={medication.dosage}
          onChange={(e) => onChange(index, "dosage", e.target.value)}
        />

        <select
          required
          className="p-3 border rounded-lg"
          value={medication.frequency}
          onChange={(e) => onChange(index, "frequency", e.target.value)}
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
          placeholder="Duration (e.g., 7 days)"
          className="p-3 border rounded-lg"
          value={medication.duration}
          onChange={(e) => onChange(index, "duration", e.target.value)}
        />
      </div>
    </div>
  );
};

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MedicationInput
                medication={med}
                index={index}
                onChange={handleInputChange}
                onRemove={removeMedication}
                canRemove={medications.length > 1}
              />
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
