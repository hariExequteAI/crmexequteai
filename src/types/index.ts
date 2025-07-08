export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  department?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  department?: string;
  lastInteraction?: Date;
  owner?: string;
  tags: string[];
  notes: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  contactId?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
  comments: Comment[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  dueDate: Date;
  createdAt: Date;
  linkedTicket?: string;
  linkedContact?: string;
}

export interface Call {
  id: string;
  contactId?: string;
  contactName: string;
  contactNumber: string;
  direction: 'inbound' | 'outbound';
  status: 'active' | 'ended' | 'missed';
  duration?: number;
  startTime: Date;
  endTime?: Date;
  notes: string;
  disposition?: string;
  recordingUrl?: string;
  agent: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  contactId?: string;
  ticketId?: string;
  meetingUrl?: string;
  notes: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  attachments?: string[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  order: number;
  isVisible: boolean;
}

export interface AIMessage {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  attachments?: string[];
  references?: string[];
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: 'document' | 'link' | 'response';
  tags: string[];
  rating: number;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}