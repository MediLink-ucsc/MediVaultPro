// src/utils/dataStore.js
// Simple localStorage-based data store for small clinic operations
// In a production environment, this would be replaced with a proper database API

class DataStore {
  constructor() {
    this.storageKey = 'medivault_clinic_data';
    this.initializeData();
  }

  // Initialize default data structure if not exists
  initializeData() {
    const existingData = this.getData();
    if (!existingData) {
      const initialData = {
        patients: [
          {
            id: 'P001',
            firstName: 'Likitha',
            lastName: 'Chathubhashini',
            age: 34,
            gender: 'Female',
            phone: '+94 77 123 4567',
            email: 'likitha@email.com',
            address: 'No. 123, Main Street, Colombo 03',
            emergencyContact: '+94 77 987 6543',
            condition: 'Stable',
            assignedNurse: 'Nurse Silva',
            assignedDoctor: 'Dr. Fernando',
            registrationDate: '2024-06-01',
            lastVisit: '2024-06-28'
          },
          {
            id: 'P002',
            firstName: 'Hansaja',
            lastName: 'Damsara',
            age: 45,
            gender: 'Male',
            phone: '+94 77 456 7890',
            email: 'hansaja@email.com',
            address: 'No. 456, Galle Road, Colombo 04',
            emergencyContact: '+94 77 234 5678',
            condition: 'Recovering',
            assignedNurse: 'Nurse Silva',
            assignedDoctor: 'Dr. Perera',
            registrationDate: '2024-05-15',
            lastVisit: '2024-06-25'
          }
        ],
        vitalSigns: [
          {
            id: 'V001',
            patientId: 'P001',
            date: '2024-06-28',
            time: '10:30 AM',
            temperature: '98.6°F',
            heartRate: '72 bpm',
            bloodPressure: '120/80',
            respiratoryRate: '16/min',
            oxygenSaturation: '98%',
            weight: '65 kg',
            height: '165 cm',
            notes: 'Patient stable, all vitals normal',
            recordedBy: 'Nurse Silva'
          }
        ],
        carePlans: [
          {
            id: 'CP001',
            patientId: 'P001',
            planType: 'Post-Surgical Care',
            startDate: '2024-06-28',
            endDate: '2024-07-05',
            priority: 'High',
            status: 'Active',
            progress: 75,
            createdBy: 'Nurse Silva',
            tasks: [
              {
                id: 'T001',
                task: 'Monitor vital signs every 2 hours',
                completed: true,
                completedDate: '2024-06-28',
                completedBy: 'Nurse Silva'
              },
              {
                id: 'T002',
                task: 'Administer pain medication as needed',
                completed: true,
                completedDate: '2024-06-28',
                completedBy: 'Nurse Silva'
              },
              {
                id: 'T003',
                task: 'Encourage deep breathing exercises',
                completed: false,
                dueDate: '2024-06-29'
              }
            ]
          }
        ],
        medications: [
          {
            id: 'M001',
            patientId: 'P001',
            medicationName: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            route: 'Oral',
            startDate: '2024-06-01',
            endDate: '2024-07-01',
            prescribedBy: 'Dr. Fernando',
            administeredBy: [],
            instructions: 'Take with food',
            status: 'Active'
          }
        ],
        medicalHistory: [
          {
            id: 'MH001',
            patientId: 'P001',
            date: '2024-06-28',
            type: 'Visit',
            diagnosis: 'Hypertension Follow-up',
            treatment: 'Blood pressure monitoring. Medication adjustment.',
            doctor: 'Dr. Fernando',
            notes: 'Patient responding well to treatment'
          }
        ],
        labResults: [
          {
            id: 'LR001',
            patientId: 'P001',
            testType: 'Complete Blood Count',
            orderDate: '2024-06-25',
            resultDate: '2024-06-26',
            status: 'Completed',
            results: {
              hemoglobin: '13.5 g/dL',
              wbc: '7,200/μL',
              platelets: '250,000/μL'
            },
            orderedBy: 'Dr. Fernando',
            technician: 'Lab Tech Johnson'
          }
        ]
      };
      this.saveData(initialData);
    }
  }

