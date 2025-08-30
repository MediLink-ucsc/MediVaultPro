// src/components/Lab/ViewTemplateModal.js
import React from "react";
import {
  FileText,
  Calendar,
  User,
  Eye,
  Edit3,
  Copy,
  Archive,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import Button from "../Common/Button";

const ViewTemplateModal = ({
  template,
  onClose,
  onEdit,
  onDuplicate,
  onToggleActive,
  onDelete,
}) => {
  if (!template) return null;

  const formatFieldType = (type) => {
    switch (type) {
      case "number":
      case "decimal":
        return "Number";
      case "text":
        return "Text";
      case "boolean":
        return "Yes/No";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getFieldIcon = (field) => {
    if (field.required) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{template.name}</h2>
                <div className="flex items-center space-x-4 mt-2 text-teal-100">
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                    {template.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        template.isActive ? "bg-green-300" : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">
                      {template.isActive ? "Active" : "Inactive"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Template Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <FileText className="w-4 h-4" />
                <span>Fields</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {template.fields}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                <span>Est. Time</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {template.estimatedTime}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <User className="w-4 h-4" />
                <span>Created By</span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {template.createdBy}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <Eye className="w-4 h-4" />
                <span>Usage</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {template.usageCount}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-600 bg-gray-50 rounded-lg p-4">
              {template.description}
            </p>
          </div>

          {/* Report Fields */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Report Fields
            </h3>
            <div className="space-y-3">
              {template.reportFields && template.reportFields.length > 0 ? (
                template.reportFields.map((field, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getFieldIcon(field)}
                          <h4 className="font-semibold text-gray-900">
                            {field.name}
                          </h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {formatFieldType(field.type)}
                          </span>
                          {field.required && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                              Required
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          {field.unit && (
                            <div>
                              <span className="font-medium">Unit:</span>{" "}
                              {field.unit}
                            </div>
                          )}
                          {field.normalRange && (
                            <div>
                              <span className="font-medium">Normal Range:</span>{" "}
                              {field.normalRange}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No report fields configured</p>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Metadata
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-medium text-gray-900">Template ID:</span>
                <span className="ml-2 text-gray-600">{template.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Value:</span>
                <span className="ml-2 text-gray-600 font-mono">
                  {template.value}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Created:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(template.createdDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900">
                  Last Modified:
                </span>
                <span className="ml-2 text-gray-600">
                  {new Date(template.lastModified).toLocaleDateString()}
                </span>
              </div>
              {template.parserClass && (
                <div>
                  <span className="font-medium text-gray-900">
                    Parser Class:
                  </span>
                  <span className="ml-2 text-gray-600 font-mono">
                    {template.parserClass}
                  </span>
                </div>
              )}
              {template.parserModule && (
                <div>
                  <span className="font-medium text-gray-900">
                    Parser Module:
                  </span>
                  <span className="ml-2 text-gray-600 font-mono">
                    {template.parserModule}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => onEdit(template)}
              variant="primary"
              role="lab"
              size="sm"
              icon={Edit3}
            >
              Edit Template
            </Button>
            <Button
              onClick={() => onDuplicate(template)}
              variant="ghost"
              role="neutral"
              size="sm"
              icon={Copy}
            >
              Duplicate
            </Button>
            <Button
              onClick={() => onToggleActive(template.id)}
              variant="ghost"
              role="neutral"
              size="sm"
              icon={Archive}
            >
              {template.isActive ? "Deactivate" : "Activate"}
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => onDelete(template.id)}
              variant="ghost"
              role="danger"
              size="sm"
              icon={Trash2}
            >
              Delete
            </Button>
            <Button onClick={onClose} variant="ghost" role="neutral" size="sm">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTemplateModal;
