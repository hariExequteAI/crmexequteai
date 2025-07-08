import React, { useEffect, useState } from 'react';
import { Phone, Ticket, CheckSquare, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import API from '../../api';

interface Ticket {
  _id: string;
  name: string;
  description: string;
  priority: string;
  status: string;
  due?: string;
}

interface Call {
  _id: string;
  contactName?: string;
  contactNumber?: string;
  status: string;
  direction: 'inbound' | 'outbound';
  duration?: number;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: string;
  due?: string;
}

export const AgentDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ticketsRes, tasksRes, callsRes, meetingsRes] = await Promise.all([
        API.get('/tickets/agent'),
        API.get('/tasks/agent'),
        API.get('/calls/agent'),
        API.get('/meetings/agent'),
      ]);

      setTickets(ticketsRes.data || []);
      setTasks(tasksRes.data || []);
      setCalls(callsRes.data || []);
      setMeetings(meetingsRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const stats = [
    { label: 'Active Calls', value: calls.filter(c => c.status === 'active').length.toString(), icon: Phone, color: 'bg-green-500', change: '+1' },
    { label: 'Open Tickets', value: tickets.filter(t => t.status === 'open').length.toString(), icon: Ticket, color: 'bg-blue-500', change: '-2' },
    { label: 'Pending Tasks', value: tasks.filter(t => t.status !== 'completed').length.toString(), icon: CheckSquare, color: 'bg-yellow-500', change: '+3' },
    { label: 'Today\'s Meetings', value: meetings.length.toString(), icon: Calendar, color: 'bg-purple-500', change: '0' },
  ];

  const recentCalls = calls.slice(0, 5);
  const urgentTickets = tickets.filter(t => ['high', 'urgent'].includes(t.priority));
  const upcomingTasks = tasks.filter(t => t.status !== 'completed').slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-blue-100">
          You have {urgentTickets.length} urgent tickets and {calls.filter(c => c.status === 'active').length} active calls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' :
                      stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change !== '0' && stat.change} from yesterday
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span>Recent Calls</span>
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div key={call._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      call.status === 'active' ? 'bg-green-500' :
                      call.status === 'ended' ? 'bg-gray-400' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{call.contactName || 'Unknown'}</p>
                      <p className="text-sm text-gray-500">{call.contactNumber || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={call.direction === 'inbound' ? 'primary' : 'secondary'}>
                      {call.direction}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      {call.duration ? `${call.duration}m` : 'Active'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span>Urgent Tickets</span>
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentTickets.map((ticket) => (
                <div key={ticket._id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{ticket.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="danger" size="sm">{ticket.priority}</Badge>
                        <Badge variant="default" size="sm">{ticket.status}</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-right">
                      Due {ticket.due ? new Date(ticket.due).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-green-600" />
              <span>Upcoming Tasks</span>
            </CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'}
                    size="sm"
                  >
                    {task.priority}
                  </Badge>
                  <p className="text-xs text-gray-500">
                    Due {task.due ? new Date(task.due).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
