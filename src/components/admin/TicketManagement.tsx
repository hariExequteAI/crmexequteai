import React, { FC, useState } from 'react';
import {
  Ticket as TicketIcon,
  Search,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle,
  User as UserIcon,
  Trash2,
  Edit
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

// Define the shape of a ticket
type TicketType = {
  _id: string;
  name: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  due?: string;
  department?: string;
  assignedTo?: string;
  tags?: string[];
  createdAt: string;
};

// Dummy user & department types
type User = { _id: string; name: string };
type Department = { _id: string; name: string };

export const TicketManagement: FC = () => {
  // --- Dummy initial data ---
  const [tickets, setTickets] = useState<TicketType[]>([
    {
      _id: crypto.randomUUID(),
      name: 'Login issue',
      description: 'User reports they cannot log in with correct credentials.',
      status: 'open',
      priority: 'high',
      due: new Date(Date.now() + 3600_000 * 24).toISOString(), // tomorrow
      department: 'Support',
      assignedTo: '',
      tags: ['login', 'urgent'],
      createdAt: new Date(Date.now() - 3600_000 * 2).toISOString(), // 2h ago
    },
    {
      _id: crypto.randomUUID(),
      name: 'Payment gateway error',
      description: 'Transactions failing intermittently at checkout.',
      status: 'in-progress',
      priority: 'urgent',
      due: new Date(Date.now() + 3600_000 * 48).toISOString(), // in 2 days
      department: 'Billing',
      assignedTo: '',
      tags: ['payment'],
      createdAt: new Date(Date.now() - 3600_000 * 24 * 3).toISOString(), // 3 days ago
    },
    {
      _id: crypto.randomUUID(),
      name: 'UI polish: header',
      description: 'Adjust header spacing and mobile responsiveness.',
      status: 'resolved',
      priority: 'low',
      createdAt: new Date(Date.now() - 3600_000 * 24 * 7).toISOString(), // 1 week ago
      tags: ['ui'],
      department: 'Engineering',
      assignedTo: '',
    },
  ]);
  const [users] = useState<User[]>([
    { _id: 'u1', name: 'Alice Admin' },
    { _id: 'u2', name: 'Bob Agent' },
  ]);
  const [departments] = useState<Department[]>([
    { _id: 'd1', name: 'Support' },
    { _id: 'd2', name: 'Billing' },
    { _id: 'd3', name: 'Engineering' },
  ]);

  // --- UI state ---
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TicketType | null>(null);
  const [form, setForm] = useState<Partial<TicketType & { tagInput: string }>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all'|'open'|'in-progress'|'resolved'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all'|'urgent'|'high'|'medium'|'low'>('all');

  // --- Helpers ---
  const priorityStyle = (p: string) =>
    p === 'urgent' ? 'danger' :
    p === 'high'   ? 'warning' :
    p === 'medium' ? 'primary' :
                    'secondary';

  const getStatusIcon = (status: string) =>
    status === 'open'         ? <Clock /> :
    status === 'in-progress'  ? <AlertTriangle /> :
    status === 'resolved'     ? <CheckCircle /> :
                                <TicketIcon />;

  const filtered = tickets.filter(t => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term);
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // --- Modal handlers ---
  const openModal = (ticket?: TicketType) => {
    setEditing(ticket || null);
    setForm({
      ...ticket,
      tagInput: ticket?.tags?.join(', ') || ''
    });
    setShowModal(true);
  };
  const closeModal = () => {
    setEditing(null);
    setForm({});
    setShowModal(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = form.tagInput?.split(',').map(s => s.trim()).filter(Boolean);
    const payload: Partial<TicketType> = {
      name: form.name!,
      description: form.description!,
      status: form.status as any,
      priority: form.priority as any,
      due: form.due,
      department: form.department,
      assignedTo: form.assignedTo,
      tags,
    };

    if (editing?._id) {
      // Update existing
      setTickets(ts =>
        ts.map(t =>
          t._id === editing._id
            ? { ...t, ...payload }
            : t
        )
      );
    } else {
      // Create new
      setTickets(ts => [
        {
          _id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ...payload
        } as TicketType,
        ...ts
      ]);
    }

    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this ticket?')) {
      setTickets(ts => ts.filter(t => t._id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Ticket Management</h1>
          <p className="text-gray-600">Monitor and manage customer tickets</p>
        </div>
        <Button icon={Plus} onClick={() => openModal()}>
          Create Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total', icon: <TicketIcon />, count: tickets.length },
          { label: 'Open', icon: <Clock />, count: tickets.filter(t => t.status === 'open').length },
          { label: 'In-Progress', icon: <AlertTriangle />, count: tickets.filter(t => t.status === 'in-progress').length },
          { label: 'Resolved', icon: <CheckCircle />, count: tickets.filter(t => t.status === 'resolved').length },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.count}</p>
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6 flex gap-4">
          <Input
            icon={Search}
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value as any)}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </CardContent>
      </Card>

      {/* Ticket List */}
      <div className="space-y-4">
        {filtered.map(t => (
          <Card key={t._id}>
            <CardContent className="p-6 flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(t.status)}
                  <h3 className="font-semibold">{t.name}</h3>
                  <Badge variant={priorityStyle(t.priority)}>{t.priority}</Badge>
                  <Badge variant="default">{t.status}</Badge>
                </div>
                <p className="text-gray-600 mt-1">{t.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <UserIcon />
                    <span>
                      Assigned to:{' '}
                      {users.find(u => u._id === t.assignedTo)?.name || 'Unassigned'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock />
                    <span>Due: {t.due ? new Date(t.due).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <span>Created: {new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {t.tags?.map((tag, i) => (
                    <Badge key={`tag-${t._id}-${i}`} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Edit}
                  onClick={() => openModal(t)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  onClick={() => handleDelete(t._id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editing ? 'Edit Ticket' : 'Create Ticket'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 text-xl">
                &times;
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Title */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Title</label>
                <Input
                  type="text"
                  value={form.name || ''}
                  required
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={form.description || ''}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  required
                  className="border p-2 rounded"
                />
              </div>

              {/* Status & Priority */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={form.status || ''}
                    required
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="border p-2 rounded"
                  >
                    <option value="" disabled>Select Status</option>
                    {['open', 'in-progress', 'resolved'].map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    value={form.priority || ''}
                    required
                    onChange={e => setForm({ ...form, priority: e.target.value })}
                    className="border p-2 rounded"
                  >
                    <option value="" disabled>Select Priority</option>
                    {['urgent', 'high', 'medium', 'low'].map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Due & AssignedTo */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                  <label className="text-sm font-medium">Due</label>
                  <Input
                    type="date"
                    value={form.due?.slice(0,10) || ''}
                    onChange={e => setForm({ ...form, due: e.target.value })}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-sm font-medium">Assign To</label>
                  <select
                    value={form.assignedTo || ''}
                    onChange={e => setForm({ ...form, assignedTo: e.target.value })}
                    className="border p-2 rounded"
                  >
                    <option value="">Unassigned</option>
                    {users.map(u => (
                      <option key={u._id} value={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Department */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">Department</label>
                <select
                  value={form.department || ''}
                  onChange={e => setForm({ ...form, department: e.target.value })}
                  className="border p-2 rounded"
                >
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d._id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="flex flex-col">
                <label className="text-sm font-medium">
                  Tags (comma-separated)
                </label>
                <Input
                  value={form.tagInput || ''}
                  onChange={e => setForm({ ...form, tagInput: e.target.value })}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editing ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
