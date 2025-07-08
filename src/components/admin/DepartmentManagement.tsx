import React, { useState } from 'react';
import {
  Building, Plus, Edit, Trash2, Users, Phone, Mail, RefreshCcw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface Department {
  _id: string;
  name: string;
  description: string;
  managerName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  userCount: number;
}

export const DepartmentManagement: React.FC = () => {
  // --- Dummy initial data ---
  const [departments, setDepartments] = useState<Department[]>([
    {
      _id: crypto.randomUUID(),
      name: 'Engineering',
      description: 'Builds and maintains the product.',
      managerName: 'Evan Engineer',
      email: 'eng-manager@company.com',
      phone: '+1 555-1234',
      isActive: true,
      createdAt: new Date(Date.now() - 86400_000 * 30).toISOString(), // 30 days ago
      userCount: 12,
    },
    {
      _id: crypto.randomUUID(),
      name: 'Customer Support',
      description: 'Handles customer inquiries and issues.',
      managerName: 'Sasha Support',
      email: 'support@company.com',
      phone: '+1 555-5678',
      isActive: true,
      createdAt: new Date(Date.now() - 86400_000 * 90).toISOString(), // 90 days ago
      userCount: 8,
    },
    {
      _id: crypto.randomUUID(),
      name: 'Marketing',
      description: 'Drives awareness and demand.',
      managerName: 'Maya Marketing',
      email: 'marketing@company.com',
      phone: '+1 555-9012',
      isActive: false,
      createdAt: new Date(Date.now() - 86400_000 * 120).toISOString(), // 120 days ago
      userCount: 5,
    },
  ]);

  // --- UI state ---
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Omit<Department, '_id' | 'createdAt' | 'userCount'>>({
    name: '',
    description: '',
    managerName: '',
    email: '',
    phone: '',
    isActive: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- Handlers (all local) ---
  const openAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm({
      name: '',
      description: '',
      managerName: '',
      email: '',
      phone: '',
      isActive: true,
    });
    setShowModal(true);
  };

  const openEdit = (dept: Department) => {
    setIsEditing(true);
    setEditingId(dept._id);
    setForm({
      name: dept.name,
      description: dept.description,
      managerName: dept.managerName,
      email: dept.email,
      phone: dept.phone,
      isActive: dept.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this department?')) {
      setDepartments(ds => ds.filter(d => d._id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setDepartments(ds =>
      ds.map(d =>
        d._id === id ? { ...d, isActive: !d.isActive } : d
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.managerName.trim()) {
      alert('Name & Manager are required');
      return;
    }

    if (isEditing && editingId) {
      // update
      setDepartments(ds =>
        ds.map(d =>
          d._id === editingId
            ? {
                ...d,
                ...form,
              }
            : d
        )
      );
    } else {
      // create new
      setDepartments(ds => [
        {
          _id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          userCount: 0,
          ...form,
        },
        ...ds,
      ]);
    }

    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Department Management
          </h1>
          <p className="text-gray-600">
            Organize teams and manage department structure
          </p>
        </div>
        <Button icon={Plus} onClick={openAdd}>
          Add Department
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Departments
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {departments.length}
                </p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {departments.reduce((sum, d) => sum + d.userCount, 0)}
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
                <p className="text-sm font-medium text-gray-600">
                  Active Departments
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {departments.filter(d => d.isActive).length}
                </p>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <Card key={dept._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span>{dept.name}</span>
                </CardTitle>
                <Badge variant={dept.isActive ? 'success' : 'destructive'}>
                  {dept.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{dept.description}</p>

                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" /> Manager: {dept.managerName}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" /> Users: {dept.userCount}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" /> {dept.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" /> {dept.phone}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xs text-gray-500">
                    Created {new Date(dept.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={RefreshCcw}
                      onClick={() => toggleStatus(dept._id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Edit}
                      onClick={() => openEdit(dept)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => handleDelete(dept._id)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? 'Edit Department' : 'Add Department'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {['name', 'description', 'managerName', 'email', 'phone'].map(field => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <Input
                    id={field}
                    value={(form as any)[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    required
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
