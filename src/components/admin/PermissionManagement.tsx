import React, { useState } from 'react';
import { Shield, Plus, Edit, Trash2, CheckSquare, XSquare, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface Page {
  id: string;
  name: string;
}

export const PermissionManagement: React.FC = () => {
  const pages: Page[] = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'settings', name: 'Settings' },
    { id: 'user-management', name: 'User Management' },
    { id: 'content-management', name: 'Content Management' },
    { id: 'reports', name: 'Reports' },
  ];

  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Admin',
      description: 'Full access to everything.',
      permissions: pages.map(p => p.id),
    },
    {
      id: '2',
      name: 'Editor',
      description: 'Manage content, no settings.',
      permissions: ['dashboard','content-management','reports'],
    },
    {
      id: '3',
      name: 'Viewer',
      description: 'Read-only access.',
      permissions: ['dashboard','reports'],
    },
  ]);

  // For the dummy "Add Role" modal
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const handleTogglePermission = (roleId: string, perm: string) => {
    setRoles(r =>
      r.map(role =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.includes(perm)
                ? role.permissions.filter(p => p !== perm)
                : [...role.permissions, perm],
            }
          : role
      )
    );
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(r => r.filter(role => role.id !== roleId));
  };

  const handleAddRole = () => {
    if (!newRole.name.trim()) {
      alert('Please enter a role name.');
      return;
    }
    const id = Date.now().toString();
    setRoles(r => [
      ...r,
      { id, name: newRole.name.trim(), description: newRole.description.trim(), permissions: [] },
    ]);
    setNewRole({ name: '', description: '' });
    setAddModalOpen(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Permission Management</h1>
        </div>
        <Button
          icon={Plus}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setAddModalOpen(true)}
        >
          Add Role
        </Button>
      </div>

      {/* Roles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map(role => (
          <Card
            key={role.id}
            className="border hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden"
          >
            <CardHeader className="flex justify-between items-center bg-gray-50 p-4">
              <CardTitle className="text-lg">{role.name}</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" icon={Edit} />
                <Button
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  onClick={() => handleDeleteRole(role.id)}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-4 p-4">
              <p className="text-sm text-gray-600">{role.description}</p>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {pages.map(page => {
                    const active = role.permissions.includes(page.id);
                    return (
                      <Button
                        key={page.id}
                        size="sm"
                        variant={active ? 'primary' : 'outline'}
                        icon={active ? CheckSquare : XSquare}
                        onClick={() => handleTogglePermission(role.id, page.id)}
                        className="flex items-center space-x-1 whitespace-nowrap"
                      >
                        <span>{page.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Role Modal */}
      {isAddModalOpen && (
        <Modal isOpen onClose={() => setAddModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add New Role</h2>
              <button onClick={() => setAddModalOpen(false)}>
                <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <Input
              placeholder="Role name"
              value={newRole.name}
              onChange={e => setNewRole(n => ({ ...n, name: e.target.value }))}
            />
            <Input
              placeholder="Role description"
              value={newRole.description}
              onChange={e => setNewRole(n => ({ ...n, description: e.target.value }))}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRole} className="bg-blue-600 hover:bg-blue-700 text-white">
                Create
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
