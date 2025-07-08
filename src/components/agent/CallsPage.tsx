import React, { useState } from 'react';
import { Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, Clock, User, Plus, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Call } from '../../types';

export const CallsPage: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([
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
      agent: 'Sarah Agent'
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
      agent: 'Sarah Agent'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCall, setActiveCall] = useState<Call | null>(null);

  const filteredCalls = calls.filter(call =>
    call.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.contactNumber.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calls</h1>
          <p className="text-gray-600">Manage your calls and call history</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={PhoneCall}>
            Make Call
          </Button>
          <Button icon={Plus}>
            New Contact
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Calls</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Calls</p>
                <p className="text-3xl font-bold text-green-600">2</p>
              </div>
              <PhoneCall className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Missed Calls</p>
                <p className="text-3xl font-bold text-red-600">3</p>
              </div>
              <PhoneIncoming className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                <p className="text-3xl font-bold text-purple-600">8m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <Input
            icon={Search}
            placeholder="Search calls by contact name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Active Calls */}
      {activeCall && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Active Call</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{activeCall.contactName}</h3>
                  <p className="text-gray-600">{activeCall.contactNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">05:23</p>
                  <p className="text-sm text-gray-500">Duration</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="danger" size="sm">End Call</Button>
                  <Button variant="outline" size="sm">Hold</Button>
                  <Button variant="outline" size="sm">Transfer</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call History */}
      <Card>
        <CardHeader>
          <CardTitle>Call History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    call.direction === 'inbound' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {call.direction === 'inbound' ? (
                      <PhoneIncoming className="h-5 w-5 text-green-600" />
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
                    <p className="text-sm font-medium text-gray-900">
                      {call.duration ? `${call.duration}m` : '-'}
                    </p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                  
                  <div className="text-center">
                    <Badge variant={call.status === 'ended' ? 'success' : 'danger'}>
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
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={PhoneCall}>
                      Call Back
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};