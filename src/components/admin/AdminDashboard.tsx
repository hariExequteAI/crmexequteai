import React, { useEffect, useState } from 'react';
import {
  Users,
  Ticket,
  Phone,
  TrendingUp,
  PieChart as PieChartIcon,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const AdminDashboard: React.FC = () => {
  // Dummy realistic stats
  const [totalUsers] = useState(1248);
  const [activeTickets] = useState(87);
  const [callsToday] = useState(53);
  const [departmentDistribution] = useState(
    [
      { name: 'Sales', value: 34, color: '#4F46E5' },
      { name: 'Support', value: 28, color: '#10B981' },
      { name: 'Marketing', value: 18, color: '#F59E0B' },
      { name: 'Engineering', value: 15, color: '#EF4444' },
      { name: 'HR', value: 10, color: '#3B82F6' }
    ]
  );

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users, color: 'bg-blue-500' },
    { label: 'Active Tickets', value: activeTickets, icon: Ticket, color: 'bg-green-500' },
    { label: 'Calls Today', value: callsToday, icon: Phone, color: 'bg-purple-500' },
    { label: 'Resolution Rate', value: '92%', icon: TrendingUp, color: 'bg-yellow-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-blue-100">
          Monitor system performance, user activity, and key metrics across all departments.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Distribution Pie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChartIcon className="h-5 w-5 text-green-600" />
            <span>Department Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {departmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>System Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-gray-900">High ticket volume detected</p>
                  <p className="text-sm text-gray-600">Consider adding more agents to handle the load</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Review</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">All systems operational</p>
                  <p className="text-sm text-gray-600">No critical issues detected</p>
                </div>
              </div>
              <Badge variant="success" size="sm">Healthy</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
