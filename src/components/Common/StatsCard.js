// src/components/Common/StatsCard.js
import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    teal: {
      bg: 'bg-teal-100',
      icon: 'text-teal-600',
      border: 'border-teal-200',
      cardBg: 'bg-white'
    },
    orange: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
      border: 'border-orange-200',
      cardBg: 'bg-white'
    },
    blue: {
      bg: 'bg-teal-100',
      icon: 'text-teal-600',
      border: 'border-teal-200',
      cardBg: 'bg-white'
    },
    purple: {
      bg: 'bg-orange-100',
      icon: 'text-orange-600',
      border: 'border-orange-200',
      cardBg: 'bg-white'
    },
    green: {
      bg: 'bg-teal-100',
      icon: 'text-teal-600',
      border: 'border-teal-200',
      cardBg: 'bg-white'
    }
  };

  const trendColor = trend?.startsWith('+') ? 'text-teal-600' : 
                   trend?.startsWith('-') ? 'text-orange-600' : 
                   'text-gray-600';

  return (
    <div className={`${colorClasses[color]?.cardBg || 'bg-white'} rounded-xl shadow-sm border ${colorClasses[color]?.border || 'border-gray-200'} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trendColor}`}>
              {trend} 
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]?.bg || 'bg-gray-100'} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]?.icon || 'text-gray-600'}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;