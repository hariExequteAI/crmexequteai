import { useState, useEffect } from 'react';
import { Contact, Ticket, Task, Call, Meeting } from '../types';

export const useMockData = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    // Mock data initialization
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1-555-0123',
        company: 'Tech Corp',
        department: 'Engineering',
        lastInteraction: new Date(2024, 0, 15),
        owner: 'Sarah Agent',
        tags: ['VIP', 'Enterprise'],
        notes: 'Important client, requires immediate attention'
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        phone: '+1-555-0124',
        company: 'Business Solutions',
        department: 'Sales',
        lastInteraction: new Date(2024, 0, 10),
        owner: 'Sarah Agent',
        tags: ['Lead', 'Prospect'],
        notes: 'Interested in enterprise package'
      }
    ];

    const mockTickets: Ticket[] = [
      {
        id: '1',
        title: 'System Integration Issue',
        description: 'Customer experiencing API connection problems',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Sarah Agent',
        contactId: '1',
        createdAt: new Date(2024, 0, 12),
        updatedAt: new Date(2024, 0, 14),
        dueDate: new Date(2024, 0, 20),
        tags: ['API', 'Integration'],
        comments: [
          {
            id: '1',
            content: 'Initial investigation completed',
            author: 'Sarah Agent',
            createdAt: new Date(2024, 0, 13)
          }
        ]
      }
    ];

    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Follow up with Alice Johnson',
        description: 'Schedule technical demo for next week',
        status: 'todo',
        priority: 'high',
        assignedTo: 'Sarah Agent',
        dueDate: new Date(2024, 0, 18),
        createdAt: new Date(2024, 0, 15),
        linkedContact: '1'
      }
    ];

    const mockCalls: Call[] = [
      {
        id: '1',
        contactId: '1',
        contactName: 'Alice Johnson',
        contactNumber: '+1-555-0123',
        direction: 'inbound',
        status: 'ended',
        duration: 15,
        startTime: new Date(2024, 0, 15, 10, 30),
        endTime: new Date(2024, 0, 15, 10, 45),
        notes: 'Discussed integration requirements',
        disposition: 'Resolved',
        agent: 'Sarah Agent'
      }
    ];

    const mockMeetings: Meeting[] = [
      {
        id: '1',
        title: 'Technical Review with Alice Johnson',
        description: 'Review integration requirements and timeline',
        startTime: new Date(2024, 0, 18, 14, 0),
        endTime: new Date(2024, 0, 18, 15, 0),
        attendees: ['Sarah Agent', 'Alice Johnson'],
        contactId: '1',
        notes: ''
      }
    ];

    setContacts(mockContacts);
    setTickets(mockTickets);
    setTasks(mockTasks);
    setCalls(mockCalls);
    setMeetings(mockMeetings);
  }, []);

  return {
    contacts,
    tickets,
    tasks,
    calls,
    meetings,
    setContacts,
    setTickets,
    setTasks,
    setCalls,
    setMeetings
  };
};