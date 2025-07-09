import React, { useState, useMemo } from 'react';

// DEPENDENCY NOTE: In a real project, you would need to install recharts:
// npm install recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// ICONS: Using Lucide React for icons
const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>;
const Search = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const PlusCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>;
const MoreHorizontal = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>;
const Users = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const DollarSign = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-500"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const TrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const Zap = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-purple-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;


// MOCK DATA & TYPES
// =================================================================

type Agent = {
  id: string;
  name: string;
  avatarUrl?: string;
};

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Won';
  source: 'Website' | 'Referral' | 'Advertisement' | 'Cold Call';
  assignedTo: Agent;
  lastContacted: string;
  potentialValue: number;
};

const agents: Agent[] = [
  { id: 'agent-1', name: 'Alex Johnson', avatarUrl: `https://i.pravatar.cc/150?u=agent-1` },
  { id: 'agent-2', name: 'Maria Garcia', avatarUrl: `https://i.pravatar.cc/150?u=agent-2` },
  { id: 'agent-3', name: 'James Smith', avatarUrl: `https://i.pravatar.cc/150?u=agent-3` },
  { id: 'agent-4', name: 'Priya Patel', avatarUrl: `https://i.pravatar.cc/150?u=agent-4` },
  { id: 'agent-5', name: 'Unassigned', avatarUrl: `https://placehold.co/150/E2E8F0/4A5568?text=U`},
];

const mockLeads: Lead[] = [
  { id: 'lead-001', name: 'John Doe', email: 'john.doe@example.com', company: 'Innovate Inc.', status: 'Qualified', source: 'Website', assignedTo: agents[0], lastContacted: '2025-07-08T10:00:00Z', potentialValue: 5000 },
  { id: 'lead-002', name: 'Jane Smith', email: 'jane.smith@acme.com', company: 'Acme Corp', status: 'Contacted', source: 'Referral', assignedTo: agents[1], lastContacted: '2025-07-07T14:30:00Z', potentialValue: 12000 },
  { id: 'lead-003', name: 'Sam Wilson', email: 'sam.wilson@techsys.io', company: 'Tech Systems', status: 'New', source: 'Advertisement', assignedTo: agents[0], lastContacted: '2025-07-09T09:00:00Z', potentialValue: 7500 },
  { id: 'lead-004', name: 'Emily Brown', email: 'emily.b@webworks.dev', company: 'WebWorks', status: 'Lost', source: 'Website', assignedTo: agents[2], lastContacted: '2025-07-05T11:20:00Z', potentialValue: 3000 },
  { id: 'lead-005', name: 'Michael Lee', email: 'michael.lee@datastream.co', company: 'DataStream', status: 'Won', source: 'Cold Call', assignedTo: agents[3], lastContacted: '2025-07-03T16:45:00Z', potentialValue: 25000 },
  { id: 'lead-006', name: 'Sarah Chen', email: 'sarah.c@cloudify.com', company: 'Cloudify', status: 'New', source: 'Website', assignedTo: agents[4], lastContacted: '2025-07-09T11:00:00Z', potentialValue: 8800 },
  { id: 'lead-007', name: 'David Kim', email: 'david.k@synergy.net', company: 'Synergy Solutions', status: 'Qualified', source: 'Referral', assignedTo: agents[2], lastContacted: '2025-07-08T13:00:00Z', potentialValue: 15000 },
  { id: 'lead-008', name: 'Laura Martinez', email: 'laura.m@globex.com', company: 'Globex Corporation', status: 'Contacted', source: 'Advertisement', assignedTo: agents[3], lastContacted: '2025-07-07T10:15:00Z', potentialValue: 6200 },
  { id: 'lead-009', name: 'Chris Green', email: 'chris.g@quantum.ai', company: 'QuantumLeap AI', status: 'New', source: 'Website', assignedTo: agents[4], lastContacted: '2025-07-09T08:30:00Z', potentialValue: 32000 },
  { id: 'lead-010', name: 'Amanda White', email: 'amanda.w@summit.co', company: 'Summit Enterprises', status: 'Won', source: 'Referral', assignedTo: agents[1], lastContacted: '2025-06-28T18:00:00Z', potentialValue: 18000 },
  { id: 'lead-011', name: 'Peter Jones', email: 'peter.j@apex.com', company: 'Apex Digital', status: 'New', source: 'Website', assignedTo: agents[4], lastContacted: '2025-07-09T12:00:00Z', potentialValue: 11000 },
  { id: 'lead-012', name: 'Megan Taylor', email: 'megan.t@pioneer.io', company: 'Pioneer Labs', status: 'Qualified', source: 'Cold Call', assignedTo: agents[0], lastContacted: '2025-07-06T15:00:00Z', potentialValue: 9500 },
];

