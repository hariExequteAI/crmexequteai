import React, { useState } from 'react';
import { Phone, PhoneCall, Settings, Plus, Edit, Trash2, Power, AlertTriangle, CheckCircle, Users, BarChart3, Clock, Headphones, PhoneIncoming, PhoneOutgoing, Wifi, WifiOff, Globe, Shield, Key, Database } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface TelephonyProvider {
  id: string;
  name: string;
  type: 'twilio' | 'aws-connect' | 'zoom' | 'aircall' | 'ringcentral' | 'custom';
  status: 'active' | 'inactive' | 'error';
  apiKey: string;
  endpoint: string;
  region?: string;
  isDefault: boolean;
  features: string[];
  lastSync: Date;
  callsToday: number;
  callsThisMonth: number;
}

interface PhoneNumber {
  id: string;
  number: string;
  type: 'inbound' | 'outbound' | 'both';
  provider: string;
  assignedTo?: string;
  department?: string;
  isActive: boolean;
  country: string;
  capabilities: string[];
}

interface CallRoute {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: number;
  isActive: boolean;
  department?: string;
  agents: string[];
}

interface QueueConfig {
  id: string;
  name: string;
  department: string;
  maxWaitTime: number;
  maxQueueSize: number;
  agents: string[];
  musicOnHold: boolean;
  announcements: string[];
  isActive: boolean;
}

