// src/components/Lab/CreateTemplateForm.js
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const CreateTemplateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    value: "",
    label: "",
    category: "",
    reportFields: [
      { name: "", type: "decimal", required: true, unit: "", normalRange: "" },
    ],
  });

  const testCategories = [
    "Biochemistry",
    "Hematology",
    "Microbiology",
    "Immunology",
    "Pathology",
    "Radiology",
    "Cardiology",
    "Endocrinology",
  ];

  const fieldTypes = [
    { value: "decimal", label: "Decimal Number" },
    { value: "number", label: "Number" },
    { value: "text", label: "Text" },
    { value: "boolean", label: "Yes/No" },
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
      reportFields: [
        ...prev.reportFields,
        {
          name: "",
          type: "decimal",
          required: true,
          unit: "",
          normalRange: "",
        },
      ],
    }));
  };

  const removeField = (index) => {
    if (formData.reportFields.length > 1) {
      setFormData((prev) => ({
        ...prev,
        reportFields: prev.reportFields.filter((_, i) => i !== index),
      }));
    }
  };

  const updateField = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      reportFields: prev.reportFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Generate value from label
  const generateValue = (label) => {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_");
  };

  const handleLabelChange = (e) => {
    const label = e.target.value;
    setFormData((prev) => ({
      ...prev,
      label: label,
      value: generateValue(label),
    }));
  };

  // Create reference ranges from report fields
  const createReferenceRanges = (reportFields) => {
    const referenceRanges = {};

    reportFields.forEach((field) => {
      if (field.normalRange && field.unit) {
        const range = { unit: field.unit, normalRange: field.normalRange };

        // Try to parse min/max from normalRange
        if (field.normalRange.includes("-")) {
          const [min, max] = field.normalRange
            .split("-")
            .map((v) => parseFloat(v.trim()));
          if (!isNaN(min)) range.min = min;
          if (!isNaN(max)) range.max = max;
        } else if (field.normalRange.startsWith(">")) {
          const min = parseFloat(field.normalRange.substring(1));
          if (!isNaN(min)) range.min = min;
        } else if (field.normalRange.startsWith("<")) {
          const max = parseFloat(field.normalRange.substring(1));
          if (!isNaN(max)) range.max = max;
        }

        referenceRanges[field.name] = range;
      }
    });

    return referenceRanges;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.label.trim() ||
      !formData.category ||
      formData.reportFields.length === 0
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate that all report fields have required data
    const invalidFields = formData.reportFields.filter(
      (field) =>
        !field.name.trim() || !field.unit.trim() || !field.normalRange.trim()
    );

    if (invalidFields.length > 0) {
      alert("Please fill in all field details (name, unit, and normal range)");
      return;
    }

    // Create the API payload
    const apiPayload = {
      value: formData.value || generateValue(formData.label),
      label: formData.label,
      category: formData.category,
      parserClass: "LabReportParser",
      parserModule: "parser_lab_report",
      reportFields: formData.reportFields,
      referenceRanges: createReferenceRanges(formData.reportFields),
    };

    onSubmit(apiPayload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-96 overflow-y-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Template Name *
          </label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleLabelChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="e.g., Complete Blood Count"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Value
          </label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
            placeholder="Auto-generated from name"
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">
            Auto-generated from template name
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
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
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700">
            Report Fields *
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
          {formData.reportFields.map((field, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Field Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Hemoglobin"
                    value={field.name}
                    onChange={(e) => updateField(index, "name", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Field Type
                  </label>
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, "type", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    {fieldTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., g/dL"
                    value={field.unit}
                    onChange={(e) => updateField(index, "unit", e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Normal Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 13.5-17.5 or >40"
                    value={field.normalRange}
                    onChange={(e) =>
                      updateField(index, "normalRange", e.target.value)
                    }
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(index, "required", e.target.checked)
                    }
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  Required field
                </label>
                {formData.reportFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
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
          Create Template
        </button>
      </div>
    </form>
  );
};

export default CreateTemplateForm;
