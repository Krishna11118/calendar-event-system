import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, MapPin, ArrowLeft, Users, Clock } from 'lucide-react';
import { Event } from '../types';

interface CalendarProps {
  onEventSelect: (event: Event) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onEventSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Little Tigers Karate",
      time: "3:00 PM - 4:00 PM",
      location: "34 West 15th Street, NY",
      members: "25 out of 30",
      days: ['Mon', 'Thu'],
      type: 'weekly'
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      if (event.type === 'weekly') {
        const dayName = format(date, 'E').substring(0, 3);
        return event.days.includes(dayName);
      }
      return false;
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Event Header */}
      <div className="flex-shrink-0 border-b border-gray-200 mx-6 shadow-sm border rounded-md ">
        <div className="px-3 md:px-4 py-2">
          <div className="flex items-center text-sm text-gray-500">
            <button className="flex items-center hover:text-gray-700">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Events</span>
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 truncate">Little Tigers Karate</span>
          </div>
        </div>
        <div className="px-3 md:px-4 pb-3">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-2 md:space-y-0">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
                  Weekly
                </div>
                <h1 className="text-lg md:text-xl font-semibold text-gray-900">Little Tigers Karate</h1>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>25 out of 30</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>3:00 PM - 4:00 PM</span>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50">
              Edit Master Event
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className='m-6 shadow-sm border rounded-md '>
        <div className="flex-shrink-0 p-2 md:p-3 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-base md:text-lg font-medium text-gray-900">Full Event Schedule</h2>
            <p className="text-sm text-gray-500">{format(currentDate, 'MMMM yyyy')}</p>
          </div>
          <div className="flex items-center justify-between md:justify-end md:space-x-4">
            <div className="flex items-center space-x-1">
              <button
                onClick={previousMonth}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 bg-purple-50 h-5 rounded-full text-gray-600" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-5 bg-purple-50 h-5 rounded-full text-gray-600" />
              </button>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm hidden md:inline">34 West 15th Street, NY</span>
              <span className="text-sm md:hidden">NY</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7 min-h-full">
            <div className="contents">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div
                  key={day}
                  className="sticky top-0 z-10 bg-white py-1.5 px-1 md:px-2 text-xs font-medium text-gray-500 border-b text-center md:text-left"
                >
                  {day}
                </div>
              ))}
            </div>
            {days.map((day, dayIdx) => {
              const dayEvents = getEventsForDay(day);
              const isToday = isSameDay(day, new Date());
              const isSelected = dayIdx === 14;

              return (
                <div
                  key={day.toString()}
                  className={`
                  min-h-[75px] p-1 md:p-2 border-b border-r relative
                  ${!isSameMonth(day, currentDate) ? 'bg-gray-50' : 'bg-white'}
                  ${isSelected ? 'border-b-2 border-b-purple-500' : ''}
                `}
                >
                  <span
                    className={`
                    inline-block text-xs md:text-sm
                    ${!isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-700'}
                    ${isToday ? 'text-blue-600 font-bold' : ''}
                    ${isSelected ? 'text-purple-600 font-bold' : ''}
                  `}
                  >
                    {format(day, 'd')}
                  </span>
                  <div className="mt-1">
                    {dayEvents.map(event => (
                      <button
                        key={event.id}
                        onClick={() => onEventSelect(event)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center space-x-1 text-xs text-green-700">
                          <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                          <span className="truncate">{event.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Calendar;