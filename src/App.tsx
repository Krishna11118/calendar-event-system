import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import EventDetails from './components/EventDetails';
import { Event } from './types';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content container */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header
          className={`
            bg-white shadow-sm transition-all duration-300 md:filter-none
            ${isSidebarOpen ? 'filter ' : 'filter-none'}
          `}
        >
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-600 hover:text-gray-900 md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <span className="sr-only">Menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Events</h1>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex overflow-hidden">
          <Calendar onEventSelect={setSelectedEvent} isSidebarOpen={isSidebarOpen} />

          {selectedEvent && (
            <div
              className={`
                fixed inset-0 md:relative md:inset-auto transition-all duration-300 z-30
                ${isSidebarOpen ? 'filter ' : 'filter-none'}
              `}
            >
              <div
                className="absolute inset-0 bg-gray-500 bg-opacity-75 md:hidden"
                onClick={() => setSelectedEvent(null)}
              />
              <div className="absolute inset-y-0 right-0 w-full max-w-sm md:relative md:w-96">
                <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;