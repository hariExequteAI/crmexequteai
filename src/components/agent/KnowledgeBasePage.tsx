import React, { useState } from 'react';
import { BookOpen, Search, Plus, Star, Pin, Tag, ThumbsUp, ThumbsDown, FileText, Link, Video, Download, Eye, Filter, Clock, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  type: 'document' | 'link' | 'video' | 'faq' | 'procedure';
  category: string;
  tags: string[];
  rating: number;
  views: number;
  isPinned: boolean;
  isBookmarked: boolean;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  attachments?: string[];
}

export const KnowledgeBasePage: React.FC = () => {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([
    {
      id: '1',
      title: 'API Integration Guide',
      content: 'Complete guide for integrating with our REST API including authentication, endpoints, and examples.',
      type: 'document',
      category: 'Technical',
      tags: ['API', 'Integration', 'Development'],
      rating: 4.8,
      views: 245,
      isPinned: true,
      isBookmarked: true,
      author: 'Tech Team',
      createdAt: new Date(2024, 0, 10),
      updatedAt: new Date(2024, 0, 15),
      attachments: ['api-guide.pdf', 'postman-collection.json']
    },
    {
      id: '2',
      title: 'Customer Escalation Process',
      content: 'Step-by-step process for handling customer escalations and when to involve management.',
      type: 'procedure',
      category: 'Support',
      tags: ['Escalation', 'Customer Service', 'Process'],
      rating: 4.6,
      views: 189,
      isPinned: false,
      isBookmarked: false,
      author: 'Support Manager',
      createdAt: new Date(2024, 0, 8),
      updatedAt: new Date(2024, 0, 12),
    },
    {
      id: '3',
      title: 'Product Demo Video',
      content: 'Comprehensive product demonstration covering all major features and use cases.',
      type: 'video',
      category: 'Sales',
      tags: ['Demo', 'Product', 'Sales'],
      rating: 4.9,
      views: 156,
      isPinned: false,
      isBookmarked: true,
      author: 'Product Team',
      createdAt: new Date(2024, 0, 5),
      updatedAt: new Date(2024, 0, 5),
    },
    {
      id: '4',
      title: 'Frequently Asked Questions',
      content: 'Common questions and answers about our products and services.',
      type: 'faq',
      category: 'General',
      tags: ['FAQ', 'Common Issues', 'Quick Reference'],
      rating: 4.4,
      views: 312,
      isPinned: true,
      isBookmarked: false,
      author: 'Support Team',
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 14),
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];
  const types = ['all', ...Array.from(new Set(articles.map(a => a.type)))];

  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesType = selectedType === 'all' || article.type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'views': return b.views - a.views;
        case 'created': return b.createdAt.getTime() - a.createdAt.getTime();
        case 'updated': return b.updatedAt.getTime() - a.updatedAt.getTime();
        default: return 0;
      }
    });

  const pinnedArticles = filteredArticles.filter(a => a.isPinned);
  const regularArticles = filteredArticles.filter(a => !a.isPinned);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'link': return Link;
      case 'video': return Video;
      case 'faq': return BookOpen;
      case 'procedure': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'primary';
      case 'link': return 'secondary';
      case 'video': return 'success';
      case 'faq': return 'warning';
      case 'procedure': return 'danger';
      default: return 'default';
    }
  };

  const handleBookmark = (articleId: string) => {
    setArticles(articles.map(article =>
      article.id === articleId
        ? { ...article, isBookmarked: !article.isBookmarked }
        : article
    ));
  };

  const handlePin = (articleId: string) => {
    setArticles(articles.map(article =>
      article.id === articleId
        ? { ...article, isPinned: !article.isPinned }
        : article
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600">Access documentation, guides, and resources</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={Plus}>
            Request Article
          </Button>
          <Button icon={Plus}>
            Contribute
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Articles</p>
                <p className="text-3xl font-bold text-gray-900">{articles.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bookmarked</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {articles.filter(a => a.isBookmarked).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-green-600">{categories.length - 1}</p>
              </div>
              <Tag className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-purple-600">
                  {articles.reduce((sum, a) => sum + a.views, 0)}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                icon={Search}
                placeholder="Search articles, tags, or content..."
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
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="updated">Recently Updated</option>
              <option value="created">Recently Created</option>
              <option value="rating">Highest Rated</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Pinned Articles */}
      {pinnedArticles.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Pin className="h-5 w-5 mr-2 text-blue-600" />
            Pinned Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pinnedArticles.map((article) => {
              const TypeIcon = getTypeIcon(article.type);
              return (
                <Card key={article.id} hover className="border-blue-200 bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          article.type === 'document' ? 'bg-blue-100' :
                          article.type === 'video' ? 'bg-green-100' :
                          article.type === 'link' ? 'bg-gray-100' :
                          article.type === 'faq' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <TypeIcon className={`h-5 w-5 ${
                            article.type === 'document' ? 'text-blue-600' :
                            article.type === 'video' ? 'text-green-600' :
                            article.type === 'link' ? 'text-gray-600' :
                            article.type === 'faq' ? 'text-yellow-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{article.title}</h3>
                          <p className="text-sm text-gray-500">{article.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Star}
                          onClick={() => handleBookmark(article.id)}
                          className={article.isBookmarked ? 'text-yellow-600' : ''}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Pin}
                          onClick={() => handlePin(article.id)}
                          className="text-blue-600"
                        />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{article.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.updatedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button size="sm">View</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          All Articles ({regularArticles.length})
        </h2>
        <div className="space-y-4">
          {regularArticles.map((article) => {
            const TypeIcon = getTypeIcon(article.type);
            return (
              <Card key={article.id} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        article.type === 'document' ? 'bg-blue-100' :
                        article.type === 'video' ? 'bg-green-100' :
                        article.type === 'link' ? 'bg-gray-100' :
                        article.type === 'faq' ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        <TypeIcon className={`h-6 w-6 ${
                          article.type === 'document' ? 'text-blue-600' :
                          article.type === 'video' ? 'text-green-600' :
                          article.type === 'link' ? 'text-gray-600' :
                          article.type === 'faq' ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                          <Badge variant={getTypeColor(article.type) as any} size="sm">
                            {article.type}
                          </Badge>
                          <Badge variant="secondary" size="sm">
                            {article.category}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{article.content}</p>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          {article.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{article.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Updated {article.updatedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        {article.attachments && article.attachments.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                            <div className="flex space-x-2">
                              {article.attachments.map((attachment, index) => (
                                <Button key={index} variant="outline" size="sm" icon={Download}>
                                  {attachment}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm">View</Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Star}
                        onClick={() => handleBookmark(article.id)}
                        className={article.isBookmarked ? 'text-yellow-600' : ''}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Pin}
                        onClick={() => handlePin(article.id)}
                      />
                      <Button variant="outline" size="sm" icon={ThumbsUp} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};