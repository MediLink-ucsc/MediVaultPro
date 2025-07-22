// src/components/Lab/Analytics.js
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Activity, Users, TestTube, Clock, CheckCircle } from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Lab Analytics</h1>
          <p className="text-gray-600 mt-2">Performance insights and metrics</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          {periods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Total Tests', value: '156', icon: TestTube, color: 'teal', change: '+12%' },
          { title: 'Completed', value: '134', icon: CheckCircle, color: 'teal', change: '+15%' },
          { title: 'Pending', value: '22', icon: Clock, color: 'orange', change: '-5%' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                metric.color === 'teal' ? 'bg-teal-100' : 'bg-orange-100'
              }`}>
                <metric.icon className={`w-6 h-6 ${
                  metric.color === 'teal' ? 'text-teal-600' : 'text-orange-600'
                }`} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.change.startsWith('+') ? 'text-teal-600' : 'text-orange-600'
              }`}>
                <TrendingUp className={`w-4 h-4 mr-1 ${
                  metric.change.startsWith('-') ? 'transform rotate-180' : ''
                }`} />
                {metric.change}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Test Categories</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { name: 'Blood Tests', count: 67, total: 156, color: 'teal' },
              { name: 'Urine Tests', count: 34, total: 156, color: 'orange' },
              { name: 'Imaging', count: 28, total: 156, color: 'teal' },
              { name: 'Cultures', count: 19, total: 156, color: 'orange' },
              { name: 'Others', count: 8, total: 156, color: 'gray' },
            ].map((category, i) => {
              const percentage = Math.round((category.count / category.total) * 100);
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        category.color === 'teal' ? 'bg-teal-500' : 
                        category.color === 'orange' ? 'bg-orange-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="font-medium text-gray-800">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{category.count}</span>
                      <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        category.color === 'teal' ? 'bg-teal-500' : 
                        category.color === 'orange' ? 'bg-orange-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Equipment Status</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { name: 'Microscope A', status: 'Active', uptime: '99.2%', color: 'teal' },
              { name: 'Analyzer B', status: 'Active', uptime: '97.8%', color: 'teal' },
              { name: 'Centrifuge C', status: 'Maintenance', uptime: '0%', color: 'orange' },
              { name: 'X-Ray Machine', status: 'Active', uptime: '95.5%', color: 'teal' },
              { name: 'Microscope B', status: 'Offline', uptime: '0%', color: 'red' },
            ].map((equipment, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    equipment.color === 'teal' ? 'bg-teal-500' : 
                    equipment.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <span className="font-medium text-gray-800">{equipment.name}</span>
                    <div className="text-xs text-gray-500">Uptime: {equipment.uptime}</div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  equipment.color === 'teal' ? 'bg-teal-100 text-teal-700' : 
                  equipment.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                }`}>
                  {equipment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Performance Summary</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200">
              <div className="text-3xl font-bold text-teal-600 mb-1">134</div>
              <div className="text-sm font-medium text-teal-700">Tests Completed</div>
              <div className="text-xs text-teal-600 mt-1">+15% from yesterday</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="text-3xl font-bold text-orange-600 mb-1">22</div>
              <div className="text-sm font-medium text-orange-700">Tests Pending</div>
              <div className="text-xs text-orange-600 mt-1">-5% from yesterday</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Response Times</h3>
          <div className="space-y-4">
            {[
              { test: 'Blood Tests', avgTime: '45 min', target: '60 min', status: 'good' },
              { test: 'Urinalysis', avgTime: '25 min', target: '30 min', status: 'good' },
              { test: 'X-Ray', avgTime: '15 min', target: '20 min', status: 'excellent' },
              { test: 'Culture Tests', avgTime: '48 hrs', target: '72 hrs', status: 'good' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{item.test}</div>
                  <div className="text-sm text-gray-600">Target: {item.target}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{item.avgTime}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'excellent' ? 'bg-teal-100 text-teal-700' : 'bg-teal-100 text-teal-700'
                  }`}>
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;