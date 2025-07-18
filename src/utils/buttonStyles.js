// Button styling utilities for consistent UI patterns
// Updated to use unified color scheme: teal for standard actions, orange for urgent/important actions

export const buttonVariants = {
  // Primary buttons - main actions
  primary: {
    doctor: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 focus:ring-teal-500 shadow-lg hover:shadow-teal-200',
    nurse: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 focus:ring-teal-500 shadow-lg hover:shadow-teal-200',
    lab: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 focus:ring-teal-500 shadow-lg hover:shadow-teal-200',
    clinicadmin: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 focus:ring-teal-500 shadow-lg hover:shadow-teal-200',
    urgent: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 focus:ring-orange-500 shadow-lg hover:shadow-orange-200',
    neutral: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500 shadow-lg hover:shadow-gray-200',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-red-200'
  },
  
  // Secondary buttons - less prominent actions
  secondary: {
    doctor: 'bg-teal-50 text-teal-700 border-2 border-teal-200 hover:bg-teal-100 hover:border-teal-300 focus:ring-teal-500',
    nurse: 'bg-teal-50 text-teal-700 border-2 border-teal-200 hover:bg-teal-100 hover:border-teal-300 focus:ring-teal-500',
    lab: 'bg-teal-50 text-teal-700 border-2 border-teal-200 hover:bg-teal-100 hover:border-teal-300 focus:ring-teal-500',
    clinicadmin: 'bg-teal-50 text-teal-700 border-2 border-teal-200 hover:bg-teal-100 hover:border-teal-300 focus:ring-teal-500',
    urgent: 'bg-orange-50 text-orange-700 border-2 border-orange-200 hover:bg-orange-100 hover:border-orange-300 focus:ring-orange-500',
    neutral: 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100 hover:border-gray-300 focus:ring-gray-500',
    danger: 'bg-red-50 text-red-700 border-2 border-red-200 hover:bg-red-100 hover:border-red-300 focus:ring-red-500'
  },
  
  // Outline buttons - minimal style
  outline: {
    doctor: 'border-2 border-teal-500 text-teal-500 bg-transparent hover:bg-teal-500 hover:text-white focus:ring-teal-500',
    nurse: 'border-2 border-teal-500 text-teal-500 bg-transparent hover:bg-teal-500 hover:text-white focus:ring-teal-500',
    lab: 'border-2 border-teal-500 text-teal-500 bg-transparent hover:bg-teal-500 hover:text-white focus:ring-teal-500',
    clinicadmin: 'border-2 border-teal-500 text-teal-500 bg-transparent hover:bg-teal-500 hover:text-white focus:ring-teal-500',
    urgent: 'border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white focus:ring-orange-500',
    neutral: 'border-2 border-gray-400 text-gray-600 bg-transparent hover:bg-gray-400 hover:text-white focus:ring-gray-500',
    danger: 'border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white focus:ring-red-500'
  },
  
  // Ghost buttons - minimal background
  ghost: {
    doctor: 'text-teal-600 bg-transparent hover:bg-teal-50 focus:ring-teal-500',
    nurse: 'text-teal-600 bg-transparent hover:bg-teal-50 focus:ring-teal-500',
    lab: 'text-teal-600 bg-transparent hover:bg-teal-50 focus:ring-teal-500',
    clinicadmin: 'text-teal-600 bg-transparent hover:bg-teal-50 focus:ring-teal-500',
    urgent: 'text-orange-600 bg-transparent hover:bg-orange-50 focus:ring-orange-500',
    neutral: 'text-gray-600 bg-transparent hover:bg-gray-50 focus:ring-gray-500',
    danger: 'text-red-600 bg-transparent hover:bg-red-50 focus:ring-red-500'
  }
};

export const buttonSizes = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
};

export const buttonBaseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';

// Utility function to get button classes
export const getButtonClasses = (variant = 'primary', role = 'doctor', size = 'md', fullWidth = false, className = '') => {
  const variantClasses = buttonVariants[variant]?.[role] || buttonVariants[variant]?.neutral || '';
  const sizeClasses = buttonSizes[size] || buttonSizes.md;
  const widthClass = fullWidth ? 'w-full' : '';
  
  return [
    buttonBaseClasses,
    variantClasses,
    sizeClasses,
    widthClass,
    className
  ].filter(Boolean).join(' ');
};

// Status and priority colors that match the unified color scheme
export const statusColors = {
  // For success/completed states - use teal for standard success
  success: {
    doctor: 'bg-teal-100 text-teal-700 border-teal-200',
    nurse: 'bg-teal-100 text-teal-700 border-teal-200',
    lab: 'bg-teal-100 text-teal-700 border-teal-200',
    clinicadmin: 'bg-teal-100 text-teal-700 border-teal-200',
    neutral: 'bg-green-100 text-green-700 border-green-200'
  },
  
  // For warning/urgent states - use orange for urgent/important items
  warning: {
    doctor: 'bg-orange-100 text-orange-700 border-orange-200',
    nurse: 'bg-orange-100 text-orange-700 border-orange-200',
    lab: 'bg-orange-100 text-orange-700 border-orange-200',
    clinicadmin: 'bg-orange-100 text-orange-700 border-orange-200',
    neutral: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  
  // For error/danger states
  error: {
    doctor: 'bg-red-100 text-red-700 border-red-200',
    nurse: 'bg-red-100 text-red-700 border-red-200',
    lab: 'bg-red-100 text-red-700 border-red-200',
    clinicadmin: 'bg-red-100 text-red-700 border-red-200',
    neutral: 'bg-red-100 text-red-700 border-red-200'
  },
  
  // For info/pending states - use teal for general information
  info: {
    doctor: 'bg-teal-100 text-teal-700 border-teal-200',
    nurse: 'bg-teal-100 text-teal-700 border-teal-200',
    lab: 'bg-teal-100 text-teal-700 border-teal-200',
    clinicadmin: 'bg-teal-100 text-teal-700 border-teal-200',
    neutral: 'bg-blue-100 text-blue-700 border-blue-200'
  }
};

// Icon container colors that match the unified color scheme
export const iconColors = {
  // Standard teal for all roles
  standard: {
    primary: 'text-teal-600',
    secondary: 'text-teal-500',
    background: 'bg-teal-100'
  },
  // Orange for urgent/important items across all roles
  urgent: {
    primary: 'text-orange-600',
    secondary: 'text-orange-500',
    background: 'bg-orange-100'
  },
  // Keep role-specific for backward compatibility (deprecated)
  doctor: {
    primary: 'text-teal-600',
    secondary: 'text-teal-500',
    background: 'bg-teal-100'
  },
  nurse: {
    primary: 'text-teal-600',
    secondary: 'text-teal-500',
    background: 'bg-teal-100'
  },
  lab: {
    primary: 'text-teal-600',
    secondary: 'text-teal-500',
    background: 'bg-teal-100'
  },
  clinicadmin: {
    primary: 'text-teal-600',
    secondary: 'text-teal-500',
    background: 'bg-teal-100'
  }
};

export default {
  buttonVariants,
  buttonSizes,
  buttonBaseClasses,
  getButtonClasses,
  statusColors,
  iconColors
};
