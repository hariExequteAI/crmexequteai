import React, { useState } from 'react';
import { BarChart, PieChart, FileText, Filter, Search, Plus, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'sales' | 'user-activity' | 'financial' | 'performance';
  status: 'generated' | 'pending' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  data: any;
}

export const ReportManagement: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    { id: '1', title: 'Quarterly Sales Report', description: 'Sales data and trends for Q1 2024', type: 'sales', status: 'generated', createdAt: new Date(2024,0,1), updatedAt: new Date(2024,0,15), data: {/*...*/} },
    { id: '2', title: 'User Activity Summary', description: 'Summary of user activities and engagement metrics', type: 'user-activity', status: 'pending', createdAt: new Date(2024,0,5), updatedAt: new Date(2024,0,5), data: {/*...*/} },
    { id: '3', title: 'Annual Financial Overview', description: 'Comprehensive financial report for the fiscal year 2023', type: 'financial', status: 'generated', createdAt: new Date(2023,11,1), updatedAt: new Date(2024,0,10), data: {/*...*/} },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all'|'generated'|'pending'|'failed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all'|'sales'|'user-activity'|'financial'|'performance'>('all');

  // ← NEW: track which report is open
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType   = typeFilter === 'all'   || report.type   === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'pending':   return <Clock className="h-4 w-4" />;
      case 'failed':    return <AlertTriangle className="h-4 w-4" />;
      case 'generated': return <CheckCircle className="h-4 w-4" />;
      default:          return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report Management</h1>
          <p className="text-gray-600">View and manage system reports</p>
        </div>
        <Button icon={Plus}>Generate Report</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600">
                  {reports.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Generated</p>
                <p className="text-3xl font-bold text-green-600">
                  {reports.filter(r => r.status === 'generated').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input icon={Search} placeholder="Search reports..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="all">All Status</option>
              <option value="generated">Generated</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="all">All Types</option>
              <option value="sales">Sales</option>
              <option value="user-activity">User Activity</option>
              <option value="financial">Financial</option>
              <option value="performance">Performance</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map(report => (
          <Card key={report.id} hover>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(report.status)}
                    <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    <Badge variant="default">{report.type}</Badge>
                    <Badge variant={
                      report.status === 'generated' ? 'success'
                      : report.status === 'failed' ? 'danger'
                      : 'warning'
                    }>
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Created: {report.createdAt.toLocaleDateString()}</span>
                    <span>Updated: {report.updatedAt.toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {/* ← NEW: wire up View */}
                  <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                    View
                  </Button>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ← NEW: View Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedReport.title}</h2>
              <button onClick={() => setSelectedReport(null)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>Description:</strong> {selectedReport.description}</p>
              <p><strong>Type:</strong> {selectedReport.type}</p>
              <p><strong>Status:</strong> {selectedReport.status}</p>
              <p><strong>Created:</strong> {selectedReport.createdAt.toLocaleString()}</p>
              <p><strong>Updated:</strong> {selectedReport.updatedAt.toLocaleString()}</p>
              <div>
                <strong>Data Preview:</strong>
                <pre className="mt-1 p-2 bg-gray-100 rounded overflow-auto text-xs">
                  {JSON.stringify(selectedReport.data, null, 2)}
                </pre>
              </div>
            </div>
            <div className="mt-6 text-right">
              <Button onClick={() => setSelectedReport(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
