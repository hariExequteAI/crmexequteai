import React, { useState } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface Call {
  id: string;
  contactId: string;
  contactName: string;
  contactNumber: string;
  direction: 'inbound' | 'outbound';
  status: 'ended' | 'missed';
  duration?: number;
  startTime: Date;
  endTime?: Date;
  notes?: string;
  disposition: string;
  agent: string;
}

export const CallManagement: React.FC = () => {
  const [calls] = useState<Call[]>([
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
      notes: 'Discussed integration requirements and timeline',
      disposition: 'Resolved',
      agent: 'Sarah Agent',
    },
    {
      id: '2',
      contactId: '2',
      contactName: 'Bob Smith',
      contactNumber: '+1-555-0124',
      direction: 'outbound',
      status: 'ended',
      duration: 8,
      startTime: new Date(2024, 0, 15, 14, 20),
      endTime: new Date(2024, 0, 15, 14, 28),
      notes: 'Follow-up call regarding proposal',
      disposition: 'Callback Required',
      agent: 'Mike Support',
    },
    {
      id: '3',
      contactId: '3',
      contactName: 'Carol Davis',
      contactNumber: '+1-555-0125',
      direction: 'inbound',
      status: 'missed',
      startTime: new Date(2024, 0, 15, 16, 45),
      disposition: 'Missed',
      agent: 'Sarah Agent',
    },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [detailCall, setDetailCall] = useState<Call | null>(null);

  const totalCalls = calls.length;
  const inboundCalls = calls.filter(c => c.direction === 'inbound').length;
  const outboundCalls = calls.filter(c => c.direction === 'outbound').length;
  const missedCalls = calls.filter(c => c.status === 'missed').length;
  const durations = calls.map(c => c.duration ?? 0).filter(d => d > 0);
  const avgDuration = durations.length
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    : 0;

  const openDetails = (call: Call) => {
    setDetailCall(call);
  };

  const closeDetails = () => {
    setDetailCall(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Call Management</h1>
          <p className="text-gray-600">Monitor call activity and performance</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={e => setSelectedPeriod(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calls</p>
              <p className="text-3xl font-bold text-gray-900">{totalCalls}</p>
            </div>
            <Phone className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inbound</p>
              <p className="text-3xl font-bold text-green-600">{inboundCalls}</p>
            </div>
            <PhoneIncoming className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Outbound</p>
              <p className="text-3xl font-bold text-blue-600">{outboundCalls}</p>
            </div>
            <PhoneOutgoing className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Missed</p>
              <p className="text-3xl font-bold text-red-600">{missedCalls}</p>
            </div>
            <PhoneCall className="h-8 w-8 text-red-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-3xl font-bold text-purple-600">{avgDuration}m</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </CardContent>
        </Card>
      </div>

      {/* Call Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calls.map(call => (
              <div
                key={call.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      call.direction === 'inbound' ? 'bg-green-100' : 'bg-blue-100'
                    }`}
                  >
                    {call.direction === 'inbound' ? (
                      <PhoneIncoming
                        className={`h-5 w-5 ${
                          call.status === 'missed' ? 'text-red-600' : 'text-green-600'
                        }`}
                      />
                    ) : (
                      <PhoneOutgoing className="h-5 w-5 text-blue-600" />
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">{call.contactName}</h4>
                    <p className="text-sm text-gray-500">{call.contactNumber}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{call.agent}</p>
                    <p className="text-xs text-gray-500">Agent</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">
                      {call.duration != null ? `${call.duration}m` : '-'}
                    </p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>

                  <div className="text-center">
                    <Badge
                      variant={
                        call.status === 'ended'
                          ? 'success'
                          : 'danger'
                      }
                    >
                      {call.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{call.disposition}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-900">
                      {call.startTime.toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {call.startTime.toLocaleDateString()}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDetails(call)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      {detailCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Call Details</h2>
              <button onClick={closeDetails} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Contact:</strong> {detailCall.contactName} (
                {detailCall.contactNumber})
              </p>
              <p>
                <strong>Direction:</strong> {detailCall.direction}
              </p>
              <p>
                <strong>Status:</strong> {detailCall.status}
              </p>
              {detailCall.duration != null && (
                <p>
                  <strong>Duration:</strong> {detailCall.duration} minutes
                </p>
              )}
              <p>
                <strong>Started:</strong> {detailCall.startTime.toLocaleString()}
              </p>
              {detailCall.endTime && (
                <p>
                  <strong>Ended:</strong> {detailCall.endTime.toLocaleString()}
                </p>
              )}
              <p>
                <strong>Agent:</strong> {detailCall.agent}
              </p>
              <p>
                <strong>Disposition:</strong> {detailCall.disposition}
              </p>
              {detailCall.notes && (
                <p>
                  <strong>Notes:</strong>
                  <br />
                  {detailCall.notes}
                </p>
              )}
            </div>
            <div className="mt-6 text-right">
              <Button onClick={closeDetails}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
