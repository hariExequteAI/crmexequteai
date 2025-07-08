import React, { useState } from 'react';
import {
  Users, Plus, Search, Edit, Trash2, Shield,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { v4 as uuidv4 } from 'uuid';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  department?: string;
  isActive: boolean;
  lastLogin?: string;
}

export const UserManagement: React.FC = () => {
  // --- Dummy data ---
  const [users, setUsers] = useState<User[]>([
    {
      _id: uuidv4(),
      name: 'Alice Admin',
      email: 'alice@company.com',
      role: 'admin',
      department: 'IT',
      isActive: true,
      lastLogin: new Date(Date.now() - 3600_000 * 5).toISOString(), // 5h ago
    },
    {
      _id: uuidv4(),
      name: 'Bob Agent',
      email: 'bob@company.com',
      role: 'agent',
      department: 'Support',
      isActive: false,
      lastLogin: new Date(Date.now() - 3600_000 * 24).toISOString(), // 1d ago
    },
    {
      _id: uuidv4(),
      name: 'Carol Agent',
      email: 'carol@company.com',
      role: 'agent',
      department: 'Sales',
      isActive: true,
      lastLogin: new Date().toISOString(), // just now
    },
  ]);
  const [departments] = useState<string[]>([
    'IT',
    'Support',
    'Sales',
    'Marketing',
    'HR',
  ]);

  // --- UI state ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'agent'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'agent' as 'admin' | 'agent',
    department: '',
  });

  // --- Filters ---
  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term);
    const matchesRole = selectedRole === 'all' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // --- Local mutations ---
  const toggleUserStatus = (userId: string) => {
    setUsers(us =>
      us.map(u =>
        u._id === userId ? { ...u, isActive: !u.isActive } : u
      )
    );
  };

  const deleteUser = (userId: string) => {
    setUsers(us => us.filter(u => u._id !== userId));
  };

  const openAddUserModal = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', role: 'agent', department: '' });
    setModalOpen(true);
  };

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setForm({
      name: u.name,
      email: u.email,
      role: u.role,
      department: u.department || '',
    });
    setModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!form.name.trim() || !form.email.trim()) {
      alert('Name & Email are required');
      return;
    }

    if (editingUser) {
      // update existing
      setUsers(us =>
        us.map(u =>
          u._id === editingUser._id
            ? { ...u, ...form }
            : u
        )
      );
    } else {
      // add new
      setUsers(us => [
        ...us,
        {
          _id: uuidv4(),
          ...form,
          isActive: true,
          lastLogin: new Date().toISOString(),
        },
      ]);
    }

    setModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage users, roles, and permissions</p>
        </div>
        <Button icon={Plus} onClick={openAddUserModal}>Add User</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.isActive).length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-3xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Agents</p>
                <p className="text-3xl font-bold text-orange-600">
                  {users.filter(u => u.role === 'agent').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row gap-4">
          <Input
            icon={Search}
            placeholder="Search by name or email…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value as any)}
            className="border px-3 py-2 rounded-lg bg-white"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
          </select>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50 border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={u.role === 'admin' ? 'primary' : 'secondary'}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{u.department || '—'}</td>
                    <td className="py-3 px-4">
                      <Badge variant={u.isActive ? 'success' : 'danger'}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {u.lastLogin
                        ? new Date(u.lastLogin).toLocaleString()
                        : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          icon={Edit}
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(u)}
                          aria-label="Edit user"
                        />
                        <Button
                          icon={Shield}
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleUserStatus(u._id)}
                          aria-label="Toggle status"
                        />
                        <Button
                          icon={Trash2}
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Delete ${u.name}?`
                              )
                            ) {
                              deleteUser(u._id);
                            }
                          }}
                          aria-label="Delete user"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                disabled={!!editingUser}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  value={form.department}
                  onChange={e =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className="border w-full px-3 py-2 rounded-lg"
                >
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={e =>
                    setForm({
                      ...form,
                      role: e.target.value as 'admin' | 'agent',
                    })
                  }
                  className="border w-full px-3 py-2 rounded-lg"
                >
                  <option value="admin">Admin</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUser}>
                {editingUser ? 'Save Changes' : 'Create User'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
