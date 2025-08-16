// src/components/Lab/CreateTemplateForm.js
import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

const CreateTemplateForm = ({
  onSubmit,
  initialData = null,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    templateName: "",
    testType: "",
    category: "",
    description: "",
    fields: [
      {
        name: "",
        type: "text",
        required: true,
        unit: "",
        normalRange: "",
        options: [],
      },
    ],
    instructions: "",
  });

  // Initialize form data when editing
  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        templateName: initialData.templateName || "",
        testType: initialData.testType || "",
        category: initialData.category || "",
        description: initialData.description || "",
        fields:
          initialData.fields && initialData.fields.length > 0
            ? initialData.fields.map((field) => ({
                name: field.name || "",
                type:
                  field.type === "decimal"
                    ? "number"
                    : field.type === "string"
                    ? "text"
                    : field.type === "boolean"
                    ? "checkbox"
                    : field.type || "text",
                required: field.required !== undefined ? field.required : true,
                unit: field.unit || "",
                normalRange: field.normalRange || "",
                options: field.options || [],
              }))
            : [
                {
                  name: "",
                  type: "text",
                  required: true,
                  unit: "",
                  normalRange: "",
                  options: [],
                },
              ],
        instructions: initialData.instructions || "",
      });
    }
  }, [initialData, isEditing]);

  const testCategories = [
    "Blood Tests",
    "Urine Tests",
    "Imaging",
    "Cultures",
    "Cardiac Tests",
    "Hormone Tests",
    "Metabolic Tests",
    "Immunology",
  ];

  const fieldTypes = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "dropdown", label: "Dropdown" },
    { value: "checkbox", label: "Checkbox" },
    { value: "date", label: "Date" },
    { value: "textarea", label: "Text Area" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addField = () => {
    setFormData((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          name: "",
          type: "text",
          required: true,
          unit: "",
          normalRange: "",
          options: [],
        },
      ],
    }));
  };

  const removeField = (index) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
    }));
  };

  const updateField = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((f, i) =>
        i === index ? { ...f, [field]: value } : f
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.templateName || !formData.testType || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    // Create template object with additional metadata
    const templateData = {
      ...formData,
      name: formData.templateName,
      estimatedTime: calculateEstimatedTime(formData.fields.length),
    };

    onSubmit(templateData);
  };

  const calculateEstimatedTime = (fieldCount) => {
    // Simple estimation: 1 minute per field + 5 minutes base time
    const minutes = Math.max(5, fieldCount + 5);
    return `${minutes} min`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-96 overflow-y-auto"
    >
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
            <option key={index} value={category}>
              {category}
            </option>
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
          <label className="text-sm font-medium text-gray-700">
            Report Fields
          </label>
          <button
            type="button"
            onClick={addField}
            className="flex items-center space-x-1 px-3 py-1.5 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Field</span>
          </button>
        </div>
        <div className="space-y-3">
          {formData.fields.map((field, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Field Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., TSH, Hemoglobin"
                    value={field.name}
                    onChange={(e) => updateField(index, "name", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, "type", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    {fieldTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., mg/dL, mIU/L"
                    value={field.unit}
                    onChange={(e) => updateField(index, "unit", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Normal Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 0.4-4.0, <200"
                    value={field.normalRange}
                    onChange={(e) =>
                      updateField(index, "normalRange", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(index, "required", e.target.checked)
                      }
                      className="mr-2"
                    />
                    Required
                  </label>
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
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
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-md hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
        >
          {isEditing ? "Update Template" : "Create Template"}
        </button>
      </div>
    </form>
  );
};

export default CreateTemplateForm;