// RECHARTS MOCK DATA & CONFIG
const leadSourceData = mockLeads.reduce((acc, lead) => {
    const source = acc.find(s => s.name === lead.source);
    if (source) {
        source.value += 1;
    } else {
        acc.push({ name: lead.source, value: 1 });
    }
    return acc;
}, [] as { name: string; value: number }[]);

const PIE_CHART_COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

const agentPerformanceData = agents.filter(a => a.name !== 'Unassigned').map(agent => ({
    name: agent.name.split(' ')[0], // First name
    leads: mockLeads.filter(l => l.assignedTo.id === agent.id).length,
    value: mockLeads.filter(l => l.assignedTo.id === agent.id && l.status === 'Won').reduce((sum, l) => sum + l.potentialValue, 0)
}));

// UTILITY & UI COMPONENTS
// =================================================================

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>;
const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={`p-4 ${className}`}>{children}</div>;

const Button = ({ children, onClick, variant = 'default', className = '' }: { children: React.ReactNode; onClick?: () => void; variant?: 'default' | 'outline' | 'ghost'; className?: string }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    ghost: 'hover:bg-gray-100',
  };
  return <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} px-4 py-2 ${className}`}>{children}</button>;
};

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => <input className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />;

const StatusBadge = ({ status }: { status: Lead['status'] }) => {
    const statusClasses: Record<Lead['status'], string> = {
        New: 'bg-blue-100 text-blue-800', Contacted: 'bg-yellow-100 text-yellow-800',
        Qualified: 'bg-purple-100 text-purple-800', Won: 'bg-green-100 text-green-800',
        Lost: 'bg-red-100 text-red-800',
    };
    return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusClasses[status]}`}>{status}</span>;
};

// MAIN ADMIN COMPONENT
// =================================================================

