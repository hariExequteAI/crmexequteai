import React, { useState, useMemo } from 'react';

// DEPENDENCY NOTE: In a real project, you would need to install recharts:
// npm install recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


// ICONS: Using Lucide React for icons - a popular choice with shadcn/ui
// In a real project, you would install this: npm install lucide-react
const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>;
const Search = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const PlusCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>;
const MoreHorizontal = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>;
const Users = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Target = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-500"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const TrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-500"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const XCircle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-500"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>;


// MOCK DATA: In a real app, this would come from an API.
// =================================================================

// Represents a sales agent
type Agent = {
  id: string;
  name: string;
  avatarUrl?: string;
};

// Represents a lead
type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Won';
  source: 'Website' | 'Referral' | 'Advertisement' | 'Cold Call';
  assignedTo: Agent;
  lastContacted: string; // ISO date string
  potentialValue: number;
};

const agents: Agent[] = [
  { id: 'agent-1', name: 'Alex Johnson', avatarUrl: `https://i.pravatar.cc/150?u=agent-1` },
  { id: 'agent-2', name: 'Maria Garcia', avatarUrl: `https://i.pravatar.cc/150?u=agent-2` },
  { id: 'agent-3', name: 'James Smith', avatarUrl: `https://i.pravatar.cc/150?u=agent-3` },
  { id: 'agent-4', name: 'Priya Patel', avatarUrl: `https://i.pravatar.cc/150?u=agent-4` },
];

const mockLeads: Lead[] = [
  { id: 'lead-001', name: 'John Doe', email: 'john.doe@example.com', company: 'Innovate Inc.', status: 'Qualified', source: 'Website', assignedTo: agents[0], lastContacted: '2024-07-15T10:00:00Z', potentialValue: 5000 },
  { id: 'lead-002', name: 'Jane Smith', email: 'jane.smith@acme.com', company: 'Acme Corp', status: 'Contacted', source: 'Referral', assignedTo: agents[1], lastContacted: '2024-07-14T14:30:00Z', potentialValue: 12000 },
  { id: 'lead-003', name: 'Sam Wilson', email: 'sam.wilson@techsys.io', company: 'Tech Systems', status: 'New', source: 'Advertisement', assignedTo: agents[0], lastContacted: '2024-07-16T09:00:00Z', potentialValue: 7500 },
  { id: 'lead-004', name: 'Emily Brown', email: 'emily.b@webworks.dev', company: 'WebWorks', status: 'Lost', source: 'Website', assignedTo: agents[2], lastContacted: '2024-07-12T11:20:00Z', potentialValue: 3000 },
  { id: 'lead-005', name: 'Michael Lee', email: 'michael.lee@datastream.co', company: 'DataStream', status: 'Won', source: 'Cold Call', assignedTo: agents[3], lastContacted: '2024-07-10T16:45:00Z', potentialValue: 25000 },
  { id: 'lead-006', name: 'Sarah Chen', email: 'sarah.c@cloudify.com', company: 'Cloudify', status: 'New', source: 'Website', assignedTo: agents[1], lastContacted: '2024-07-16T11:00:00Z', potentialValue: 8800 },
  { id: 'lead-007', name: 'David Kim', email: 'david.k@synergy.net', company: 'Synergy Solutions', status: 'Qualified', source: 'Referral', assignedTo: agents[2], lastContacted: '2024-07-15T13:00:00Z', potentialValue: 15000 },
  { id: 'lead-008', name: 'Laura Martinez', email: 'laura.m@globex.com', company: 'Globex Corporation', status: 'Contacted', source: 'Advertisement', assignedTo: agents[3], lastContacted: '2024-07-14T10:15:00Z', potentialValue: 6200 },
  { id: 'lead-009', name: 'Chris Green', email: 'chris.g@quantum.ai', company: 'QuantumLeap AI', status: 'New', source: 'Website', assignedTo: agents[0], lastContacted: '2024-07-17T08:30:00Z', potentialValue: 32000 },
  { id: 'lead-010', name: 'Amanda White', email: 'amanda.w@summit.co', company: 'Summit Enterprises', status: 'Won', source: 'Referral', assignedTo: agents[1], lastContacted: '2024-07-05T18:00:00Z', potentialValue: 18000 },
];

// RECHARTS MOCK DATA & CONFIG
// =================================================================
const leadSourceData = [
    { name: 'Website', value: 4 },
    { name: 'Referral', value: 3 },
    { name: 'Advertisement', value: 2 },
    { name: 'Cold Call', value: 1 },
];
const PIE_CHART_COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444']; // sky, emerald, amber, red

const agentPerformanceData = [
    { name: 'Alex J.', qualified: 2, won: 1 },
    { name: 'Maria G.', qualified: 1, won: 2 },
    { name: 'James S.', qualified: 1, won: 0 },
    { name: 'Priya P.', qualified: 0, won: 1 },
];


// UTILITY FUNCTIONS
// =================================================================

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}


// UI COMPONENTS
// =================================================================

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'default', className = '' }: { children: React.ReactNode; onClick?: () => void; variant?: 'default' | 'outline' | 'ghost'; className?: string }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    ghost: 'hover:bg-gray-100',
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} px-4 py-2 ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const DropdownMenu = ({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative inline-block text-left">
            <div>
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex justify-center w-full rounded-md" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    {trigger}
                </button>
            </div>
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="py-1" role="none" onClick={() => setIsOpen(false)}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

const DropdownMenuItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); }} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
        {children}
    </a>
);

