import React from 'react';
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Search,
  X,
  Settings,
  ChevronDown,
  LayoutList
} from 'lucide-react';
import { NavigationItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const navigation = [
    { 
      section: 'Manage',
      items: [
        { name: 'Home', icon: Home, current: false, onClick: () => onNavigate('/home') },
        { name: 'Programs', icon: FileText, current: false, onClick: () => onNavigate('/programs') },
        { name: 'Events', icon: Calendar, current: true, onClick: () => onNavigate('/events') },
        { name: 'Memberships', icon: Users, current: false, onClick: () => onNavigate('/memberships') },
        { name: 'Documents', icon: FileText, current: false, onClick: () => onNavigate('/documents') },
      ]
    },
    {
      section: 'Members',
      items: [
        { name: 'Payments', icon: CreditCard, current: false, onClick: () => onNavigate('/payments') },
      ]
    },
    {
      section: 'Engage',
      items: [
        { name: 'People', icon: Users, current: false, onClick: () => onNavigate('/people') },
        { name: 'Communication', icon: MessageSquare, current: false, onClick: () => onNavigate('/communication') },
      ]
    },
    {
      section: 'More',
      items: [
        { 
          name: 'Notifications', 
          icon: Bell, 
          current: false, 
          badge: 2, 
          onClick: () => onNavigate('/notifications') 
        },
        { 
          name: 'Search', 
          icon: Search, 
          current: false, 
          shortcut: 'K', 
          listIcon: LayoutList,
          onClick: () => onNavigate('/search')
        },
      ]
    }
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-purple-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center mx-4 rounded-lg mb-4 bg-purple-50 md:bg-white shadow-none md:shadow justify-between mt-4 p-2 md:justify-start">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">K</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">KarateStudio</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 md:hidden"
            >
              <X className="h-8 w-8 bg-white rounded" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3">
            {navigation.map((group, groupIdx) => (
              <div key={group.section} className={groupIdx > 0 ? 'mt-8' : ''}>
                <h3 className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {group.section}
                </h3>
                <div className="">
                  {group.items.map((item: NavigationItem) => (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className={`
                        group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg w-full
                        ${item.current
                          ? 'bg-purple-50 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className="flex font-normal items-center">
                        <item.icon
                          className={`
                            mr-3 flex-shrink-0 h-5 w-5
                            ${item.current ? 'text-purple-700' : 'text-gray-400 group-hover:text-gray-500'}
                          `}
                        />
                        {item.name}
                      </div>
                      {item.badge && (
                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                          {item.badge}
                        </span>
                      )}
                      {item.listIcon && (
                        <item.listIcon
                          className={`
                            ml-3 flex-shrink-0 h-5 w-5
                            ${item.current ? 'text-purple-700' : 'text-gray-400 group-hover:text-gray-500'}
                          `}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <button 
              className="flex items-center justify-between w-full group"
              onClick={() => onNavigate('/profile')}
            >
              <div className="flex items-center min-w-0">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                  alt="User"
                />
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">Elijah Scott</p>
                  <p className="text-xs text-gray-500 truncate">scott@hey.com</p>
                </div>
              </div>
              <Settings className="ml-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;