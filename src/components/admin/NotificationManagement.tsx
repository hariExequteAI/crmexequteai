import React, { useState } from 'react';
import {
  Bell, Trash2, CheckCircle, XCircle, Info, AlertTriangle, Filter
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';

type NotificationType = 'info' | 'warning' | 'error' | 'success';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
  read: boolean;
}

export const NotificationManagement: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on June 30 at 12:00 AM UTC.',
      type: 'info',
      createdAt: new Date(2024, 5, 20),
      read: false,
    },
    {
      id: 'n2',
      title: 'High Memory Usage',
      message: 'Server node-7 is using over 90% memory.',
      type: 'warning',
      createdAt: new Date(2024, 5, 21),
      read: false,
    },
    {
      id: 'n3',
      title: 'Database Connection Failed',
      message: 'Could not connect to the database at 03:00 UTC.',
      type: 'error',
      createdAt: new Date(2024, 5, 22),
      read: true,
    },
    {
      id: 'n4',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully.',
      type: 'success',
      createdAt: new Date(2024, 5, 23),
      read: true,
    },
  ]);

  const [filterType, setFilterType] = useState<'all' | NotificationType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = notifications.filter((n) => {
    const matchesType = filterType === 'all' || n.type === filterType;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getBadgeVariant = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return 'default';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      case 'success':
        return 'success';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
          <p className="text-gray-600">Monitor and manage system-wide notifications</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <Input
            icon={Filter}
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="success">Success</option>
          </select>
        </CardContent>
      </Card>

      {/* Notification List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <p className="text-gray-500">No notifications found.</p>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} hover>
              <CardContent className="p-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getIcon(notification.type)}
                    <span className="font-medium text-gray-900">{notification.title}</span>
                    <Badge variant={getBadgeVariant(notification.type)}>
                      {notification.type}
                    </Badge>
                    {!notification.read && (
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        Unread
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.createdAt.toLocaleDateString()} {notification.createdAt.toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex space-x-2">
                  {!notification.read && (
                    <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    icon={Trash2}
                    onClick={() => deleteNotification(notification.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
