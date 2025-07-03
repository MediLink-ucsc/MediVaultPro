// src/components/Layout/Sidebar.js
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  TestTube, 
  BarChart3, 
  Settings,
  Stethoscope,
  Pill,
  Activity,
  ClipboardList,
  FlaskConical
} from 'lucide-react';

const Sidebar = ({ user }) => {
  const getMenuItems = () => {
    switch (user.role) {
      case 'doctor':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor' },
          { icon: Users, label: 'Patients', path: '/doctor/patients' },
          { icon: Calendar, label: 'Calendar', path: '/doctor/appointments' },
{ icon: FileText, label: 'Documentation', path: '/doctor/documentation' },
          { icon: TestTube, label: 'Diagnostics', path: '/doctor/diagnostics' },
          { icon: BarChart3, label: 'Analytics', path: '/doctor/analytics' },
          { icon: Settings, label: 'Settings', path: '/doctor/settings' }
        ];
      case 'nurse':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/nurse' },
          { icon: Users, label: 'Patients', path: '/nurse/patients' },
          { icon: Pill, label: 'Medications', path: '/nurse/medications' },
          { icon: Activity, label: 'Vital Signs', path: '/nurse/vitals' },
          { icon: ClipboardList, label: 'Care Plans', path: '/nurse/care-plans' },
          { icon: Settings, label: 'Settings', path: '/nurse/settings' }
        ];
      case 'lab':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/lab' },
          { icon: FlaskConical, label: 'Samples', path: '/lab/samples' },
          { icon: TestTube, label: 'Results', path: '/lab/results' },
          { icon: BarChart3, label: 'Analytics', path: '/lab/analytics' },
          { icon: Settings, label: 'Settings', path: '/lab/settings' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-800">MedivaultPro</div>
            <div className="text-xs text-gray-600">Medical Center</div>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;