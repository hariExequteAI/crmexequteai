import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavItem, AIMessage, KnowledgeItem } from '../types';

interface AppContextType {
  navItems: NavItem[];
  updateNavItems: (items: NavItem[]) => void;
  isAIPanelOpen: boolean;
  toggleAIPanel: () => void;
  aiMessages: AIMessage[];
  addAIMessage: (message: AIMessage) => void;
  knowledgeBase: KnowledgeItem[];
  addKnowledgeItem: (item: KnowledgeItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const defaultAgentNavItems: NavItem[] = [
  { id: '1', label: 'Notifications', icon: 'Bell', path: '/agent/notifications', order: 1, isVisible: true },
  { id: '2', label: 'Dashboard', icon: 'LayoutDashboard', path: '/agent/dashboard', order: 2, isVisible: true },
  { id: '3', label: 'Calls', icon: 'Phone', path: '/agent/calls', order: 3, isVisible: true },
  { id: '4', label: 'Tickets', icon: 'Ticket', path: '/agent/tickets', order: 4, isVisible: true },
  { id: '5', label: 'Contacts', icon: 'Users', path: '/agent/contacts', order: 5, isVisible: true },
  { id: '6', label: 'Tasks', icon: 'CheckSquare', path: '/agent/tasks', order: 6, isVisible: true },
  { id: '7', label: 'Meetings', icon: 'Calendar', path: '/agent/meetings', order: 7, isVisible: true },
  { id: '8', label: 'Knowledge Base', icon: 'BookOpen', path: '/agent/knowledge', order: 8, isVisible: true },
  { id: '9', label: 'Settings', icon: 'Settings', path: '/agent/settings', order: 9, isVisible: true },
  { id: '10', label: 'Help', icon: 'HelpCircle', path: '/agent/help', order: 10, isVisible: true },
];

const defaultAdminNavItems: NavItem[] = [
  { id: '1', label: 'Notifications', icon: 'Bell', path: '/admin/notifications', order: 1, isVisible: true },
  { id: '2', label: 'Dashboard', icon: 'LayoutDashboard', path: '/admin/dashboard', order: 2, isVisible: true },
  { id: '3', label: 'User Management', icon: 'Users', path: '/admin/users', order: 3, isVisible: true },
  { id: '4', label: 'Departments', icon: 'Building', path: '/admin/departments', order: 4, isVisible: true },
  { id: '5', label: 'Tickets', icon: 'Ticket', path: '/admin/tickets', order: 5, isVisible: true },
  { id: '6', label: 'Calls', icon: 'Phone', path: '/admin/calls', order: 6, isVisible: true },
  { id: '7', label: 'Telephony', icon: 'PhoneCall', path: '/admin/telephony', order: 7, isVisible: true },
  { id: '8', label: 'Reports', icon: 'BarChart3', path: '/admin/reports', order: 8, isVisible: true },
  { id: '9', label: 'Knowledge Base', icon: 'BookOpen', path: '/admin/knowledge', order: 9, isVisible: true },
  { id: '10', label: 'Contacts', icon: 'ContactRound', path: '/admin/contacts', order: 10, isVisible: true },
  { id: '11', label: 'Permissions', icon: 'Shield', path: '/admin/permissions', order: 11, isVisible: true },
  { id: '12', label: 'Custom Fields', icon: 'FormInput', path: '/admin/custom-fields', order: 12, isVisible: true },
  { id: '13', label: 'Audit Logs', icon: 'FileText', path: '/admin/audit', order: 13, isVisible: true },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navItems, setNavItems] = useState<NavItem[]>(defaultAgentNavItems);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [aiMessages, setAIMessages] = useState<AIMessage[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const updateNavItems = (items: NavItem[]) => {
    setNavItems(items);
  };

  const toggleAIPanel = () => {
    setIsAIPanelOpen(!isAIPanelOpen);
  };

  const addAIMessage = (message: AIMessage) => {
    setAIMessages(prev => [...prev, message]);
  };

  const addKnowledgeItem = (item: KnowledgeItem) => {
    setKnowledgeBase(prev => [...prev, item]);
  };

  const value: AppContextType = {
    navItems,
    updateNavItems,
    isAIPanelOpen,
    toggleAIPanel,
    aiMessages,
    addAIMessage,
    knowledgeBase,
    addKnowledgeItem,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};