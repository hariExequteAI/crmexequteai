import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, Building, Tag, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Contact } from '../../types';

export const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@techcorp.com',
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
      email: 'bob@business.com',
      phone: '+1-555-0124',
      company: 'Business Solutions',
      department: 'Sales',
      lastInteraction: new Date(2024, 0, 10),
      owner: 'Sarah Agent',
      tags: ['Lead', 'Prospect'],
      notes: 'Interested in enterprise package'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@startup.io',
      phone: '+1-555-0125',
      company: 'Startup Inc',
      department: 'Marketing',
      lastInteraction: new Date(2024, 0, 8),
      owner: 'Sarah Agent',
      tags: ['New'],
      notes: 'Recently signed up for trial'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your customer contacts</p>
        </div>
        <Button icon={Plus}>Add Contact</Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VIP Contacts</p>
                <p className="text-3xl font-bold text-purple-600">
                  {contacts.filter(c => c.tags.includes('VIP')).length}
                </p>
              </div>
              <Tag className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Leads</p>
                <p className="text-3xl font-bold text-green-600">
                  {contacts.filter(c => c.tags.includes('Lead')).length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                <p className="text-3xl font-bold text-orange-600">5</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <Input
            icon={Search}
            placeholder="Search contacts by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} hover>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-blue-600">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.company}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">•••</Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{contact.department}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                {contact.tags.map((tag, index) => (
                  <Badge key={index} variant={tag === 'VIP' ? 'primary' : 'secondary'} size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Last contact: {contact.lastInteraction?.toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" icon={Phone} />
                  <Button variant="outline" size="sm" icon={Mail} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};