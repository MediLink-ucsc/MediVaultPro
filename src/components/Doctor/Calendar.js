import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Modal from '../Common/Modal';

const DoctorCalendar = ({ onBack, preFilledData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, date: '2025-06-29', time: '10:00', title: 'Team Meeting', description: 'Weekly team sync', color: 'bg-teal-500' },
    { id: 2, date: '2025-06-30', time: '14:30', title: 'Medical Conference', description: 'Cardiology updates', color: 'bg-teal-600' },
    { id: 3, date: '2025-07-01', time: '09:00', title: 'Personal Event', description: 'Dentist visit', color: 'bg-orange-500' }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    color: 'bg-teal-500'
  });

  // Auto-open modal with pre-filled data if provided
  useEffect(() => {
    // Check for patient data from localStorage first
    const storedPatientData = localStorage.getItem('selectedPatientForAppointment');
    if (storedPatientData) {
      const patientData = JSON.parse(storedPatientData);
      
      // Get tomorrow's date as default
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split('T')[0];
      
      setEventForm({
        title: `Appointment with ${patientData.name}`,
        description: `Medical consultation for ${patientData.condition}`,
        date: tomorrowString,
        time: '09:00',
        color: 'bg-teal-500'
      });
      
      setShowEventModal(true);
      
      // Clear the localStorage data after using it
      localStorage.removeItem('selectedPatientForAppointment');
    } else if (preFilledData) {
      setEventForm({
        title: preFilledData.title || '',
        description: preFilledData.description || '',
        date: preFilledData.date || '',
        time: preFilledData.time || '',
        color: preFilledData.color || 'bg-teal-500'
      });
      setShowEventModal(true);
    }
  }, [preFilledData]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const colors = [
    { name: 'Teal Light', class: 'bg-teal-400' },
    { name: 'Teal', class: 'bg-teal-500' },
    { name: 'Teal Dark', class: 'bg-teal-600' },
    { name: 'Orange Light', class: 'bg-orange-400' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'Orange Dark', class: 'bg-orange-600' }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateString = formatDate(date);
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const openEventModal = (date = null, event = null) => {
    if (event) {
      setEditingEvent(event);
      setEventForm({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        color: event.color
      });
    } else {
      setEditingEvent(null);
      setEventForm({
        title: '',
        description: '',
        date: date ? formatDate(date) : '',
        time: '',
        color: 'bg-teal-500'
      });
    }
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      color: 'bg-teal-500'
    });
  };

  const saveEvent = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.time) return;

    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...eventForm }
          : event
      ));
    } else {
      const newEvent = {
        id: Date.now(),
        ...eventForm,
        // Add patient info if available from preFilledData
        ...(preFilledData && {
          patientId: preFilledData.patientId,
          patientName: preFilledData.patientName
        })
      };
      setEvents(prev => [...prev, newEvent]);
    }
    closeEventModal();
    
    // Show success message
    if (preFilledData) {
      alert(`Appointment scheduled successfully for ${preFilledData.patientName}!`);
      // If this was triggered from patient list, go back
      if (onBack) {
        setTimeout(() => onBack(), 500);
      }
    }
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {onBack ? (
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Patient List</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
        )}
        <button 
          onClick={() => openEventModal()}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Calendar Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {daysOfWeek.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  return (
                    <div 
                      key={index} 
                      className={`min-h-24 p-2 border border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        day ? 'bg-white' : 'bg-gray-50'
                      } ${isToday(day) ? 'bg-teal-50 border-teal-200' : ''}`}
                      onClick={() => day && openEventModal(day)}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday(day) ? 'text-teal-600' : 'text-gray-800'
                          }`}>
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <div 
                                key={event.id}
                                className={`text-xs p-1 rounded text-white truncate ${event.color} cursor-pointer hover:opacity-80`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEventModal(null, event);
                                }}
                                title={event.patientName ? `Patient: ${event.patientName}` : event.description}
                              >
                                {event.time} {event.title}
                                {event.patientName && (
                                  <div className="text-xs opacity-90">👤 {event.patientName}</div>
                                )}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Events</h3>
            <div className="space-y-3">
              {getEventsForDate(new Date()).length > 0 ? (
                getEventsForDate(new Date()).map(event => (
                  <div key={event.id} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{event.title}</div>
                      <div className="text-xs text-gray-600">{event.time}</div>
                      {event.patientName && (
                        <div className="text-xs text-teal-600">👤 Patient: {event.patientName}</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No events today</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => openEventModal()}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
              >
                + Add Event
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
              >
                Go to Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <Modal 
        isOpen={showEventModal} 
        onClose={closeEventModal}
        title={editingEvent ? 'Edit Event' : 'Add Event'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={eventForm.title}
              onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={eventForm.description}
              onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
              placeholder="Event description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={eventForm.time}
                onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <div className="flex space-x-2">
              {colors.map(color => (
                <button
                  key={color.class}
                  onClick={() => setEventForm(prev => ({ ...prev, color: color.class }))}
                  className={`w-8 h-8 rounded-full ${color.class} ${
                    eventForm.color === color.class ? 'ring-2 ring-gray-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {editingEvent && (
              <button
                onClick={() => {
                  deleteEvent(editingEvent.id);
                  closeEventModal();
                }}
                className="text-orange-600 hover:text-orange-700 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            )}
            
            <div className="flex space-x-3 ml-auto">
              <button
                onClick={closeEventModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveEvent}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                {editingEvent ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorCalendar;