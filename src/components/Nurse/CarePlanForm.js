// src/components/Nurse/CarePlanForm.js
import React, { useState } from 'react';
import { Save, X, Plus, Trash2, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../Common/Button';
import dataStore from '../../utils/dataStore';
// Backend integration removed

const CarePlanForm = ({ patient, onSubmit, onCancel, existingPlan = null }) => {
  const [formData, setFormData] = useState({
    planType: existingPlan?.planType || '',
    startDate: existingPlan?.startDate || new Date().toISOString().split('T')[0],
    endDate: existingPlan?.endDate || '',
    priority: existingPlan?.priority || 'Medium',
    description: existingPlan?.description || '',
    goals: existingPlan?.goals || '',
    tasks: existingPlan?.tasks || [
      { id: Date.now(), task: '', dueDate: '', priority: 'Medium' }
    ]
  });

  const [errors, setErrors] = useState({});

  const planTypes = [
    'Post-Surgical Care',
    'Diabetes Management',
    'Hypertension Care',
    'Medication Management',
    'Wound Care',
    'Mobility Assistance',
    'Pain Management',
    'Nutritional Support',
    'Respiratory Care',
    'Mental Health Support'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...formData.tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      tasks: newTasks
    }));
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, {
        id: Date.now(),
        task: '',
        dueDate: '',
        priority: 'Medium'
      }]
    }));
  };

  const removeTask = (index) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.planType) newErrors.planType = 'Plan type is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    // Validate date range
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    // Validate tasks
    const invalidTasks = formData.tasks.some(task => !task.task.trim());
    if (invalidTasks) {
      newErrors.tasks = 'All tasks must have descriptions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Backend integration removed, just call onSubmit with formData
    if (onSubmit) onSubmit(formData);
    alert('Care plan saved successfully!');
  };


  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {existingPlan ? 'Edit Care Plan' : 'Create Care Plan'}
              </h2>
              <p className="text-sm text-gray-600">
                Patient: {patient.firstName} {patient.lastName} (ID: {patient.id})
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <motion.div className="space-y-6" variants={containerVariants}>
            {/* Basic Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Type *
                  </label>
                  <select
                    name="planType"
                    value={formData.planType}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.planType ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select plan type</option>
                    {planTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.planType && (
                    <p className="text-red-500 text-sm mt-1">{errors.planType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.startDate ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.endDate ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Description and Goals */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.description ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Describe the care plan details..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goals
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Specify care goals and expected outcomes..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Tasks */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Care Tasks</h3>
                <Button
                  type="button"
                  variant="secondary"
                  role="nurse"
                  size="sm"
                  icon={Plus}
                  onClick={addTask}
                >
                  Add Task
                </Button>
              </div>

              <div className="space-y-4">
                {formData.tasks.map((task, index) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Task Description *
                        </label>
                        <input
                          type="text"
                          value={task.task}
                          onChange={(e) => handleTaskChange(index, 'task', e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter task description"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Due Date
                        </label>
                        <input
                          type="date"
                          value={task.dueDate}
                          onChange={(e) => handleTaskChange(index, 'dueDate', e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <select
                          value={task.priority}
                          onChange={(e) => handleTaskChange(index, 'priority', e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        >
                          {priorities.map(priority => (
                            <option key={priority} value={priority}>{priority}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-1">
                        <button
                          type="button"
                          onClick={() => removeTask(index)}
                          className="w-full p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          disabled={formData.tasks.length === 1}
                        >
                          <Trash2 className="w-5 h-5 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {errors.tasks && (
                <p className="text-red-500 text-sm mt-2">{errors.tasks}</p>
              )}
            </motion.div>

            {/* Form Actions */}
            <motion.div 
              className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200"
              variants={itemVariants}
            >
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                role="nurse"
                icon={Save}
                className="shadow-lg hover:shadow-orange-200"
              >
                {existingPlan ? 'Update Care Plan' : 'Create Care Plan'}
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default CarePlanForm;
