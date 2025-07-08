import React, { useState } from 'react';
import {
  Bell, Volume2, Pin, PinOff, Check, EyeOff, MoreVertical
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  pinned: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Ticket Assigned',
    message: 'You have been assigned to ticket #45231.',
    timestamp: '2025-06-26T09:00:00Z',
    read: false,
    pinned: false
  },
  {
    id: '2',
    title: 'Reminder: SLA Breach Imminent',
    message: 'Ticket #45100 will breach SLA in 2 hours.',
    timestamp: '2025-06-25T18:30:00Z',
    read: true,
    pinned: true
  },
  {
    id: '3',
    title: 'System Update',
    message: 'System maintenance scheduled for tonight.',
    timestamp: '2025-06-24T14:00:00Z',
    read: true,
    pinned: false
  }
];

export const NotificationPage: React.FC = () => {
  const [desktopEnabled, setDesktopEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const toggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: !n.read } : n)
    );
  };

  const togglePin = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n)
    );
  };

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.pinned === b.pinned) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return a.pinned ? -1 : 1;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
          <p className="text-gray-600">Enable or disable desktop and sound notifications.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-medium flex items-center gap-2">
              <Bell className="w-4 h-4" /> Desktop Notifications
            </span>
            <input
              type="checkbox"
              checked={desktopEnabled}
              onChange={(e) => setDesktopEnabled(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-medium flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> Sound Notifications
            </span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h2>
        <div className="space-y-4">
          {sortedNotifications.map(notification => (
            <Card key={notification.id} hover>
              <CardContent className="p-4 flex justify-between items-start space-x-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-900 font-medium flex items-center gap-2">
                      {notification.title}
                      {notification.pinned && <Badge variant="outline">Pinned</Badge>}
                      {!notification.read && <Badge variant="default">New</Badge>}
                    </div>
                    <span className="text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="text-gray-700 text-sm">{notification.message}</div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={notification.read ? EyeOff : Check}
                    onClick={() => toggleRead(notification.id)}
                  >
                    {notification.read ? 'Mark Unread' : 'Mark Read'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={notification.pinned ? PinOff : Pin}
                    onClick={() => togglePin(notification.id)}
                  >
                    {notification.pinned ? 'Unpin' : 'Pin'}
                  </Button>
                  <Button size="sm" variant="outline" icon={MoreVertical} />
                </div>
              </CardContent>
            </Card>
          ))}
          {notifications.length === 0 && (
            <p className="text-gray-500 text-sm text-center">No notifications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
