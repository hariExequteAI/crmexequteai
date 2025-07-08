import React, { useState } from 'react';
import {
  Search, Eye, Download, Upload, Filter, Info, Trash2, MoreVertical
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: 'Created' | 'Edited' | 'Deleted' | 'Viewed';
  target: string;
  details?: string;
}

const mockLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2025-06-30T08:15:00Z',
    user: 'admin@example.com',
    action: 'Created',
    target: 'User: jane.doe@example.com',
    details: 'Added new user with role Editor'
  },
  {
    id: '2',
    timestamp: '2025-06-29T14:45:00Z',
    user: 'system@example.com',
    action: 'Viewed',
    target: 'Report: Quarterly Sales Q2 2025'
  },
  {
    id: '3',
    timestamp: '2025-06-28T11:20:00Z',
    user: 'john.smith@example.com',
    action: 'Edited',
    target: 'Permission: Editor',
    details: 'Added permission "reports"'
  },
  {
    id: '4',
    timestamp: '2025-06-27T16:05:00Z',
    user: 'jane.doe@example.com',
    action: 'Deleted',
    target: 'Ticket: #TCK-1024'
  },
  {
    id: '5',
    timestamp: '2025-06-26T09:30:00Z',
    user: 'support@example.com',
    action: 'Created',
    target: 'Call Log: Call #C-5501',
    details: 'Inbound call from +1-555-1234'
  },
  {
    id: '6',
    timestamp: '2025-06-25T18:50:00Z',
    user: 'admin@example.com',
    action: 'Edited',
    target: 'Custom Field: Department',
    details: 'Changed options to "HR, IT, Sales, Marketing"'
  },
  {
    id: '7',
    timestamp: '2025-06-24T12:10:00Z',
    user: 'system@example.com',
    action: 'Viewed',
    target: 'Dashboard: Admin Overview'
  },
  {
    id: '8',
    timestamp: '2025-06-23T07:45:00Z',
    user: 'john.smith@example.com',
    action: 'Deleted',
    target: 'Knowledge Article: "How to reset password"'
  }
];

export const AuditLogManagement: React.FC = () => {
  const [logs] = useState<AuditLog[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const actionColor = (action: AuditLog['action']) => {
    switch (action) {
      case 'Created': return 'green';
      case 'Edited':  return 'blue';
      case 'Deleted': return 'red';
      case 'Viewed':  return 'gray';
      default:        return 'gray';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">Audit Log</h1>
          <p className="mt-1 text-lg text-gray-600">Monitor all system changes</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            icon={Eye}
            onClick={() => setPreviewMode(p => !p)}
            className="px-4 py-2"
          >
            {previewMode ? 'Exit Preview' : 'Preview'}
          </Button>
          <Button variant="outline" icon={Download} className="px-4 py-2">
            Export
          </Button>
          <Button variant="outline" icon={Upload} className="px-4 py-2">
            Import
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by user, action, or target…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 rounded-lg shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline" icon={Filter} className="px-4 py-3">
          Filter
        </Button>
      </div>

      {/* Log Entries */}
      <div className="space-y-4">
        {filteredLogs.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            No entries match your criteria.
          </div>
        )}

        {filteredLogs.map((log, idx) => (
          <Card
            key={log.id}
            className={`overflow-hidden transition-shadow duration-200 ${
              idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'
            } hover:shadow-lg rounded-lg`}
          >
            <CardContent className="p-6 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <Badge
                    variant={actionColor(log.action)}
                    className="uppercase text-xs font-semibold px-2 py-0.5 rounded"
                  >
                    {log.action}
                  </Badge>
                </div>
                <div className="text-lg font-medium text-gray-900">{log.user}</div>
                <div className="text-gray-800">{log.target}</div>
                {log.details && (
                  <div className="text-gray-600 italic text-sm">⚬ {log.details}</div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="ghost" icon={Info}>
                  Details
                </Button>
                <Button size="sm" variant="destructive" icon={Trash2}>
                  Delete
                </Button>
                <Button size="sm" variant="outline" icon={MoreVertical}>
                  More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Panel */}
      {previewMode && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Preview Mode</h2>
          <Card className="rounded-lg shadow-md">
            <CardContent className="p-6 space-y-4">
              {filteredLogs.map(log => (
                <div
                  key={log.id}
                  className="border-b border-gray-200 pb-4 last:border-none"
                >
                  <div className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                  <div className="font-semibold text-gray-900">{log.user}</div>
                  <div className="text-gray-800">{log.action} &mdash; {log.target}</div>
                  {log.details && (
                    <div className="text-gray-600 text-sm mt-1">Details: {log.details}</div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
