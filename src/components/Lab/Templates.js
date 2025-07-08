// src/components/Lab/Templates.js
import React, { useState } from 'react';
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
  MoreVertical
} from 'lucide-react';
import Modal from '../Common/Modal';
import CreateTemplateForm from './CreateTemplateForm';

const Templates = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  // Mock data for existing templates
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      category: 'Blood Tests',
      description: 'Standard blood count analysis with differential',
      createdDate: '2024-01-15',
      lastModified: '2024-02-20',
      createdBy: 'Dr. Smith',
      usageCount: 234,
      isActive: true,
      fields: 12,
      estimatedTime: '15 min'
    },
    {
      id: 2,
      name: 'Lipid Profile',
      category: 'Blood Tests',
      description: 'Comprehensive cholesterol and lipid analysis',
      createdDate: '2024-01-20',
      lastModified: '2024-02-18',
      createdBy: 'Dr. Johnson',
      usageCount: 187,
      isActive: true,
      fields: 8,
      estimatedTime: '10 min'
    },
    {
      id: 3,
      name: 'Thyroid Function Test',
      category: 'Hormone Tests',
      description: 'Complete thyroid hormone panel including TSH, T3, T4',
      createdDate: '2024-01-25',
      lastModified: '2024-02-15',
      createdBy: 'Dr. Williams',
      usageCount: 156,
      isActive: true,
      fields: 6,
      estimatedTime: '12 min'
    },
    {
      id: 4,
      name: 'Urine Analysis',
      category: 'Urine Tests',
      description: 'Comprehensive urinalysis with microscopic examination',
      createdDate: '2024-02-01',
      lastModified: '2024-02-10',
      createdBy: 'Lab Tech Sarah',
      usageCount: 89,
      isActive: false,
      fields: 15,
      estimatedTime: '20 min'
    }
  ]);

  const categories = [
    'All',
    'Blood Tests',
    'Urine Tests',
    'Imaging',
    'Cultures',
    'Cardiac Tests',
    'Hormone Tests',
    'Metabolic Tests',
    'Immunology'
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           template.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleCreateTemplate = (templateData) => {
    const newTemplate = {
      id: templates.length + 1,
      ...templateData,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      createdBy: 'Current User',
      usageCount: 0,
      isActive: true,
      fields: templateData.fields?.length || 0,
      estimatedTime: '15 min'
    };
    setTemplates([...templates, newTemplate]);
    setActiveModal(null);
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const handleDuplicateTemplate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: templates.length + 1,
      name: `${template.name} (Copy)`,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      usageCount: 0
    };
    setTemplates([...templates, duplicatedTemplate]);
  };

  const handleToggleActive = (templateId) => {
    setTemplates(templates.map(t => 
      t.id === templateId ? { ...t, isActive: !t.isActive } : t
    ));
  };

  const getModalContent = () => {
    switch (activeModal) {
      case 'create':
        return <CreateTemplateForm onSubmit={handleCreateTemplate} />;
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
          <div className={`w-2 h-2 rounded-full ${template.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
          <div className="relative group/menu">
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
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
                <span>{template.isActive ? 'Deactivate' : 'Activate'}</span>
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

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>

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
        <span>Created: {new Date(template.createdDate).toLocaleDateString()}</span>
        <span>Modified: {new Date(template.lastModified).toLocaleDateString()}</span>
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
              <div className={`w-2 h-2 rounded-full ${template.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
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
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit3 className="w-4 h-4 text-gray-500" />
          </button>
          <button 
            onClick={() => handleDuplicateTemplate(template)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
          <button 
            onClick={() => handleDeleteTemplate(template.id)}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
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
          <p className="text-gray-600 mt-2">Manage and organize your lab report templates</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setActiveModal('create')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.filter(t => t.isActive).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Archive className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Most Used</p>
              <p className="text-2xl font-bold text-gray-900">{Math.max(...templates.map(t => t.usageCount))}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{new Set(templates.map(t => t.category)).size}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Filter className="w-6 h-6 text-purple-600" />
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
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-teal-100 text-teal-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-teal-100 text-teal-600' : 'text-gray-500 hover:bg-gray-100'
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
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTemplates.map(template => (
            <TemplateListItem key={template.id} template={template} />
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Create your first template to get started'
            }
          </p>
          <button 
            onClick={() => setActiveModal('create')}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal 
        isOpen={activeModal === 'create'} 
        onClose={() => setActiveModal(null)}
        title="Create New Template"
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default Templates;