const LeadManagement = () => {
    const [leads, setLeads] = useState<Lead[]>(mockLeads);
    const [searchTerm, setSearchTerm] = useState('');
    const [agentFilter, setAgentFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<{ key: keyof Lead; direction: 'asc' | 'desc' }>({ key: 'lastContacted', direction: 'desc' });

    const handleReassign = (leadId: string, newAgentId: string) => {
        const newAgent = agents.find(a => a.id === newAgentId);
        if (!newAgent) return;
        setLeads(prevLeads => prevLeads.map(lead => lead.id === leadId ? { ...lead, assignedTo: newAgent } : lead));
        // In a real app, you'd also make an API call here.
    };

    const filteredAndSortedLeads = useMemo(() => {
        let result = leads.filter(lead =>
            (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (agentFilter === 'All' || lead.assignedTo.id === agentFilter)
        );

        result.sort((a, b) => {
            const valA = a[sortBy.key]; const valB = b[sortBy.key];
            let comparison = 0;
            if (valA > valB) comparison = 1;
            else if (valA < valB) comparison = -1;
            return sortBy.direction === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [leads, searchTerm, agentFilter, sortBy]);

    const handleSort = (key: keyof Lead) => {
        setSortBy(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
    };
    
    const summaryStats = useMemo(() => {
        const totalValue = leads.reduce((sum, l) => sum + l.potentialValue, 0);
        const wonValue = leads.filter(l => l.status === 'Won').reduce((sum, l) => sum + l.potentialValue, 0);
        const conversionRate = leads.length > 0 ? (leads.filter(l => l.status === 'Won').length / leads.length) * 100 : 0;
        const unassignedLeads = leads.filter(l => l.assignedTo.name === 'Unassigned').length;
        return { totalValue, wonValue, conversionRate, unassignedLeads };
    }, [leads]);
    
    const columns = [
        { key: 'name', label: 'Lead Name', sortable: true }, { key: 'company', label: 'Company', sortable: true },
        { key: 'status', label: 'Status', sortable: true }, { key: 'potentialValue', label: 'Value', sortable: true },
        { key: 'assignedTo', label: 'Assigned To', sortable: false }, { key: 'lastContacted', label: 'Last Contacted', sortable: true },
    ];

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans text-gray-900">
            <div className="max-w-screen-xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Lead Management</h1>
                    <p className="text-gray-500 mt-1">Oversee, assign, and analyze all company leads.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Total Pipeline Value</p><p className="text-3xl font-bold">{formatCurrency(summaryStats.totalValue)}</p></div><DollarSign /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Total Value Won</p><p className="text-3xl font-bold">{formatCurrency(summaryStats.wonValue)}</p></div><Users /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Overall Conversion</p><p className="text-3xl font-bold">{summaryStats.conversionRate.toFixed(1)}%</p></div><TrendingUp /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Unassigned Leads</p><p className="text-3xl font-bold">{summaryStats.unassignedLeads}</p></div><Zap /></CardContent></Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 flex items-center gap-4">
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input placeholder="Search leads..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                                </div>
                                <select value={agentFilter} onChange={(e) => setAgentFilter(e.target.value)} className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="All">All Agents</option>
                                    {agents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
                                </select>
                            </div>
                            <Button><PlusCircle />Create New Lead</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        {columns.map(col => (
                                            <th key={col.key} scope="col" className="px-6 py-3">
                                                <div className="flex items-center gap-1 cursor-pointer" onClick={() => col.sortable && handleSort(col.key as keyof Lead)}>
                                                    {col.label}
                                                    {col.sortable && sortBy.key === col.key && (<span className={sortBy.direction === 'asc' ? 'rotate-180' : ''}><ChevronDown /></span>)}
                                                </div>
                                            </th>
                                        ))}
                                        <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedLeads.map((lead) => (
                                        <tr key={lead.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4"><div className="font-medium text-gray-900">{lead.name}</div><div className="text-xs text-gray-500">{lead.email}</div></td>
                                            <td className="px-6 py-4">{lead.company}</td>
                                            <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                                            <td className="px-6 py-4 font-medium">{formatCurrency(lead.potentialValue)}</td>
                                            <td className="px-6 py-4">
                                                <select value={lead.assignedTo.id} onChange={(e) => handleReassign(lead.id, e.target.value)} className="h-9 text-sm rounded-md border border-gray-300 bg-white px-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    {agents.map(agent => <option key={agent.id} value={agent.id}>{agent.name}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">{formatDate(lead.lastContacted)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" onClick={() => alert(`Deleting lead: ${lead.name}`)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Team Analytics</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><h3 className="font-semibold">Lead Sources (All)</h3></CardHeader>
                            <CardContent><div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={leadSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                            {leadSourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value} leads`} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><h3 className="font-semibold">Agent Workload & Value Won</h3></CardHeader>
                            <CardContent><div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={agentPerformanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'Assigned Leads', angle: -90, position: 'insideLeft' }} />
                                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: 'Value Won ($)', angle: 90, position: 'insideRight' }} />
                                        <Tooltip formatter={(value, name) => name === 'Value Won' ? formatCurrency(value as number) : value} />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="leads" fill="#8884d8" name="Assigned Leads" />
                                        <Bar yAxisId="right" dataKey="value" fill="#82ca9d" name="Value Won" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div></CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { LeadManagement };
export default LeadManagement;
