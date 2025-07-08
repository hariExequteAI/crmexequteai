// src/components/shared/Layout.tsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Header } from './Header';
import { AIPanel } from './AIPanel';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Video, X as CloseIcon } from 'lucide-react';
import { Rnd } from 'react-rnd';

const defaultAgentNavItems = [
  { id: '1',  label: 'Notifications',    icon: 'Bell',           path: '/agent/notifications',  order: 1,  isVisible: true },
  { id: '2',  label: 'Dashboard',        icon: 'LayoutDashboard',path: '/agent/dashboard',      order: 2,  isVisible: true },
  { id: '3',  label: 'Calls',            icon: 'Phone',          path: '/agent/calls',          order: 3,  isVisible: true },
  { id: '4',  label: 'Tickets',          icon: 'Ticket',         path: '/agent/tickets',        order: 4,  isVisible: true },
  { id: '5',  label: 'Contacts',         icon: 'Users',          path: '/agent/contacts',       order: 5,  isVisible: true },
  { id: '6',  label: 'Tasks',            icon: 'CheckSquare',    path: '/agent/tasks',          order: 6,  isVisible: true },
  { id: '7',  label: 'Meetings',         icon: 'Calendar',       path: '/agent/meetings',       order: 7,  isVisible: true },
  { id: '8',  label: 'Knowledge Base',   icon: 'BookOpen',       path: '/agent/knowledge',      order: 8,  isVisible: true },
  { id: '9',  label: 'Settings',         icon: 'Settings',       path: '/agent/settings',       order: 9,  isVisible: true },
  { id: '10', label: 'Help',             icon: 'HelpCircle',     path: '/agent/help',           order: 10, isVisible: true },
];

const defaultAdminNavItems = [
  { id: '1',  label: 'Notifications',    icon: 'Bell',           path: '/admin/notifications',  order: 1,  isVisible: true },
  { id: '2',  label: 'Dashboard',        icon: 'LayoutDashboard',path: '/admin/dashboard',      order: 2,  isVisible: true },
  { id: '3',  label: 'User Management',  icon: 'Users',          path: '/admin/users',          order: 3,  isVisible: true },
  { id: '4',  label: 'Departments',      icon: 'Building',       path: '/admin/departments',    order: 4,  isVisible: true },
  { id: '5',  label: 'Tickets',          icon: 'Ticket',         path: '/admin/tickets',        order: 5,  isVisible: true },
  { id: '6',  label: 'Calls',            icon: 'Phone',          path: '/admin/calls',          order: 6,  isVisible: true },
  { id: '7',  label: 'Telephony',        icon: 'PhoneCall',      path: '/admin/telephony',      order: 7,  isVisible: true },
  { id: '8',  label: 'Reports',          icon: 'BarChart3',      path: '/admin/reports',        order: 8,  isVisible: true },
  { id: '9',  label: 'Knowledge Base',   icon: 'BookOpen',       path: '/admin/knowledge',      order: 9,  isVisible: true },
  { id: '10', label: 'Contacts',         icon: 'ContactRound',   path: '/admin/contacts',       order: 10, isVisible: true },
  { id: '11', label: 'Permissions',      icon: 'Shield',         path: '/admin/permissions',    order: 11, isVisible: true },
  { id: '12', label: 'Custom Fields',    icon: 'FormInput',      path: '/admin/custom-fields',  order: 12, isVisible: true },
  { id: '13', label: 'Audit Logs',       icon: 'FileText',       path: '/admin/audit',          order: 13, isVisible: true },
];

export const Layout: React.FC = () => {
  const { user } = useAuth();
  const { updateNavItems, isAIPanelOpen } = useApp();

  useEffect(() => {
    if (!user) return;
    const navItems = user.role === 'admin'
      ? defaultAdminNavItems
      : defaultAgentNavItems;

    updateNavItems(navItems);
  }, [user, updateNavItems]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${
            isAIPanelOpen ? 'mr-[70%]' : ''
          }`}
        >
          <Outlet />
        </main>
      </div>
      <AIPanel />
      <ZoomWidget />
    </div>
  );
};

const ZoomWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState({ width: 360, height: 460 });
  const [position, setPosition] = useState({
    x: window.innerWidth - 380,
    y: window.innerHeight - 480,
  });

  const toggle = () => setIsOpen(o => !o);

  if (!isOpen) {
    return (
      <div
        onClick={toggle}
        className="fixed bottom-5 right-5 w-12 h-12 rounded-full shadow-md bg-white flex items-center justify-center cursor-pointer z-50"
      >
        <Video size={24} />
      </div>
    );
  }

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={position}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, pos) => {
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        setPosition(pos);
      }}
      minWidth={300}
      minHeight={200}
      bounds="window"
      style={{
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        background: 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="flex items-center justify-end p-1 bg-gray-100">
        <button onClick={toggle} className="p-1 text-gray-600 hover:text-gray-800">
          <CloseIcon size={18} />
        </button>
      </div>
      <iframe
        src="https://zoom.us/cci/callbar/crm/?origin=https://app.konnectinsights.com"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-downloads"
        allow="autoplay;microphone;camera;display-capture;midi;encrypted-media;clipboard-write;"
        style={{ flex: 1, border: 0 }}
        title="Zoom Contact Center"
      />
    </Rnd>
  );
};
