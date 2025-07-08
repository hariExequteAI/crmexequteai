import React from 'react';
import { Bell, MessageSquare, ChevronDown } from 'lucide-react';
import { UniversalSearch } from './UniversalSearch';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const { toggleAIPanel } = useApp();

  // Safely derive initials (fall back to email if name is missing)
  const displayName = user?.name || user?.email || '';
  const initials = displayName
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .join('')
    .toUpperCase();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      {/* Left: search */}
      <div className="flex items-center space-x-4 flex-1">
        <UniversalSearch />
      </div>

      {/* Right: icons + user */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" icon={Bell} className="relative">
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* AI Assistant toggle */}
        <Button
          variant="ghost"
          size="sm"
          icon={MessageSquare}
          onClick={toggleAIPanel}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
        >
          AI Assistant
        </Button>

        {/* User menu */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {initials}
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={ChevronDown}
            onClick={logout}
          />
        </div>
      </div>
    </header>
  );
};
