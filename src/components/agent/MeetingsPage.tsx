import React, { useState } from 'react';
import { Calendar, Plus, Search, Video, Clock, Users, MapPin, Bell, Edit, Trash2, ExternalLink, Phone, Mail } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Meeting } from '../../types';

export const MeetingsPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Technical Review with Alice Johnson',
      description: 'Review integration requirements and discuss timeline for API implementation',
      startTime: new Date(2024, 0, 18, 14, 0),
      endTime: new Date(2024, 0, 18, 15, 0),
      attendees: ['Sarah Agent', 'Alice Johnson', 'Tech Lead'],
      contactId: '1',
      meetingUrl: 'https://zoom.us/j/123456789',
      notes: 'Prepare API documentation and integration examples'
    },
    {
      id: '2',
      title: 'Weekly Team Standup',
      description: 'Weekly sync with the sales team to discuss progress and blockers',
      startTime: new Date(2024, 0, 19, 9, 0),
      endTime: new Date(2024, 0, 19, 9, 30),
      attendees: ['Sarah Agent', 'Mike Sales', 'Team Lead', 'Product Manager'],
      meetingUrl: 'https://teams.microsoft.com/l/meetup-join/123',
      notes: 'Review weekly metrics and upcoming client meetings'
    },
    {
      id: '3',
      title: 'Customer Onboarding - Bob Smith',
      description: 'Initial onboarding session for new enterprise client',
      startTime: new Date(2024, 0, 20, 11, 0),
      endTime: new Date(2024, 0, 20, 12, 0),
      attendees: ['Sarah Agent', 'Bob Smith', 'Implementation Specialist'],
      contactId: '2',
      meetingUrl: 'https://zoom.us/j/987654321',
      notes: 'Prepare onboarding checklist and account setup guide'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingMeetings = filteredMeetings.filter(meeting => meeting.startTime > new Date());
  const todaysMeetings = filteredMeetings.filter(meeting => {
    const today = new Date();
    const meetingDate = meeting.startTime;
    return meetingDate.toDateString() === today.toDateString();
  });

  const getMeetingStatus = (meeting: Meeting) => {
    const now = new Date();
    const start = meeting.startTime;
    const end = meeting.endTime;
    
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'active';
    return 'completed';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'primary';
      case 'active': return 'success';
      case 'completed': return 'secondary';
      default: return 'default';
    }
  };

  const formatDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
          <p className="text-gray-600">Manage your meetings and appointments</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={Calendar}>
            Sync Calendar
          </Button>
          <Button icon={Plus}>Schedule Meeting</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Meetings</p>
                <p className="text-3xl font-bold text-gray-900">{todaysMeetings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-green-600">8</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Now</p>
                <p className="text-3xl font-bold text-red-600">
                  {meetings.filter(m => getMeetingStatus(m) === 'active').length}
                </p>
              </div>
              <Video className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-3xl font-bold text-purple-600">24h</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                icon={Search}
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                List View
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'primary' : 'outline'}
                onClick={() => setViewMode('calendar')}
              >
                Calendar View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Meeting Alert */}
      {meetings.some(m => getMeetingStatus(m) === 'active') && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Meeting in Progress</h3>
                  <p className="text-green-700">Technical Review with Alice Johnson</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" icon={ExternalLink}>
                  Join Meeting
                </Button>
                <Button size="sm">End Meeting</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => {
          const status = getMeetingStatus(meeting);
          return (
            <Card key={meeting.id} hover>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                      <Badge variant={getStatusColor(status) as any}>
                        {status}
                      </Badge>
                      {meeting.meetingUrl && (
                        <Badge variant="primary" size="sm">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{meeting.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {meeting.startTime.toLocaleDateString()} at {meeting.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{meeting.attendees.length} attendees</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDuration(meeting.startTime, meeting.endTime)}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Attendees:</p>
                      <div className="flex flex-wrap gap-2">
                        {meeting.attendees.map((attendee, index) => (
                          <Badge key={index} variant="secondary" size="sm">
                            {attendee}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {meeting.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                        <p className="text-sm text-gray-600">{meeting.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    {meeting.meetingUrl && status === 'upcoming' && (
                      <Button size="sm" icon={ExternalLink}>
                        Join Meeting
                      </Button>
                    )}
                    {status === 'active' && (
                      <Button variant="danger" size="sm">
                        End Meeting
                      </Button>
                    )}
                    <Button variant="outline" size="sm" icon={Edit} />
                    <Button variant="outline" size="sm" icon={Bell} />
                    <Button variant="outline" size="sm" icon={Trash2} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};