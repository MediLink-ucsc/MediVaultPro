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
  Loader,
  AlertCircle,
} from "lucide-react";
import Modal from "../Common/Modal";
import CreateTemplateForm from "./CreateTemplateForm";
import ViewTemplateModal from "./ViewTemplateModal";
import EditTemplateForm from "./EditTemplateForm";
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
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Transform API data to template format
  const transformTestTypeToTemplate = (testType) => {
    let reportFields = [];
    try {
      reportFields = JSON.parse(testType.reportFieldsJson || "[]");
    } catch (e) {
      console.error("Error parsing reportFieldsJson:", e);
      reportFields = [];
    }

    return {
      id: testType.id,
      name: testType.label,
      category: testType.category || "General",
      description: `${testType.label} test template with ${reportFields.length} fields`,
      createdDate: new Date(testType.createdAt).toISOString().split("T")[0],
      lastModified: new Date(testType.updatedAt).toISOString().split("T")[0],
      createdBy: "System",
      usageCount: Math.floor(Math.random() * 500), // You might want to add this to the API later
      isActive: true,
      fields: reportFields.length,
      estimatedTime: `${Math.max(5, reportFields.length * 2)} min`,
      value: testType.value,
      reportFields: reportFields,
      referenceRanges: testType.referenceRangesJson,
      parserClass: testType.parserClass,
      parserModule: testType.parserModule,
    };
  };

  // Fetch templates from API
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getTestTypes();

      if (response.success && response.data) {
        const transformedTemplates = response.data.map(
          transformTestTypeToTemplate
        );
        setTemplates(transformedTemplates);
      } else {
        throw new Error("Failed to fetch templates");
      }
    } catch (err) {
      setError(err.message || "Failed to load templates");
      console.error("Error fetching templates:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Dynamic categories based on fetched templates
  const categories = [
    "All",
    ...Array.from(
      new Set(templates.map((template) => template.category))
    ).sort(),
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
      if (!templateData) {
        setActiveModal(null);
        return;
      }

      // Call the createTestType API
      await ApiService.createTestType(templateData);

      // Refresh the templates list to show the new template
      await fetchTemplates();
      setActiveModal(null);

      // Optional: Show success message
      console.log("Template created successfully!");
    } catch (error) {
      console.error("Error creating template:", error);
      // You might want to show an error message to the user here
      alert("Failed to create template. Please try again.");
    }
  };

  const handleUpdateTemplate = async (templateData) => {
    try {
      if (!selectedTemplate) return;

      // Call the updateTestType API
      await ApiService.updateTestType(selectedTemplate.id, templateData);

      // Refresh the templates list
      await fetchTemplates();
      setActiveModal(null);
      setSelectedTemplate(null);
    } catch (error) {
      console.error("Error updating template:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleViewTemplate = (template) => {
    setSelectedTemplate(template);
    setActiveModal("view");
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setActiveModal("edit");
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      // TODO: Implement API call to delete template when endpoint is available
      // For now, just refresh the templates list
      await fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleDuplicateTemplate = async (template) => {
    try {
      // TODO: Implement API call to duplicate template when endpoint is available
      // For now, just refresh the templates list
      await fetchTemplates();
    } catch (error) {
      console.error("Error duplicating template:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleToggleActive = async (templateId) => {
    try {
      // TODO: Implement API call to toggle template active status when endpoint is available
      // For now, just refresh the templates list
      await fetchTemplates();
    } catch (error) {
      console.error("Error toggling template status:", error);
      // You might want to show an error message to the user here
    }
  };

  const getModalContent = () => {
    switch (activeModal) {
      case "create":
        return <CreateTemplateForm onSubmit={handleCreateTemplate} />;
      case "edit":
        return (
          <EditTemplateForm
            template={selectedTemplate}
            onSubmit={handleUpdateTemplate}
            onCancel={() => {
              setActiveModal(null);
              setSelectedTemplate(null);
            }}
          />
        );
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
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <Loader className="w-6 h-6 animate-spin text-teal-600" />
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
              <h3 className="text-sm font-medium text-red-800">
                Error loading templates
              </h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
          <Button
            onClick={fetchTemplates}
            variant="ghost"
            role="danger"
            size="sm"
            className="mt-3"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Main Content - Only show when not loading and no error */}
      {!loading && !error && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Report Templates
              </h1>
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
            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Most Used</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.max(...templates.map((t) => t.usageCount))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div> */}
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

          {filteredTemplates.length === 0 && (
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

          {/* Modal */}
          <Modal
            isOpen={activeModal === "create"}
            onClose={() => setActiveModal(null)}
            title="Create New Template"
          >
            {getModalContent()}
          </Modal>

          <Modal
            isOpen={activeModal === "edit"}
            onClose={() => {
              setActiveModal(null);
              setSelectedTemplate(null);
            }}
            title="Edit Template"
            size="large"
          >
            {getModalContent()}
          </Modal>

          {/* View Template Modal */}
          {activeModal === "view" && selectedTemplate && (
            <ViewTemplateModal
              template={selectedTemplate}
              onClose={() => {
                setActiveModal(null);
                setSelectedTemplate(null);
              }}
              onEdit={handleEditTemplate}
              onDuplicate={handleDuplicateTemplate}
              onToggleActive={handleToggleActive}
              onDelete={handleDeleteTemplate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Templates;
