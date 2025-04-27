import React from 'react';
import { X, Users, Clock, MapPin } from 'lucide-react';
import { Event } from '../types';

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
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
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Edit Event
        </button>
      </div>
    </div>
  );
};

export default EventDetails;