import React, { useState } from 'react';
import { X, Send, Paperclip, Star, Pin, Tag, ThumbsUp, ThumbsDown, Bot, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const AIPanel: React.FC = () => {
  const { isAIPanelOpen, toggleAIPanel, aiMessages, addAIMessage } = useApp();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: message,
      type: 'user' as const,
      timestamp: new Date()
    };

    addAIMessage(userMessage);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `I can help you with "${message}". Let me analyze your request and provide relevant information from the knowledge base.`,
        type: 'ai' as const,
        timestamp: new Date()
      };
      addAIMessage(aiResponse);
      setIsLoading(false);
    }, 1500);
  };

  if (!isAIPanelOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[70%] bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
            <p className="text-sm text-gray-500">Knowledge-powered workspace</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleAIPanel} icon={X} />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {aiMessages.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to AI Assistant</h3>
                <p className="text-gray-500">Ask questions, get insights, or request help with your CRM tasks.</p>
              </div>
            ) : (
              aiMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-3xl ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }`}>
                      {msg.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {msg.type === 'ai' && (
                      <div className="flex flex-col space-y-1">
                        <Button variant="ghost" size="sm" icon={ThumbsUp} />
                        <Button variant="ghost" size="sm" icon={ThumbsDown} />
                        <Button variant="ghost" size="sm" icon={Pin} />
                        <Button variant="ghost" size="sm" icon={Star} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" icon={Paperclip} />
              <div className="flex-1">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything about your CRM data..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                icon={Send}
              >
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Knowledge Panel */}
        <div className="w-80 border-l border-gray-200 p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-4">Knowledge Base</h3>
          <div className="space-y-3">
            <Card padding="sm" hover>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-sm text-gray-900">API Integration Guide</h4>
                  <p className="text-xs text-gray-500 mt-1">Last updated 2 days ago</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Pin className="h-3 w-3 text-gray-400" />
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                </div>
              </div>
            </Card>
            
            <Card padding="sm" hover>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-sm text-gray-900">Customer Escalation Process</h4>
                  <p className="text-xs text-gray-500 mt-1">Last updated 1 week ago</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};