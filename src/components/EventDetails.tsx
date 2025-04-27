import React, { useState, useEffect } from 'react';
import { X, Users, Clock, MapPin } from 'lucide-react';
import { Event, Location } from '../types';

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
  onEdit: (event: Event) => void;
  onSave: (event: Event) => void;
  isEditing: boolean;
  locations: Location[];
}

const EventDetails: React.FC<EventDetailsProps> = ({ 
  event, 
  onClose, 
  onEdit, 
  onSave, 
  isEditing,
  locations 
}) => {
  const [editedEvent, setEditedEvent] = useState<Event>(event);

  useEffect(() => {
    setEditedEvent(event);
  }, [event]);

  const handleChange = (field: keyof Event, value: any) => {
    setEditedEvent(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedEvent);
  };

  if (isEditing) {
    return (
      <div className="h-full flex flex-col bg-white shadow-xl">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Edit Event</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={editedEvent.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="text"
                value={editedEvent.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                value={editedEvent.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.address}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Members</label>
              <input
                type="text"
                value={editedEvent.members}
                onChange={(e) => handleChange('members', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <button
            onClick={handleSave}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white shadow-xl">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Event Details</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900">{event.title}</h3>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                {event.time}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                {event.members}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                {event.location}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Schedule</h4>
              <div className="mt-2 space-y-2">
                {event.days.map(day => (
                  <div key={day} className="flex items-center">
                    <div className="w-16 text-sm text-gray-500">{day}</div>
                    <div className="text-sm text-gray-900">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <button
          onClick={() => onEdit(event)}
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Edit Event
        </button>
      </div>
    </div>
  );
};

export default EventDetails;