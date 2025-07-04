// src/components/Lab/CreateTemplateForm.js
import React, { useState } from 'react';
import { Plus, Minus, FileText } from 'lucide-react';

const CreateTemplateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    templateName: '',
    testType: '',
    category: '',
    description: '',
    fields: [
      { name: '', type: 'text', required: true, options: [] }
    ],
    referenceRanges: [
      { parameter: '', normalRange: '', unit: '' }
    ],
    instructions: '',
  });

  const testCategories = [
    'Blood Tests',
    'Urine Tests',
    'Imaging',
    'Cultures',
    'Cardiac Tests',
    'Hormone Tests',
    'Metabolic Tests',
    'Immunology',
  ];

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date' },
    { value: 'textarea', label: 'Text Area' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addField = () => {
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, { name: '', type: 'text', required: true, options: [] }]
    }));
  };

  const removeField = (index) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  const updateField = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => 
        i === index ? { ...f, [field]: value } : f
      )
    }));
  };

  const addReferenceRange = () => {
    setFormData(prev => ({
      ...prev,
      referenceRanges: [...prev.referenceRanges, { parameter: '', normalRange: '', unit: '' }]
    }));
  };

  const removeReferenceRange = (index) => {
    setFormData(prev => ({
      ...prev,
      referenceRanges: prev.referenceRanges.filter((_, i) => i !== index)
    }));
  };

  const updateReferenceRange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      referenceRanges: prev.referenceRanges.map((r, i) => 
        i === index ? { ...r, [field]: value } : r
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Template Name
          </label>
          <input
            type="text"
            name="templateName"
            value={formData.templateName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter template name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Type
          </label>
          <input
            type="text"
            name="testType"
            value={formData.testType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="e.g., Complete Blood Count"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        >
          <option value="">Select category</option>
          {testCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Brief description of the test..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700">Report Fields</label>
          <button
            type="button"
            onClick={addField}
            className="flex items-center space-x-1 px-2 py-1 text-teal-600 hover:text-teal-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Field</span>
          </button>
        </div>
        <div className="space-y-3">
          {formData.fields.map((field, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) => updateField(index, 'name', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <select
                  value={field.type}
                  onChange={(e) => updateField(index, 'type', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  {fieldTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(index, 'required', e.target.checked)}
                      className="mr-1"
                    />
                    Required
                  </label>
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700">Reference Ranges</label>
          <button
            type="button"
            onClick={addReferenceRange}
            className="flex items-center space-x-1 px-2 py-1 text-teal-600 hover:text-teal-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Range</span>
          </button>
        </div>
        <div className="space-y-3">
          {formData.referenceRanges.map((range, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Parameter name"
                  value={range.parameter}
                  onChange={(e) => updateReferenceRange(index, 'parameter', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Normal range"
                  value={range.normalRange}
                  onChange={(e) => updateReferenceRange(index, 'normalRange', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={range.unit}
                  onChange={(e) => updateReferenceRange(index, 'unit', e.target.value)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => removeReferenceRange(index)}
                  className="p-1 text-red-500 hover:text-red-700 justify-self-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Instructions for Lab Technicians
        </label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Special instructions for conducting this test..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => onSubmit(null)}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Create Template
        </button>
      </div>
    </form>
  );
};

export default CreateTemplateForm;