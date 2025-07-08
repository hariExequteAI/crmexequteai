import React, { useState } from 'react';
import { HelpCircle, Search, Book, Video, MessageCircle, Phone, Mail, ExternalLink, ChevronDown, ChevronRight, Star, ThumbsUp, Clock, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  views: number;
  lastUpdated: Date;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  lastResponse: Date;
}

export const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const [faqs] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How do I make an outbound call?',
      answer: 'To make an outbound call, go to the Calls page and click the "Make Call" button. Enter the phone number or select a contact from your list. You can also click the phone icon next to any contact in your contacts list.',
      category: 'Calls',
      helpful: 45,
      views: 234,
      lastUpdated: new Date(2024, 0, 15)
    },
    {
      id: '2',
      question: 'How do I create a new ticket?',
      answer: 'Navigate to the Tickets page and click "Create Ticket". Fill in the required information including title, description, priority, and assign it to the appropriate contact. You can also create tickets directly from call logs or contact interactions.',
      category: 'Tickets',
      helpful: 38,
      views: 189,
      lastUpdated: new Date(2024, 0, 12)
    },
    {
      id: '3',
      question: 'How do I update my notification preferences?',
      answer: 'Go to Settings > Notifications to customize your notification preferences. You can enable or disable email, push, SMS, and desktop notifications for different types of events like new tickets, incoming calls, and meeting reminders.',
      category: 'Settings',
      helpful: 29,
      views: 156,
      lastUpdated: new Date(2024, 0, 10)
    },
    {
      id: '4',
      question: 'How do I schedule a meeting?',
      answer: 'In the Meetings page, click "Schedule Meeting" and fill in the meeting details including title, description, attendees, and time. You can also add a video conference link and set reminders for all participants.',
      category: 'Meetings',
      helpful: 33,
      views: 198,
      lastUpdated: new Date(2024, 0, 8)
    },
    {
      id: '5',
      question: 'How do I use the AI Assistant?',
      answer: 'Click the "AI Assistant" button in the top navigation to open the AI panel. You can ask questions about your CRM data, get help with tasks, or request information from the knowledge base. The AI can help with call summaries, ticket analysis, and more.',
      category: 'AI Assistant',
      helpful: 52,
      views: 287,
      lastUpdated: new Date(2024, 0, 14)
    }
  ]);

  const [supportTickets] = useState<SupportTicket[]>([
    {
      id: 'ST-001',
      subject: 'Unable to access call recordings',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date(2024, 0, 14),
      lastResponse: new Date(2024, 0, 15)
    },
    {
      id: 'ST-002',
      subject: 'Feature request: Bulk contact import',
      status: 'open',
      priority: 'low',
      createdAt: new Date(2024, 0, 12),
      lastResponse: new Date(2024, 0, 12)
    }
  ]);

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const quickActions = [
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: Video,
      color: 'bg-blue-500',
      action: () => console.log('Open video tutorials')
    },
    {
      title: 'Live Chat Support',
      description: 'Chat with our support team',
      icon: MessageCircle,
      color: 'bg-green-500',
      action: () => console.log('Open live chat')
    },
    {
      title: 'Phone Support',
      description: 'Call our support hotline',
      icon: Phone,
      color: 'bg-purple-500',
      action: () => console.log('Call support')
    },
    {
      title: 'Email Support',
      description: 'Send us an email',
      icon: Mail,
      color: 'bg-orange-500',
      action: () => console.log('Email support')
    }
  ];

  const resources = [
    {
      title: 'User Manual',
      description: 'Complete guide to using the CRM system',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1234
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for developers',
      type: 'Web',
      size: '-',
      downloads: 567
    },
    {
      title: 'Video Training Series',
      description: '10-part video series covering all features',
      type: 'Video',
      size: '1.2 GB',
      downloads: 890
    },
    {
      title: 'Quick Reference Card',
      description: 'Printable reference for common tasks',
      type: 'PDF',
      size: '156 KB',
      downloads: 2345
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600">Get help and find answers to your questions</p>
        </div>
        <Button icon={MessageCircle}>
          Contact Support
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} hover className="cursor-pointer" onClick={action.action}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      icon={Search}
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{faq.question}</h4>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <Badge variant="secondary" size="sm">{faq.category}</Badge>
                            <span className="flex items-center space-x-1">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{faq.helpful}</span>
                            </span>
                            <span>{faq.views} views</span>
                          </div>
                        </div>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4">
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-gray-600 mb-4">{faq.answer}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>Updated {faq.lastUpdated.toLocaleDateString()}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" icon={ThumbsUp}>
                                  Helpful
                                </Button>
                                <Button variant="outline" size="sm">
                                  Not Helpful
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Resources & Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Book className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-500">{resource.description}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                          <span>{resource.type}</span>
                          <span>{resource.size}</span>
                          <span>{resource.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" icon={ExternalLink}>
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Support Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>My Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{ticket.subject}</h4>
                      <Badge
                        variant={
                          ticket.status === 'open' ? 'warning' :
                          ticket.status === 'in-progress' ? 'primary' : 'success'
                        }
                        size="sm"
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>#{ticket.id}</span>
                      <span>{ticket.lastResponse.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Tickets
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-500">+1-800-555-0123</p>
                    <p className="text-xs text-gray-400">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-500">support@company.com</p>
                    <p className="text-xs text-gray-400">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Live Chat</p>
                    <p className="text-sm text-gray-500">Available now</p>
                    <p className="text-xs text-gray-400">Average wait: 2 minutes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CRM System</span>
                  <Badge variant="success" size="sm">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Telephony</span>
                  <Badge variant="success" size="sm">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <Badge variant="success" size="sm">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API</span>
                  <Badge variant="warning" size="sm">Maintenance</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full" icon={ExternalLink}>
                  View Status Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};