const StatusBadge = ({ status }: { status: Lead['status'] }) => {
    const statusClasses: Record<Lead['status'], string> = {
        New: 'bg-blue-100 text-blue-800',
        Contacted: 'bg-yellow-100 text-yellow-800',
        Qualified: 'bg-purple-100 text-purple-800',
        Won: 'bg-green-100 text-green-800',
        Lost: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusClasses[status]}`}>
            {status}
        </span>
    );
};

const AgentDisplay = ({ agent }: { agent: Agent }) => (
    <div className="flex items-center space-x-2">
        <img className="h-8 w-8 rounded-full object-cover" src={agent.avatarUrl} alt={agent.name} onError={(e) => { e.currentTarget.src = `https://placehold.co/32x32/E2E8F0/4A5568?text=${agent.name.charAt(0)}` }}/>
        <span className="text-sm font-medium text-gray-800">{agent.name}</span>
    </div>
);


// MAIN PAGE COMPONENT
// =================================================================

const LeadsPage = () => {
    const [leads, setLeads] = useState<Lead[]>(mockLeads);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'All'>('All');
    const [sortBy, setSortBy] = useState<{ key: keyof Lead; direction: 'asc' | 'desc' }>({ key: 'lastContacted', direction: 'desc' });

    const filteredAndSortedLeads = useMemo(() => {
        let result = leads.filter(lead =>
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (statusFilter !== 'All') {
            result = result.filter(lead => lead.status === statusFilter);
        }

        result.sort((a, b) => {
            const valA = a[sortBy.key];
            const valB = b[sortBy.key];
            
            let comparison = 0;
            if (valA > valB) {
                comparison = 1;
            } else if (valA < valB) {
                comparison = -1;
            }
            
            return sortBy.direction === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [leads, searchTerm, statusFilter, sortBy]);

    const handleSort = (key: keyof Lead) => {
        setSortBy(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };
    
    const summaryStats = useMemo(() => {
        const totalLeads = leads.length;
        const newLeads = leads.filter(l => l.status === 'New').length;
        const conversionRate = totalLeads > 0 ? (leads.filter(l => l.status === 'Won').length / totalLeads) * 100 : 0;
        const lostLeads = leads.filter(l => l.status === 'Lost').length;
        return { totalLeads, newLeads, conversionRate, lostLeads };
    }, [leads]);
    
    const columns: { key: keyof Lead; label: string; sortable: boolean }[] = [
        { key: 'name', label: 'Lead Name', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'potentialValue', label: 'Value', sortable: true },
        { key: 'assignedTo', label: 'Assigned To', sortable: false },
        { key: 'lastContacted', label: 'Last Contacted', sortable: true },
    ];

    return (
        <div className="bg-white min-h-screen p-4 sm:p-6 lg:p-8 font-sans text-gray-900">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Leads Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage and track your sales leads effectively.</p>
                </header>

                {/* Summary Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Total Leads</p><p className="text-3xl font-bold">{summaryStats.totalLeads}</p></div><Users /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">New Leads</p><p className="text-3xl font-bold">{summaryStats.newLeads}</p></div><Target /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Conversion Rate</p><p className="text-3xl font-bold">{summaryStats.conversionRate.toFixed(1)}%</p></div><TrendingUp /></CardContent></Card>
                    <Card><CardContent className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Leads Lost</p><p className="text-3xl font-bold">{summaryStats.lostLeads}</p></div><XCircle /></CardContent></Card>
                </div>

                {/* Main Leads Table Card */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 flex items-center gap-4">
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input placeholder="Search leads..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                                </div>
                                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Lead['status'] | 'All')} className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="All">All Statuses</option>
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Won">Won</option>
                                    <option value="Lost">Lost</option>
                                </select>
                            </div>
                            <Button><PlusCircle />Add New Lead</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="p-4"><div className="flex items-center"><input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" /><label htmlFor="checkbox-all" className="sr-only">checkbox</label></div></th>
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
                                        <tr key={lead.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                            <td className="w-4 p-4"><div className="flex items-center"><input id={`checkbox-${lead.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" /><label htmlFor={`checkbox-${lead.id}`} className="sr-only">checkbox</label></div></td>
                                            <td className="px-6 py-4"><div className="font-medium text-gray-900">{lead.name}</div><div className="text-xs text-gray-500">{lead.email}</div></td>
                                            <td className="px-6 py-4">{lead.company}</td>
                                            <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                                            <td className="px-6 py-4 font-medium">{formatCurrency(lead.potentialValue)}</td>
                                            <td className="px-6 py-4"><AgentDisplay agent={lead.assignedTo} /></td>
                                            <td className="px-6 py-4">{formatDate(lead.lastContacted)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu trigger={<Button variant="ghost"><MoreHorizontal /></Button>}>
                                                    <DropdownMenuItem onClick={() => alert(`Viewing details for ${lead.name}`)}>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => alert(`Editing ${lead.name}`)}>Edit Lead</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => alert(`Changing status for ${lead.name}`)}>Change Status</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => alert(`Deleting ${lead.name}`)}>Delete Lead</DropdownMenuItem>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Analytics Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold tracking-tight mb-4">Analytics</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><h3 className="font-semibold">Lead Sources</h3></CardHeader>
                            <CardContent>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie data={leadSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                                {leadSourceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value} leads`} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><h3 className="font-semibold">Agent Performance</h3></CardHeader>
                            <CardContent>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <BarChart data={agentPerformanceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="qualified" fill="#8884d8" name="Qualified Leads" />
                                            <Bar dataKey="won" fill="#82ca9d" name="Won Leads" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { LeadsPage };
export default LeadsPage;