  // Get all data
  getData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
      return null;
    }
  }

  // Save all data
  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      return false;
    }
  }

  // Patient methods
  getPatients() {
    const data = this.getData();
    return data?.patients || [];
  }

  getPatientById(patientId) {
    const patients = this.getPatients();
    return patients.find(patient => patient.id === patientId);
  }

  addPatient(patientData) {
    const data = this.getData();
    const newPatient = {
      ...patientData,
      id: this.generatePatientId(),
      registrationDate: new Date().toISOString().split('T')[0]
    };
    data.patients.push(newPatient);
    this.saveData(data);
    return newPatient;
  }

  updatePatient(patientId, updates) {
    const data = this.getData();
    const patientIndex = data.patients.findIndex(p => p.id === patientId);
    if (patientIndex !== -1) {
      data.patients[patientIndex] = { ...data.patients[patientIndex], ...updates };
      this.saveData(data);
      return data.patients[patientIndex];
    }
    return null;
  }

  // Vital Signs methods
  getVitalSigns(patientId = null) {
    const data = this.getData();
    const vitals = data?.vitalSigns || [];
    return patientId ? vitals.filter(v => v.patientId === patientId) : vitals;
  }

  addVitalSigns(vitalData) {
    const data = this.getData();
    const newVital = {
      ...vitalData,
      id: this.generateId('V'),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
    data.vitalSigns.push(newVital);
    this.saveData(data);
    return newVital;
  }

  // Care Plans methods
  getCarePlans(patientId = null) {
    const data = this.getData();
    const carePlans = data?.carePlans || [];
    return patientId ? carePlans.filter(cp => cp.patientId === patientId) : carePlans;
  }

  addCarePlan(carePlanData) {
    const data = this.getData();
    const newCarePlan = {
      ...carePlanData,
      id: this.generateId('CP'),
      status: 'Active',
      progress: 0
    };
    data.carePlans.push(newCarePlan);
    this.saveData(data);
    return newCarePlan;
  }

  updateCarePlan(carePlanId, updates) {
    const data = this.getData();
    const planIndex = data.carePlans.findIndex(cp => cp.id === carePlanId);
    if (planIndex !== -1) {
      data.carePlans[planIndex] = { ...data.carePlans[planIndex], ...updates };
      this.saveData(data);
      return data.carePlans[planIndex];
    }
    return null;
  }

  updateCarePlanTask(carePlanId, taskId, taskUpdate) {
    const data = this.getData();
    const plan = data.carePlans.find(cp => cp.id === carePlanId);
    if (plan) {
      const taskIndex = plan.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        plan.tasks[taskIndex] = { ...plan.tasks[taskIndex], ...taskUpdate };
        
        // Update progress based on completed tasks
        const completedTasks = plan.tasks.filter(t => t.completed).length;
        plan.progress = Math.round((completedTasks / plan.tasks.length) * 100);
        
        this.saveData(data);
        return plan;
      }
    }
    return null;
  }

  // Medical History methods
  getMedicalHistory(patientId) {
    const data = this.getData();
    const history = data?.medicalHistory || [];
    return history.filter(h => h.patientId === patientId);
  }

  addMedicalHistory(historyData) {
    const data = this.getData();
    const newHistory = {
      ...historyData,
      id: this.generateId('MH'),
      date: new Date().toISOString().split('T')[0]
    };
    data.medicalHistory.push(newHistory);
    this.saveData(data);
    return newHistory;
  }

  // Medication methods
  getMedications(patientId = null) {
    const data = this.getData();
    const medications = data?.medications || [];
    return patientId ? medications.filter(m => m.patientId === patientId) : medications;
  }

  addMedication(medicationData) {
    const data = this.getData();
    const newMedication = {
      ...medicationData,
      id: this.generateId('M'),
      status: 'Active',
      administeredBy: []
    };
    data.medications.push(newMedication);
    this.saveData(data);
    return newMedication;
  }

  // Utility methods
  generatePatientId() {
    const patients = this.getPatients();
    const maxId = patients.reduce((max, patient) => {
      const num = parseInt(patient.id.substring(1));
      return num > max ? num : max;
    }, 0);
    return `P${String(maxId + 1).padStart(3, '0')}`;
  }

  generateId(prefix) {
    return `${prefix}${Date.now()}`;
  }

  // Get patient summary for doctors
  getPatientSummary(patientId) {
    const patient = this.getPatientById(patientId);
    if (!patient) return null;

    const vitals = this.getVitalSigns(patientId);
    const carePlans = this.getCarePlans(patientId);
    const medications = this.getMedications(patientId);
    const history = this.getMedicalHistory(patientId);

    return {
      patient,
      latestVitals: vitals[vitals.length - 1] || null,
      activeCarePlans: carePlans.filter(cp => cp.status === 'Active'),
      currentMedications: medications.filter(m => m.status === 'Active'),
      recentHistory: history.slice(-5) // Last 5 entries
    };
  }

  // Search patients
  searchPatients(searchTerm) {
    const patients = this.getPatients();
    const term = searchTerm.toLowerCase();
    return patients.filter(patient => 
      patient.firstName.toLowerCase().includes(term) ||
      patient.lastName.toLowerCase().includes(term) ||
      patient.id.toLowerCase().includes(term) ||
      patient.phone.includes(term)
    );
  }
}

// Create and export singleton instance
const dataStore = new DataStore();
export default dataStore;
