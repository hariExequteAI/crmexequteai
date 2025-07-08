import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Building,
  Tag,
  Calendar,
  Edit,
  Trash2,
  X,
  Eye
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Textarea } from '../ui/Textarea';

interface Department {
  _id: string;
  name: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  department: Department;
  createdAt: string;
  tags: string[];
  notes: string;
  createdBy: { _id: string; name: string; email: string };
  lastInteraction?: string;
}

export const ContactManagement: React.FC = () => {
  // ---- DUMMY DEPARTMENTS ----
  const [departments] = useState<Department[]>([
    { _id: 'd1', name: 'Sales' },
    { _id: 'd2', name: 'Support' },
    { _id: 'd3', name: 'Engineering' },
  ]);

  // ---- DUMMY CONTACTS ----
  const [contacts, setContacts] = useState<Contact[]>([
    {
      _id: 'c1',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '+1-555-0123',
      company: 'Acme Corp',
      department: departments[0],
      createdAt: '2024-01-15T10:30:00Z',
      tags: ['VIP', 'Lead'],
      notes: 'Key decision maker. Prefers email.',
      createdBy: { _id: 'u1', name: 'Admin', email: 'admin@example.com' },
      lastInteraction: '2024-02-05T14:20:00Z'
    },
    {
      _id: 'c2',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      phone: '+1-555-0456',
      company: 'Globex Inc',
      department: departments[1],
      createdAt: '2024-02-01T09:15:00Z',
      tags: ['Lead'],
      notes: 'Requested a product demo.',
      createdBy: { _id: 'u2', name: 'Support', email: 'support@example.com' },
      lastInteraction: '2024-02-10T11:00:00Z'
    },
    {
      _id: 'c3',
      name: 'Carol Davis',
      email: 'carol.davis@example.com',
      phone: '+1-555-0789',
      company: 'Initech',
      department: departments[2],
      createdAt: '2023-12-20T16:45:00Z',
      tags: ['Customer'],
      notes: 'Frequently calls for technical questions.',
      createdBy: { _id: 'u3', name: 'Engineer', email: 'eng@example.com' },
      lastInteraction: '2024-01-30T08:00:00Z'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    department: '',
    tags: '',
    notes: ''
  });

  const handleDelete = (contactId: string) => {
    setContacts(contacts.filter(c => c._id !== contactId));
  };

  const handleCreateOrUpdate = () => {
    const payload: Contact = {
      _id: editingContactId || `c${Math.random()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      department: departments.find(d => d._id === formData.department)!,
      createdAt: editingContactId
        ? contacts.find(c => c._id === editingContactId)!.createdAt
        : new Date().toISOString(),
      tags: formData.tags.split(',').map(t => t.trim()),
      notes: formData.notes,
      createdBy: { _id: 'u0', name: 'You', email: 'you@example.com' },
      lastInteraction: new Date().toISOString(),
    };

    if (editingContactId) {
      setContacts(contacts.map(c => c._id === editingContactId ? payload : c));
    } else {
      setContacts([payload, ...contacts]);
    }

    setShowModal(false);
    setEditingContactId(null);
    setFormData({ name: '', email: '', phone: '', company: '', department: '', tags: '', notes: '' });
  };

  const handleEdit = (contact: Contact) => {
    setEditingContactId(contact._id);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      department: contact.department._id,
      tags: contact.tags.join(', '),
      notes: contact.notes
    });
    setShowModal(true);
  };

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };

  const filteredContacts = contacts.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.company.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
          <p className="text-gray-600">Manage customer contacts</p>
        </div>
        <Button
          icon={Plus}
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add Contact
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-gray-500">Total Contacts</p>
            <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-gray-500">VIP</p>
            <p className="text-2xl font-bold text-gray-900">
              {contacts.filter(c => c.tags.includes('VIP')).length}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-gray-500">Leads</p>
            <p className="text-2xl font-bold text-gray-900">
              {contacts.filter(c => c.tags.includes('Lead')).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Input
            icon={Search}
            placeholder="Search contacts by name, email, or company..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingContactId(null); }}>
        <div className="p-6 space-y-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              {editingContactId ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <Button variant="ghost" size="sm" icon={X} onClick={() => { setShowModal(false); setEditingContactId(null); }} />
          </div>

          <Input
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <Input
            placeholder="Phone"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <Input
            placeholder="Company"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={formData.department}
            onChange={e => setFormData({ ...formData, department: e.target.value })}
          >
            <option value="">Select Department</option>
            {departments.map(dep => (
              <option key={dep._id} value={dep._id}>{dep.name}</option>
            ))}
          </select>
          <Input
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <Textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <Button
            onClick={handleCreateOrUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            {editingContactId ? 'Update' : 'Create'} Contact
          </Button>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)}>
        <div className="p-6 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
          {selectedContact && (
            <div className="space-y-4 text-gray-700">
              <p><strong>Name:</strong> {selectedContact.name}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Phone:</strong> {selectedContact.phone}</p>
              <p><strong>Company:</strong> {selectedContact.company}</p>
              <p><strong>Department:</strong> {selectedContact.department.name}</p>
              <p><strong>Tags:</strong> {selectedContact.tags.join(', ')}</p>
              <p><strong>Notes:</strong> {selectedContact.notes}</p>
              <p><strong>Created At:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
              <p><strong>Created By:</strong> {selectedContact.createdBy.name} ({selectedContact.createdBy.email})</p>
              <p><strong>Last Interaction:</strong> {selectedContact.lastInteraction || 'N/A'}</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContacts.map(contact => (
          <Card key={contact._id} className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-blue-600">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{contact.name}</h3>
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">{contact.company}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => handleViewDetails(contact)}
                    className="text-gray-600 hover:text-gray-900"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-600 hover:text-red-900"
                  />
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 truncate max-w-[240px]">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 truncate max-w-[240px]">{contact.department.name}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1 mt-3">
                {contact.tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant={tag === 'VIP' ? 'primary' : 'secondary'}
                    size="sm"
                    className="bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Created: {new Date(contact.createdAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Phone}
                    onClick={() => window.open(`tel:${contact.phone}`)}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Mail}
                    onClick={() => window.open(`mailto:${contact.email}`)}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Edit}
                    onClick={() => handleEdit(contact)}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
