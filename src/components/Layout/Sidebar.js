import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  TestTube,
  BarChart3,
  Settings,
  FlaskConical,
  ChevronRight,
  Building2,
  UserPlus,
  BookTemplate,
  Clock
} from 'lucide-react';
import MediLinkLogo from '../resources/MediLinkLogo.jpeg';

const Sidebar = ({ user }) => {
  const getRoleColors = () => {
    // Unified color scheme using teal as the primary color for all roles
    return {
      primary: 'from-[#0d9488] to-[#0d9488]',
      primaryLight: 'from-[#14b8a6] to-[#5eead4]',
      secondary: 'from-teal-50 to-teal-100',
      accent: '#0d9488',
      accentLight: '#14b8a6',
      hover: 'hover:bg-teal-50',
      hoverText: 'hover:text-[#0d9488]'
    };
  };

  const colors = getRoleColors();

  const getMenuItems = () => {
    switch (user.role) {
      case 'doctor':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor' },
          { icon: Users, label: 'Patients', path: '/doctor/patients' },
          { icon: Calendar, label: 'Calendar', path: '/doctor/calendar' },
          { icon: BarChart3, label: 'Analytics', path: '/doctor/analytics' },
          { icon: Settings, label: 'Settings', path: '/doctor/settings' }
        ];
      case 'nurse':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/nurse' },
          { icon: Users, label: 'Patient Care', path: '/nurse/patients' },
          { icon: Clock, label: 'Medication Schedule', path: '/nurse/medications' },
          { icon: Settings, label: 'Settings', path: '/nurse/settings' }
        ];
      case 'lab':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/lab' },
          { icon: FlaskConical, label: 'Samples', path: '/lab/samples' },
          { icon: TestTube, label: 'Reports', path: '/lab/reports' },
          { icon: BookTemplate, label: 'Templates', path: '/lab/templates' },
          { icon: BarChart3, label: 'Analytics', path: '/lab/analytics' },
          { icon: Settings, label: 'Settings', path: '/lab/settings' }
        ];
      case 'clinicadmin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/clinic-admin' },
          { icon: Building2, label: 'Clinic Profile', path: '/clinic-admin/clinic-profile' },
          { icon: UserPlus, label: 'Manage Staff', path: '/clinic-admin/manage-staff' },
          { icon: Settings, label: 'Settings', path: '/clinic-admin/settings' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 shadow-lg relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.secondary} opacity-30`} />
        <div className="relative flex items-center space-x-3">
          <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover-lift overflow-hidden`}>
            <img 
              src={MediLinkLogo} 
              alt="MediLink Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-gray-800 text-lg">MedivaultPro</div>
            <div className="text-xs text-gray-600 font-medium capitalize">{user.role} Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end
            className={({ isActive }) => `
              group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 
              ${isActive 
                ? `bg-gradient-to-r ${colors.primaryLight} text-white shadow-lg transform scale-105 pulse-glow` 
                : `text-gray-700 ${colors.hover} hover:shadow-md hover:transform hover:scale-105`
              }
              relative overflow-hidden sidebar-nav-item
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.primaryLight} opacity-0 ${isActive ? 'opacity-100' : 'group-hover:opacity-10'} transition-opacity duration-300 rounded-xl`} />
                <div className="relative flex items-center space-x-3 z-10">
                  <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : 'bg-transparent group-hover:bg-white/10'} transition-all duration-300`}>
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : `text-gray-600 ${colors.hoverText}`} transition-colors duration-300`} />
                  </div>
                  <span className={`font-medium ${isActive ? 'text-white' : `text-gray-700 ${colors.hoverText}`} transition-colors duration-300`}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight className={`relative z-10 w-4 h-4 ${isActive ? 'text-white opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'} transition-all duration-300 ${isActive ? 'transform translate-x-0' : 'transform translate-x-2 group-hover:translate-x-0'}`} />
                {isActive && (
                  <div className={`absolute left-0 top-0 w-1 h-full bg-white rounded-r-full shadow-lg`} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[${colors.accentLight}] to-transparent opacity-50`} />
    </div>
  );
};

export default Sidebar;