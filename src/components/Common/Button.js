import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  role = 'doctor',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  // Unified color schemes - teal for standard, orange for urgent
  const roleColors = {
    doctor: {
      primary: {
        base: 'bg-gradient-to-r from-teal-500 to-teal-600',
        hover: 'hover:from-teal-600 hover:to-teal-700',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-200',
        text: 'text-white'
      },
      secondary: {
        base: 'bg-teal-50 border-2 border-teal-200',
        hover: 'hover:bg-teal-100 hover:border-teal-300',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-100',
        text: 'text-teal-700'
      },
      outline: {
        base: 'border-2 border-teal-500 bg-transparent',
        hover: 'hover:bg-teal-500 hover:text-white',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-200',
        text: 'text-teal-500'
      },
      ghost: {
        base: 'bg-transparent',
        hover: 'hover:bg-teal-50',
        focus: 'focus:ring-teal-500',
        shadow: '',
        text: 'text-teal-600'
      }
    },
    nurse: {
      primary: {
        base: 'bg-gradient-to-r from-teal-500 to-teal-600',
        hover: 'hover:from-teal-600 hover:to-teal-700',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-200',
        text: 'text-white'
      },
      secondary: {
        base: 'bg-teal-50 border-2 border-teal-200',
        hover: 'hover:bg-teal-100 hover:border-teal-300',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-100',
        text: 'text-teal-700'
      },
      outline: {
        base: 'border-2 border-teal-500 bg-transparent',
        hover: 'hover:bg-teal-500 hover:text-white',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-200',
        text: 'text-teal-500'
      },
      ghost: {
        base: 'bg-transparent',
        hover: 'hover:bg-teal-50',
        focus: 'focus:ring-teal-500',
        shadow: '',
        text: 'text-teal-600'
      }
    },
    lab: {
      primary: {
        base: 'bg-gradient-to-r from-teal-500 to-teal-600',
        hover: 'hover:from-teal-600 hover:to-teal-700',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-200',
        text: 'text-white'
      },
      secondary: {
        base: 'bg-teal-50 border-2 border-teal-200',
        hover: 'hover:bg-teal-100 hover:border-teal-300',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-100',
        text: 'text-teal-700'
      },
      outline: {
        base: 'border-2 border-teal-500 bg-transparent',
        hover: 'hover:bg-teal-500 hover:text-white',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-200',
        text: 'text-teal-500'
      },
      ghost: {
        base: 'bg-transparent',
        hover: 'hover:bg-teal-50',
        focus: 'focus:ring-teal-500',
        shadow: '',
        text: 'text-teal-600'
      }
    },
    clinicadmin: {
      primary: {
        base: 'bg-gradient-to-r from-teal-500 to-teal-600',
        hover: 'hover:from-teal-600 hover:to-teal-700',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-200',
        text: 'text-white'
      },
      secondary: {
        base: 'bg-teal-50 border-2 border-teal-200',
        hover: 'hover:bg-teal-100 hover:border-teal-300',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-100',
        text: 'text-teal-700'
      },
      outline: {
        base: 'border-2 border-teal-500 bg-transparent',
        hover: 'hover:bg-teal-500 hover:text-white',
        focus: 'focus:ring-teal-500',
        shadow: 'shadow-teal-200',
        text: 'text-teal-500'
      },
      ghost: {
        base: 'bg-transparent',
        hover: 'hover:bg-teal-50',
        focus: 'focus:ring-teal-500',
        shadow: '',
        text: 'text-teal-600'
      }
    },
    urgent: {
      primary: {
        base: 'bg-gradient-to-r from-orange-500 to-orange-600',
        hover: 'hover:from-orange-600 hover:to-orange-700',
        focus: 'focus:ring-orange-500',
        shadow: 'shadow-orange-200',
        text: 'text-white'
      },
      secondary: {
        base: 'bg-orange-50 border-2 border-orange-200',
        hover: 'hover:bg-orange-100 hover:border-orange-300',
        focus: 'focus:ring-orange-500',
        shadow: 'shadow-orange-100',
        text: 'text-orange-700'
      },
      outline: {
        base: 'border-2 border-orange-500 bg-transparent',
        hover: 'hover:bg-orange-500 hover:text-white',
        focus: 'focus:ring-orange-500',
        shadow: 'shadow-orange-200',
        text: 'text-orange-500'
      },
      ghost: {
        base: 'bg-transparent',
        hover: 'hover:bg-orange-50',
        focus: 'focus:ring-orange-500',
        shadow: '',
        text: 'text-orange-600'
      }
    },
    neutral: {
      primary: {
        base: 'bg-gradient-to-r from-gray-600 to-gray-700',
        hover: 'hover:from-gray-700 hover:to-gray-800',
        focus: 'focus:ring-gray-500',
        shadow: 'shadow-gray-200',
        text: 'text-white'
      },
      secondary: {
        base: 'bg-gray-50 border-2 border-gray-200',
        hover: 'hover:bg-gray-100 hover:border-gray-300',
        focus: 'focus:ring-gray-500',
        shadow: 'shadow-gray-100',
        text: 'text-gray-700'
      },
      outline: {
        base: 'border-2 border-gray-400 bg-transparent',
        hover: 'hover:bg-gray-400 hover:text-white',
        focus: 'focus:ring-gray-500',
        shadow: 'shadow-gray-200',
        text: 'text-gray-600'
      },
      ghost: {
        base: 'bg-transparent',
        hover: 'hover:bg-gray-50',
        focus: 'focus:ring-gray-500',
        shadow: '',
        text: 'text-gray-600'
      }
    },
    danger: {
      primary: {
        base: 'bg-gradient-to-r from-red-500 to-red-600',
        hover: 'hover:from-red-600 hover:to-red-700',
        focus: 'focus:ring-red-500',
        shadow: 'shadow-red-200',
        text: 'text-white'
      },
      secondary: {
        base: 'bg-red-50 border-2 border-red-200',
        hover: 'hover:bg-red-100 hover:border-red-300',
        focus: 'focus:ring-red-500',
        shadow: 'shadow-red-100',
        text: 'text-red-700'
      },
      outline: {
        base: 'border-2 border-red-500 bg-transparent',
        hover: 'hover:bg-red-500 hover:text-white',
        focus: 'focus:ring-red-500',
        shadow: 'shadow-red-200',
        text: 'text-red-500'
      },
      ghost: {
        base: 'bg-transparent',
        hover: 'hover:bg-red-50',
        focus: 'focus:ring-red-500',
        shadow: '',
        text: 'text-red-600'
      }
    }
  };

  // Size configurations
  const sizes = {
    xs: 'px-2 py-1 text-xs font-medium',
    sm: 'px-3 py-1.5 text-sm font-medium',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-semibold',
    xl: 'px-8 py-4 text-lg font-semibold'
  };

  // Get the color scheme based on role and variant
  const colorScheme = roleColors[role]?.[variant] || roleColors.neutral[variant];

  // Build base classes
  const baseClasses = [
    // Core styles
    'inline-flex items-center justify-center',
    'rounded-lg font-medium',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transform active:scale-95',
    
    // Size
    sizes[size],
    
    // Color scheme
    colorScheme.base,
    colorScheme.text,
    
    // Hover and focus states (only if not disabled)
    !disabled && colorScheme.hover,
    !disabled && colorScheme.focus,
    
    // Shadow
    colorScheme.shadow,
    
    // Width
    fullWidth && 'w-full',
    
    // Custom classes
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={!disabled && !loading ? onClick : undefined}
      className={baseClasses}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`w-4 h-4 ${children ? 'ml-2' : ''}`} />
      )}
    </motion.button>
  );
};

export default Button;
