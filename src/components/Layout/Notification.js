import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Clock, User, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'calendar',
      title: 'Calendar Event Reminder',
      message: 'Likitha has a calendar event in 15 minutes',
      time: '2 min ago',
      isRead: false,
      icon: Calendar,
      iconColor: 'text-teal-600'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Lab Results Available',
      message: 'Blood test results for Dulmini are ready for review',
      time: '1 hour ago',
      isRead: false,
      icon: AlertCircle,
      iconColor: 'text-orange-600'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'Dr. Sathya sent you a message about patient care protocol',
      time: '3 hours ago',
      isRead: true,
      icon: User,
      iconColor: 'text-teal-600'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      message: 'Scheduled maintenance completed successfully',
      time: '1 day ago',
      isRead: true,
      icon: CheckCircle,
      iconColor: 'text-teal-600'
    },
    {
      id: 5,
      type: 'calendar',
      title: 'Cancellation Notice',
      message: 'Hansaja cancelled her 3 PM calendar event',
      time: '2 days ago',
      isRead: false,
      icon: Calendar,
      iconColor: 'text-orange-600'
    }
  ]);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg transition-colors duration-200"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#ea580c' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="notifications-menu"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200" style={{ borderColor: '#0d9488' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800" style={{ color: '#0d9488' }}>
                Notifications
              </h3>
              <button
                onClick={toggleDropdown}
                className="p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Close notifications"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {unreadCount} new notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <ul className="py-2">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <li key={notification.id} className="relative">
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-150 ${
                          !notification.isRead ? 'bg-teal-50' : ''
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <IconComponent className={`w-5 h-5 ${notification.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <span 
                                  className="w-2 h-2 rounded-full ml-2 flex-shrink-0"
                                  style={{ backgroundColor: '#ea580c' }}
                                  aria-label="Unread"
                                />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="w-3 h-3 mr-1" />
                                {notification.time}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                                className="text-xs text-gray-400 hover:text-orange-600 focus:outline-none focus:text-orange-600 transition-colors duration-150"
                                aria-label="Remove notification"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-medium hover:underline focus:outline-none focus:underline transition-colors duration-150"
                  style={{ color: '#0d9488' }}
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </button>
                <button
                  onClick={clearAll}
                  className="text-sm font-medium hover:underline focus:outline-none focus:underline transition-colors duration-150"
                  style={{ color: '#0d9488' }}
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;