export const TelephonyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'providers' | 'numbers' | 'routing' | 'queues' | 'analytics'>('providers');
  
  const [providers, setProviders] = useState<TelephonyProvider[]>([
    {
      id: '1',
      name: 'Twilio Production',
      type: 'twilio',
      status: 'active',
      apiKey: 'AC***************',
      endpoint: 'https://api.twilio.com',
      isDefault: true,
      features: ['Voice', 'SMS', 'Recording', 'Conference'],
      lastSync: new Date(2024, 0, 15, 10, 30),
      callsToday: 45,
      callsThisMonth: 1250
    },
    {
      id: '2',
      name: 'AWS Connect Backup',
      type: 'aws-connect',
      status: 'inactive',
      apiKey: 'AKIA***************',
      endpoint: 'https://connect.us-east-1.amazonaws.com',
      region: 'us-east-1',
      isDefault: false,
      features: ['Voice', 'Recording', 'Analytics'],
      lastSync: new Date(2024, 0, 10, 14, 20),
      callsToday: 0,
      callsThisMonth: 0
    },
    {
    id: '3',
    name: 'Zoom Telephony',
    type: 'zoom',
    status: 'active',
    apiKey: 'ZOOM-API-KEY-XYZ',
    endpoint: 'https://api.zoom.us/v2/',
    isDefault: false,
    features: ['Voice', 'Meeting', 'Recording', 'Webinar'],
    lastSync: new Date(),
    callsToday: 12,
    callsThisMonth: 320
  }
  ]);

  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([
    {
      id: '1',
      number: '+1-555-0100',
      type: 'both',
      provider: 'Twilio Production',
      assignedTo: 'Sales Team',
      department: 'Sales',
      isActive: true,
      country: 'US',
      capabilities: ['Voice', 'SMS']
    },
    {
      id: '2',
      number: '+1-555-0200',
      type: 'inbound',
      provider: 'Twilio Production',
      assignedTo: 'Support Team',
      department: 'Support',
      isActive: true,
      country: 'US',
      capabilities: ['Voice']
    }
  ]);

  const [callRoutes, setCallRoutes] = useState<CallRoute[]>([
    {
      id: '1',
      name: 'Business Hours - Sales',
      condition: 'Time: 9AM-5PM AND Department: Sales',
      action: 'Route to Sales Queue',
      priority: 1,
      isActive: true,
      department: 'Sales',
      agents: ['Sarah Agent', 'Mike Sales']
    },
    {
      id: '2',
      name: 'After Hours - Voicemail',
      condition: 'Time: Outside 9AM-5PM',
      action: 'Send to Voicemail',
      priority: 2,
      isActive: true,
      agents: []
    }
  ]);

  const [queues, setQueues] = useState<QueueConfig[]>([
    {
      id: '1',
      name: 'Sales Queue',
      department: 'Sales',
      maxWaitTime: 300,
      maxQueueSize: 10,
      agents: ['Sarah Agent', 'Mike Sales'],
      musicOnHold: true,
      announcements: ['Thank you for calling Sales', 'Your call is important to us'],
      isActive: true
    },
    {
      id: '2',
      name: 'Support Queue',
      department: 'Support',
      maxWaitTime: 180,
      maxQueueSize: 15,
      agents: ['John Support', 'Lisa Help'],
      musicOnHold: true,
      announcements: ['Welcome to Technical Support'],
      isActive: true
    }
  ]);

  const [showAddProvider, setShowAddProvider] = useState(false);
  const [showAddNumber, setShowAddNumber] = useState(false);

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'twilio': return '📞';
      case 'aws-connect': return '☁️';
      case 'zoom': return 'Z';
      case 'aircall': return '✈️';
      case 'ringcentral': return '💍';
      default: return '📱';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'error': return 'danger';
      default: return 'default';
    }
  };

  const renderProviders = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Providers</p>
                <p className="text-3xl font-bold text-green-600">
                  {providers.filter(p => p.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Calls Today</p>
                <p className="text-3xl font-bold text-blue-600">
                  {providers.reduce((sum, p) => sum + p.callsToday, 0)}
                </p>
              </div>
              <PhoneCall className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-purple-600">
                  {providers.reduce((sum, p) => sum + p.callsThisMonth, 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-3xl font-bold text-green-600">99.9%</p>
              </div>
              <Wifi className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Providers List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Telephony Providers</CardTitle>
            <Button onClick={() => setShowAddProvider(true)} icon={Plus}>
              Add Provider
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providers.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getProviderIcon(provider.type)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{provider.name}</h4>
                      {provider.isDefault && (
                        <Badge variant="primary" size="sm">Default</Badge>
                      )}
                      <Badge variant={getStatusColor(provider.status) as any}>
                        {provider.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{provider.endpoint}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        API: {provider.apiKey}
                      </span>
                      <span className="text-xs text-gray-500">
                        Last sync: {provider.lastSync.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{provider.callsToday}</p>
                    <p className="text-xs text-gray-500">Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{provider.callsThisMonth}</p>
                    <p className="text-xs text-gray-500">This Month</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={Settings}>
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" icon={Edit} />
                    <Button variant="outline" size="sm" icon={Trash2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPhoneNumbers = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Numbers</p>
                <p className="text-3xl font-bold text-gray-900">{phoneNumbers.length}</p>
              </div>
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Numbers</p>
                <p className="text-3xl font-bold text-green-600">
                  {phoneNumbers.filter(n => n.isActive).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inbound Only</p>
                <p className="text-3xl font-bold text-blue-600">
                  {phoneNumbers.filter(n => n.type === 'inbound').length}
                </p>
              </div>
              <PhoneIncoming className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bidirectional</p>
                <p className="text-3xl font-bold text-purple-600">
                  {phoneNumbers.filter(n => n.type === 'both').length}
                </p>
              </div>
              <PhoneCall className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phone Numbers List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Phone Numbers</CardTitle>
            <Button onClick={() => setShowAddNumber(true)} icon={Plus}>
              Add Number
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Provider</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Assignment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {phoneNumbers.map((number) => (
                  <tr key={number.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{number.number}</span>
                        <span className="text-xs text-gray-500">({number.country})</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={
                        number.type === 'inbound' ? 'primary' : 
                        number.type === 'outbound' ? 'secondary' : 'success'
                      }>
                        {number.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{number.provider}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{number.assignedTo}</p>
                        <p className="text-sm text-gray-500">{number.department}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={number.isActive ? 'success' : 'danger'}>
                        {number.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" icon={Edit} />
                        <Button variant="ghost" size="sm" icon={Settings} />
                        <Button variant="ghost" size="sm" icon={Trash2} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRouting = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Call Routing Rules</CardTitle>
            <Button icon={Plus}>Add Route</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {callRoutes.map((route) => (
              <div key={route.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{route.name}</h4>
                      <Badge variant="primary" size="sm">Priority {route.priority}</Badge>
                      <Badge variant={route.isActive ? 'success' : 'danger'}>
                        {route.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Condition: </span>
                        <span className="text-sm text-gray-900">{route.condition}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Action: </span>
                        <span className="text-sm text-gray-900">{route.action}</span>
                      </div>
                      {route.agents.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Agents: </span>
                          <span className="text-sm text-gray-900">{route.agents.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={Edit} />
                    <Button variant="outline" size="sm" icon={Trash2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderQueues = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Call Queues</CardTitle>
            <Button icon={Plus}>Add Queue</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {queues.map((queue) => (
              <Card key={queue.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{queue.name}</h4>
                      <p className="text-sm text-gray-500">{queue.department}</p>
                    </div>
                    <Badge variant={queue.isActive ? 'success' : 'danger'}>
                      {queue.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Max Wait Time</span>
                      <span className="text-sm font-medium text-gray-900">{queue.maxWaitTime}s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Max Queue Size</span>
                      <span className="text-sm font-medium text-gray-900">{queue.maxQueueSize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Agents</span>
                      <span className="text-sm font-medium text-gray-900">{queue.agents.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Music on Hold</span>
                      <Badge variant={queue.musicOnHold ? 'success' : 'secondary'} size="sm">
                        {queue.musicOnHold ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" icon={Edit}>Edit</Button>
                      <Button variant="outline" size="sm" icon={Settings}>Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Calls</p>
                <p className="text-3xl font-bold text-green-600">8</p>
              </div>
              <PhoneCall className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Queue</p>
                <p className="text-3xl font-bold text-yellow-600">3</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Agents</p>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <Headphones className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                <p className="text-3xl font-bold text-purple-600">45s</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-3xl font-bold text-green-600">100%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">All systems operational</p>
                  <p className="text-sm text-gray-600">All telephony providers are responding normally</p>
                </div>
              </div>
              <Badge variant="success">Healthy</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-gray-900">High call volume detected</p>
                  <p className="text-sm text-gray-600">Consider adding more agents to reduce wait times</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Review</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Telephony Management</h1>
          <p className="text-gray-600">Configure and monitor your telephony infrastructure</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={Settings}>
            System Settings
          </Button>
          <Button icon={Plus}>
            Quick Setup
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'providers', label: 'Providers', icon: Globe },
            { id: 'numbers', label: 'Phone Numbers', icon: Phone },
            { id: 'routing', label: 'Call Routing', icon: PhoneCall },
            { id: 'queues', label: 'Queues', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'providers' && renderProviders()}
      {activeTab === 'numbers' && renderPhoneNumbers()}
      {activeTab === 'routing' && renderRouting()}
      {activeTab === 'queues' && renderQueues()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
};