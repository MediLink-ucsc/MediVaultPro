// src/components/Doctor/Documentation.js
import React from 'react';
import { FileText, ClipboardList, BookOpen, FilePlus, Download } from 'lucide-react';

const Documentation = () => {
  const docs = [
    { title: 'SOAP Notes', icon: FileText, count: 24 },
    { title: 'Templates', icon: ClipboardList, count: 12 },
    { title: 'Patient Education', icon: BookOpen, count: 18 },
    { title: 'New Document', icon: FilePlus },
    { title: 'Export All', icon: Download },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Documentation</h1>
        <p className="text-gray-600 mt-2">Manage patient records and clinical notes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {docs.map((doc, index) => {
          const Icon = doc.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <Icon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{doc.title}</h3>
                  {doc.count && <p className="text-sm text-gray-500">{doc.count} items</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Documentation;