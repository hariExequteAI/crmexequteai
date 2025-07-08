import React, { FC, useState } from 'react';
import {
  BookOpen, Search, Plus, Pin, HelpCircle, Bot,
  Briefcase, FileText, Eye, Clock, User, Edit, Trash2, EyeIcon, X
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

type Department = {
  _id: string;
  name: string;
};

type KnowledgeArticle = {
  _id: string;
  name: string;
  description: string;
  type: 'document' | 'faq' | 'ai-guide' | 'company-reference';
  department: Department;
  forRole: string;
  tags: string[];
  views: number;
  isPinned: boolean;
  createdBy: { name: string; _id: string };
  createdAt: string;
  updatedAt: string;
};

export const KnowledgeBaseManagement: FC = () => {
  // ---- DUMMY DEPARTMENTS ----
  const [departments] = useState<Department[]>([
    { _id: 'd1', name: 'Onboarding' },
    { _id: 'd2', name: 'Support' },
    { _id: 'd3', name: 'AI Services' },
    { _id: 'd4', name: 'HR' },
  ]);

  // ---- DUMMY ARTICLES ----
  const [articles, setArticles] = useState<KnowledgeArticle[]>([
    {
      _id: 'a1',
      name: 'Getting Started Guide',
      description: `Welcome to the platform! This document walks you through your first steps:

1. Create your first project  
2. Invite team members  
3. Configure your workspace  
4. Start collaborating`,
      type: 'document',
      department: departments[0],
      forRole: 'agent',
      tags: ['intro', 'setup'],
      views: 120,
      isPinned: true,
      createdBy: { name: 'Alice Admin', _id: 'u1' },
      createdAt: '2024-01-10T09:30:00Z',
      updatedAt: '2024-02-01T14:45:00Z',
    },
    {
      _id: 'a2',
      name: 'How to Reset Password',
      description: `**Q:** I forgot my password.  
**A:** Click "Forgot password" on the login screen, enter your email, and follow the emailed link.`,
      type: 'faq',
      department: departments[1],
      forRole: 'all',
      tags: ['password', 'login', 'help'],
      views: 340,
      isPinned: false,
      createdBy: { name: 'Bob Support', _id: 'u2' },
      createdAt: '2024-01-15T11:00:00Z',
      updatedAt: '2024-01-15T11:00:00Z',
    },
    {
      _id: 'a3',
      name: 'AI Assistant Best Practices',
      description: `Use the AI Assistant to draft email replies:

- Start with a clear prompt  
- Provide relevant context  
- Review and edit before sending  
- Tag with \`ai-guide\``,
      type: 'ai-guide',
      department: departments[2],
      forRole: 'agent',
      tags: ['ai', 'assistant', 'guide'],
      views: 78,
      isPinned: false,
      createdBy: { name: 'Carol AI', _id: 'u3' },
      createdAt: '2024-02-05T08:20:00Z',
      updatedAt: '2024-02-06T10:15:00Z',
    },
    {
      _id: 'a4',
      name: 'Company Holiday Calendar',
      description: `**2024 Company Holidays**  
- New Year’s Day: Jan 1  
- Memorial Day: May 27  
- Independence Day: Jul 4  
- Thanksgiving: Nov 28  
- Christmas Day: Dec 25`,
      type: 'company-reference',
      department: departments[3],
      forRole: 'all',
      tags: ['holidays', 'calendar'],
      views: 210,
      isPinned: true,
      createdBy: { name: 'Dana HR', _id: 'u4' },
      createdAt: '2023-12-01T07:45:00Z',
      updatedAt: '2023-12-01T07:45:00Z',
    },
  ]);

  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | KnowledgeArticle['type']>('all');
  const [viewing, setViewing] = useState<KnowledgeArticle | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<KnowledgeArticle | null>(null);
  const [form, setForm] = useState<Partial<KnowledgeArticle> & { tagInput?: string }>({});

  const filtered = articles
    .filter(a => {
      const searchMatch = [
        a.name,
        a.description,
        ...a.tags
      ].some(str => str.toLowerCase().includes(searchTerm.toLowerCase()));
      const typeMatch = selectedType === 'all' || a.type === selectedType;
      return searchMatch && typeMatch;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const getIcon = (type: KnowledgeArticle['type']) => {
    switch (type) {
      case 'document': return FileText;
      case 'faq': return HelpCircle;
      case 'ai-guide': return Bot;
      case 'company-reference': return Briefcase;
      default: return FileText;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Knowledge Base Management</h1>
        <Button icon={Plus} onClick={() => { setEditing(null); setForm({}); setFormOpen(true); }}>
          Add New
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-wrap gap-4">
          <Input
            icon={Search}
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value as any)}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All Types</option>
            <option value="document">Document</option>
            <option value="faq">FAQ</option>
            <option value="ai-guide">AI Guide</option>
            <option value="company-reference">Company Reference</option>
          </select>
        </CardContent>
      </Card>

      {/* Loading or Empty */}
      {loading
        ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )
        : filtered.length === 0
          ? (
            <Card>
              <CardContent className="py-8 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || selectedType !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating a new knowledge article'}
                </p>
              </CardContent>
            </Card>
          )
          : filtered.map(a => {
            const Icon = getIcon(a.type);
            return (
              <Card key={a._id}>
                <CardContent className="flex justify-between items-start gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{a.name}</h3>
                      <p className="text-sm text-gray-500 truncate w-72">{a.description}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {a.tags.map((t, i) => (
                          <Badge key={i} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-500 space-x-2 flex-wrap">
                        <User className="h-4 w-4" /><span>{a.createdBy.name}</span>
                        <Eye className="h-4 w-4" /><span>{a.views}</span>
                        <Clock className="h-4 w-4" /><span>{new Date(a.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-start">
                    <Button icon={EyeIcon} variant="ghost" onClick={() => setViewing(a)} />
                    <Button icon={Pin} variant={a.isPinned ? 'default' : 'outline'} />
                    <Button icon={Edit} variant="ghost" />
                    <Button icon={Trash2} variant="destructive" />
                  </div>
                </CardContent>
              </Card>
            );
          })}

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{viewing.name}</h2>
              <button onClick={() => setViewing(null)}><X className="w-5 h-5" /></button>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{viewing.description}</p>
          </div>
        </div>
      )}

      {/* Form Modal (unchanged) */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            {/* ...your existing form code here... */}
          </div>
        </div>
      )}
    </div>
  );
};
