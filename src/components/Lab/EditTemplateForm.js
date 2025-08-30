// src/components/Lab/EditTemplateForm.js
import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Info,
  FileText,
} from "lucide-react";
import Button from "../Common/Button";

const EditTemplateForm = ({ template, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    label: "",
    reportFields: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (template) {
      setFormData({
        label: template.name || "",
        reportFields: template.reportFields || [],
      });
    }
  }, [template]);

  const fieldTypes = [
    { value: "number", label: "Number" },
    { value: "decimal", label: "Decimal" },
    { value: "text", label: "Text" },
    { value: "boolean", label: "Yes/No" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.label.trim()) {
      newErrors.label = "Template name is required";
    }

    if (formData.reportFields.length === 0) {
      newErrors.reportFields = "At least one report field is required";
    }

    formData.reportFields.forEach((field, index) => {
      if (!field.name.trim()) {
        newErrors[`field_${index}_name`] = "Field name is required";
      }
      if (!field.type) {
        newErrors[`field_${index}_type`] = "Field type is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...formData.reportFields];
    updatedFields[index] = {
      ...updatedFields[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      reportFields: updatedFields,
    });

    // Clear specific field errors
    const newErrors = { ...errors };
    delete newErrors[`field_${index}_${field}`];
    setErrors(newErrors);
  };

  const addField = () => {
    const newField = {
      name: "",
      type: "number",
      required: true,
      unit: "",
      normalRange: "",
    };
    setFormData({
      ...formData,
      reportFields: [...formData.reportFields, newField],
    });
  };

  const removeField = (index) => {
    const updatedFields = formData.reportFields.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      reportFields: updatedFields,
    });

    // Clear errors for removed field
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`field_${index}_`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const getFieldIcon = (field) => {
    if (field.required) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Edit Template</h2>
              <p className="text-teal-100 mt-1">
                Update the template configuration and report fields
              </p>
            </div>
          </div>
        </div>

        {/* Template Name */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Template Information
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template Name *
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => {
                setFormData({ ...formData, label: e.target.value });
                if (errors.label) {
                  setErrors({ ...errors, label: null });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.label ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter template name..."
            />
            {errors.label && (
              <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.label}</span>
              </p>
            )}
          </div>
        </div>

        {/* Report Fields */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Report Fields
            </h3>
            <Button
              type="button"
              onClick={addField}
              variant="primary"
              role="lab"
              size="sm"
              icon={Plus}
            >
              Add Field
            </Button>
          </div>

          {errors.reportFields && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.reportFields}</span>
              </p>
            </div>
          )}

          <div className="space-y-4">
            {formData.reportFields.map((field, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getFieldIcon(field)}
                    <h4 className="font-medium text-gray-900">
                      Field {index + 1}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Field Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field Name *
                    </label>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) =>
                        handleFieldChange(index, "name", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                        errors[`field_${index}_name`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="e.g., Hemoglobin"
                    />
                    {errors[`field_${index}_name`] && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors[`field_${index}_name`]}
                      </p>
                    )}
                  </div>

                  {/* Field Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field Type *
                    </label>
                    <select
                      value={field.type}
                      onChange={(e) =>
                        handleFieldChange(index, "type", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                        errors[`field_${index}_type`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {fieldTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors[`field_${index}_type`] && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors[`field_${index}_type`]}
                      </p>
                    )}
                  </div>

                  {/* Unit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={field.unit || ""}
                      onChange={(e) =>
                        handleFieldChange(index, "unit", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., mg/dL, g/L"
                    />
                  </div>

                  {/* Normal Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Normal Range
                    </label>
                    <input
                      type="text"
                      value={field.normalRange || ""}
                      onChange={(e) =>
                        handleFieldChange(index, "normalRange", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., 13.5-17.5, >40"
                    />
                  </div>
                </div>

                {/* Required Toggle */}
                <div className="mt-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        handleFieldChange(index, "required", e.target.checked)
                      }
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Required field
                    </span>
                  </label>
                </div>
              </div>
            ))}

            {formData.reportFields.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="mb-4">No report fields added yet</p>
                <Button
                  type="button"
                  onClick={addField}
                  variant="primary"
                  role="lab"
                  size="sm"
                  icon={Plus}
                >
                  Add First Field
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
          <Button
            type="button"
            onClick={onCancel}
            variant="ghost"
            role="neutral"
            size="md"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            role="lab"
            size="md"
            icon={Save}
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTemplateForm;
