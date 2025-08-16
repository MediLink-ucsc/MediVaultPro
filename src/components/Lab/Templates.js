// src/components/Lab/Templates.js
import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Copy,
  FileText,
  Calendar,
  User,
  Archive,
  Eye,
  Download,
  Upload,
  Grid,
  List,
  MoreVertical,
  AlertCircle,
  Loader,
} from "lucide-react";
import Modal from "../Common/Modal";
import CreateTemplateForm from "./CreateTemplateForm";
import Button from "../Common/Button";
import ApiService from "../../services/apiService";

const Templates = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [viewingTemplate, setViewingTemplate] = useState(null);

  // Transform API response to template format
  const transformTestTypeToTemplate = (testType) => {
    const reportFields = testType.reportFieldsJson
      ? JSON.parse(testType.reportFieldsJson)
      : [];
    const fieldsCount = reportFields.length;

    return {
      id: testType.id,
      name: testType.label,
      category: testType.category || "General",
      description: `${testType.label} - ${testType.category}`,
      createdDate: testType.createdAt
        ? new Date(testType.createdAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      lastModified: testType.updatedAt
        ? new Date(testType.updatedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      createdBy: "System",
      usageCount: Math.floor(Math.random() * 300), // Random usage count for now
      isActive: true,
      fields: fieldsCount,
      estimatedTime: `${Math.max(5, fieldsCount * 2)} min`,
      value: testType.value,
      parserClass: testType.parserClass,
      parserModule: testType.parserModule,
      reportFields: reportFields,
      referenceRanges: testType.referenceRangesJson
        ? JSON.parse(testType.referenceRangesJson)
        : {},
    };
  };

  // Fetch templates from API
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getTestTypes();

      if (response.success) {
        // Handle both single object and array responses
        const testTypes = Array.isArray(response.data)
          ? response.data
          : [response.data];
        const transformedTemplates = testTypes.map(transformTestTypeToTemplate);
        setTemplates(transformedTemplates);
      } else {
        setError("Failed to fetch templates");
      }
    } catch (err) {
      console.error("Error fetching templates:", err);
      setError(err.message || "Failed to fetch templates");
    } finally {
      setLoading(false);
    }
  };

  // Fetch templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Get unique categories from templates
  const categories = [
    "All",
    ...new Set(templates.map((template) => template.category)),
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      template.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleCreateTemplate = async (templateData) => {
    try {
      // Transform form fields to API reportFields format
      const reportFields = (templateData.fields || []).map((field) => ({
        name: field.name,
        type:
          field.type === "text"
            ? "string"
            : field.type === "number"
            ? "decimal"
            : field.type === "checkbox"
            ? "boolean"
            : field.type,
        required: field.required !== undefined ? field.required : true,
        unit: field.unit || "",
        normalRange: field.normalRange || "",
      }));

      // Generate reference ranges from field data
      const referenceRanges = {};
      (templateData.fields || []).forEach((field) => {
        if (field.name && field.normalRange) {
          const rangeParts = field.normalRange.split("-");
          let min = 0,
            max = 0;

          // Handle different range formats like "0.4-4.0", "<200", ">40", etc.
          if (rangeParts.length === 2) {
            min = parseFloat(rangeParts[0].trim()) || 0;
            max = parseFloat(rangeParts[1].trim()) || 0;
          } else if (field.normalRange.includes("<")) {
            min = 0;
            max = parseFloat(field.normalRange.replace("<", "").trim()) || 0;
          } else if (field.normalRange.includes(">")) {
            min = parseFloat(field.normalRange.replace(">", "").trim()) || 0;
            max = 9999; // Large number for open-ended ranges
          } else {
            // Try to parse single number
            const singleValue = parseFloat(field.normalRange.trim());
            if (!isNaN(singleValue)) {
              min = 0;
              max = singleValue;
            }
          }

          referenceRanges[field.name] = {
            min: !isNaN(min) ? min : 0,
            max: !isNaN(max) ? max : 0,
            unit: field.unit || "",
            normalRange: field.normalRange,
          };
        }
      });

      // Format the request body according to API requirements
      const apiRequestBody = {
        value:
          templateData.value ||
          templateData.templateName?.toLowerCase().replace(/\s+/g, "_") ||
          "new_template",
        label:
          templateData.label ||
          templateData.templateName ||
          templateData.name ||
          "New Template",
        category: templateData.category || "general",
        parserClass: "LabReportParser", // Default value
        parserModule: "parser_lab_report", // Default value
        reportFields: reportFields,
        referenceRanges: referenceRanges,
      };

      console.log("Creating template with data:", apiRequestBody); // Debug log

      await ApiService.createTestType(apiRequestBody);
      setActiveModal(null);
      await fetchTemplates();
    } catch (error) {
      console.error("Error creating template:", error);
      setError("Failed to create template: " + error.message);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      await ApiService.deleteTestType(templateId);
      await fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
      setError("Failed to delete template");
    }
  };

  const handleDuplicateTemplate = async (template) => {
    try {
      const duplicatedTemplate = {
        value: `${template.value}_copy`,
        label: `${template.name} (Copy)`,
        category: template.category,
        parserClass: "LabReportParser", // Default value
        parserModule: "parser_lab_report", // Default value
        reportFields: template.reportFields || [],
        referenceRanges: template.referenceRanges || {},
      };
      await ApiService.createTestType(duplicatedTemplate);
      await fetchTemplates();
    } catch (error) {
      console.error("Error duplicating template:", error);
      setError("Failed to duplicate template");
    }
  };

  const handleToggleActive = async (templateId) => {
    try {
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        const updatedTemplate = {
          value: template.value,
          label: template.name,
          category: template.category,
          parserClass: "LabReportParser", // Default value
          parserModule: "parser_lab_report", // Default value
          reportFields: template.reportFields || [],
          referenceRanges: template.referenceRanges || {},
          isActive: !template.isActive,
        };
        await ApiService.updateTestType(templateId, updatedTemplate);
        await fetchTemplates();
      }
    } catch (error) {
      console.error("Error toggling template status:", error);
      setError("Failed to update template status");
    }
  };

  const handleEditTemplate = (template) => {
    // Transform template data back to form format
    const formData = {
      templateName: template.name,
      category: template.category,
      description:
        template.description || `${template.name} - ${template.category}`,
      fields:
        template.reportFields && template.reportFields.length > 0
          ? template.reportFields.map((field) => ({
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
      instructions: "",
    };

    setEditingTemplate({ ...template, formData });
    setActiveModal("edit");
  };

  const handleViewTemplate = (template) => {
    setViewingTemplate(template);
    setActiveModal("view");
  };

  const handleUpdateTemplate = async (templateData) => {
    try {
      if (!editingTemplate) return;

      // Transform form fields to API reportFields format
      const reportFields = (templateData.fields || []).map((field) => ({
        name: field.name,
        type:
          field.type === "text"
            ? "string"
            : field.type === "number"
            ? "decimal"
            : field.type === "checkbox"
            ? "boolean"
            : field.type,
        required: field.required !== undefined ? field.required : true,
        unit: field.unit || "",
        normalRange: field.normalRange || "",
      }));

      // Generate reference ranges from field data
      const referenceRanges = {};
      (templateData.fields || []).forEach((field) => {
        if (field.name && field.normalRange) {
          const rangeParts = field.normalRange.split("-");
          let min = 0,
            max = 0;

          // Handle different range formats like "0.4-4.0", "<200", ">40", etc.
          if (rangeParts.length === 2) {
            min = parseFloat(rangeParts[0].trim()) || 0;
            max = parseFloat(rangeParts[1].trim()) || 0;
          } else if (field.normalRange.includes("<")) {
            min = 0;
            max = parseFloat(field.normalRange.replace("<", "").trim()) || 0;
          } else if (field.normalRange.includes(">")) {
            min = parseFloat(field.normalRange.replace(">", "").trim()) || 0;
            max = 9999; // Large number for open-ended ranges
          } else {
            // Try to parse single number
            const singleValue = parseFloat(field.normalRange.trim());
            if (!isNaN(singleValue)) {
              min = 0;
              max = singleValue;
            }
          }

          referenceRanges[field.name] = {
            min: !isNaN(min) ? min : 0,
            max: !isNaN(max) ? max : 0,
            unit: field.unit || "",
            normalRange: field.normalRange,
          };
        }
      });

      // Format the request body according to API requirements
      const apiRequestBody = {
        value: editingTemplate.value,
        label: templateData.templateName || editingTemplate.name,
        category: templateData.category || editingTemplate.category,
        parserClass: "LabReportParser", // Default value
        parserModule: "parser_lab_report", // Default value
        reportFields: reportFields,
        referenceRanges: referenceRanges,
      };

      console.log("Updating template with data:", apiRequestBody); // Debug log

      await ApiService.updateTestType(editingTemplate.id, apiRequestBody);
      setActiveModal(null);
      setEditingTemplate(null);
      await fetchTemplates();
    } catch (error) {
      console.error("Error updating template:", error);
      setError("Failed to update template: " + error.message);
    }
  };

  const ViewTemplateForm = ({ template }) => (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      {/* Basic Template Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Template Name
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
            {template.name}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
            {template.category}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
          {template.description}
        </div>
      </div>

      {/* Template Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-teal-50 rounded-lg">
          <div className="text-2xl font-bold text-teal-600">
            {template.fields}
          </div>
          <div className="text-sm text-teal-700">Fields</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {template.usageCount}
          </div>
          <div className="text-sm text-blue-700">Uses</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {template.estimatedTime}
          </div>
          <div className="text-sm text-green-700">Est. Time</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div
            className={`text-2xl font-bold ${
              template.isActive ? "text-green-600" : "text-gray-400"
            }`}
          >
            {template.isActive ? "Active" : "Inactive"}
          </div>
          <div className="text-sm text-purple-700">Status</div>
        </div>
      </div>

      {/* Report Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Report Fields ({template.reportFields?.length || 0})
        </label>
        <div className="space-y-3">
          {template.reportFields && template.reportFields.length > 0 ? (
            template.reportFields.map((field, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-md bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Field Name
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {field.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Type
                    </div>
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {field.type}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Unit
                    </div>
                    <div className="text-sm text-gray-700">
                      {field.unit || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Normal Range
                    </div>
                    <div className="text-sm text-gray-700">
                      {field.normalRange || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Required
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        field.required
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {field.required ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No fields defined for this template
            </div>
          )}
        </div>
      </div>

      {/* Reference Ranges */}
      {template.referenceRanges &&
        Object.keys(template.referenceRanges).length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Reference Ranges ({Object.keys(template.referenceRanges).length})
            </label>
            <div className="space-y-2">
              {Object.entries(template.referenceRanges).map(
                ([parameter, range]) => (
                  <div
                    key={parameter}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div className="font-medium text-gray-900">{parameter}</div>
                    <div className="text-sm text-gray-600">
                      {range.normalRange} {range.unit && `(${range.unit})`}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

      {/* Template Metadata */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {new Date(template.createdDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Last Modified:</span>{" "}
            {new Date(template.lastModified).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Created By:</span>{" "}
            {template.createdBy}
          </div>
          <div>
            <span className="font-medium">Template ID:</span> {template.id}
          </div>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => {
            setActiveModal(null);
            setViewingTemplate(null);
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );

  const getModalContent = () => {
    switch (activeModal) {
      case "create":
        return <CreateTemplateForm onSubmit={handleCreateTemplate} />;
      case "edit":
        return (
          <CreateTemplateForm
            onSubmit={handleUpdateTemplate}
            initialData={editingTemplate?.formData}
            isEditing={true}
          />
        );
      case "view":
        return viewingTemplate ? (
          <ViewTemplateForm template={viewingTemplate} />
        ) : null;
      default:
        return null;
    }
  };

  const TemplateCard = ({ template }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
              {template.name}
            </h3>
            <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
              {template.category}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              template.isActive ? "bg-teal-500" : "bg-gray-400"
            }`}
          />
          <div className="relative group/menu">
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200">
              <button
                onClick={() => handleViewTemplate(template)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button
                onClick={() => handleEditTemplate(template)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDuplicateTemplate(template)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Duplicate</span>
              </button>
              <button
                onClick={() => handleToggleActive(template.id)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Archive className="w-4 h-4" />
                <span>{template.isActive ? "Deactivate" : "Activate"}</span>
              </button>
              <hr className="my-1" />
              <button
                onClick={() => handleDeleteTemplate(template.id)}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {template.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FileText className="w-4 h-4" />
          <span>{template.fields} fields</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{template.estimatedTime}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span>{template.createdBy}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>{template.usageCount} uses</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          Created: {new Date(template.createdDate).toLocaleDateString()}
        </span>
        <span>
          Modified: {new Date(template.lastModified).toLocaleDateString()}
        </span>
      </div>
    </div>
  );

  const TemplateListItem = ({ template }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                {template.category}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  template.isActive ? "bg-teal-500" : "bg-gray-400"
                }`}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            <div className="flex items-center space-x-6 mt-2 text-xs text-gray-500">
              <span>{template.fields} fields</span>
              <span>{template.estimatedTime}</span>
              <span>{template.usageCount} uses</span>
              <span>By {template.createdBy}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            role="neutral"
            size="xs"
            icon={Eye}
            onClick={() => handleViewTemplate(template)}
            className="p-2"
          />
          <Button
            variant="ghost"
            role="neutral"
            size="xs"
            icon={Edit3}
            onClick={() => handleEditTemplate(template)}
            className="p-2"
          />
          <Button
            variant="ghost"
            role="neutral"
            size="xs"
            icon={Copy}
            onClick={() => handleDuplicateTemplate(template)}
            className="p-2"
          />
          <Button
            variant="ghost"
            role="danger"
            size="xs"
            icon={Trash2}
            onClick={() => handleDeleteTemplate(template.id)}
            className="p-2"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Report Templates</h1>
          <p className="text-gray-600 mt-2">
            Manage and organize your lab report templates
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" role="lab" size="md" icon={Upload}>
            Import
          </Button>
          <Button variant="ghost" role="lab" size="md" icon={Download}>
            Export
          </Button>
          <Button
            onClick={() => setActiveModal("create")}
            variant="primary"
            role="lab"
            size="md"
            icon={Plus}
            className="shadow-lg hover:shadow-xl"
          >
            Create Template
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <Loader className="w-6 h-6 text-teal-600 animate-spin" />
            <span className="text-gray-600">Loading templates...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-800 font-medium">
                Error loading templates
              </p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
            <Button
              variant="ghost"
              role="danger"
              size="sm"
              onClick={fetchTemplates}
              className="ml-auto"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Content - only show when not loading and no error */}
      {!loading && !error && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Templates
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {templates.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Templates
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {templates.filter((t) => t.isActive).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Archive className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Most Used</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {templates.length > 0
                      ? Math.max(...templates.map((t) => t.usageCount))
                      : 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(templates.map((t) => t.category)).size}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Filter className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-teal-100 text-teal-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-teal-100 text-teal-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Showing {filteredTemplates.length} of {templates.length} templates
            </div>
          </div>

          {/* Templates Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTemplates.map((template) => (
                <TemplateListItem key={template.id} template={template} />
              ))}
            </div>
          )}

          {filteredTemplates.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No templates found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first template to get started"}
              </p>
              <button
                onClick={() => setActiveModal("create")}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Create Template</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      <Modal
        isOpen={activeModal === "create" || activeModal === "edit"}
        onClose={() => {
          setActiveModal(null);
          setEditingTemplate(null);
        }}
        title={activeModal === "edit" ? "Edit Template" : "Create New Template"}
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default Templates;
