import React, { useState } from 'react';
import { Search, Command } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UniversalSearch: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <div className="relative flex-1 max-w-2xl">
      <div className={`relative transition-all duration-200 ${isFocused ? 'transform scale-105' : ''}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search contacts, tickets, calls, or ask AI..."
          className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </div>
      </div>
      
      {isFocused && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-3">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Quick Actions
            </div>
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md">
                Create new ticket for "{searchQuery}"
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md">
                Add new contact "{searchQuery}"
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md">
                Ask AI about "{searchQuery}"
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};