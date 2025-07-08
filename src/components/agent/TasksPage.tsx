import React, { useState } from 'react';
import {
  CheckSquare, Plus, Search, Calendar, Clock, Flag, X
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  due: string;
  createdAt: string;
}

export const TasksPage: React.FC = () => {
  // 1. Mock data
  const [tasks, setTasks] = useState<Task[]>([
    {
      _id: 't1',
      title: 'Prepare Q3 Report',
      description: 'Gather sales figures and prepare slides for Q3 review.',
      priority: 'high',
      status: 'in-progress',
      due: '2025-07-15',
      createdAt: '2025-07-01'
    },
    {
      _id: 't2',
      title: 'Client Onboarding Call',
      description: 'Kickoff call with Acme Corp. to discuss requirements.',
      priority: 'medium',
      status: 'todo',
      due: '2025-07-10',
      createdAt: '2025-07-02'
    },
    {
      _id: 't3',
      title: 'Cleanup Stale Tickets',
      description: 'Review and close tickets pending for over 30 days.',
      priority: 'low',
      status: 'completed',
      due: '2025-07-05',
      createdAt: '2025-06-28'
    },
    {
      _id: 't4',
      title: 'Update Knowledge Base',
      description: 'Add troubleshooting guide for new release.',
      priority: 'medium',
      status: 'in-progress',
      due: '2025-07-12',
      createdAt: '2025-07-03'
    }
  ]);

  // 2. UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Task['status']>('all');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState<Task | null>(null);
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    due: ''
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // 3. Filtered view
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 4. Handlers
  const handleToggleTask = (id: string) => {
    setTasks(ts =>
      ts.map(t =>
        t._id === id
          ? {
              ...t,
              status: t.status === 'completed' ? 'in-progress' : 'completed'
            }
          : t
      )
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdateTask = () => {
    if (!formData.title || !formData.due) return;
    if (editingTask) {
      // update
      setTasks(ts =>
        ts.map(t =>
          t._id === editingTask._id
            ? { ...t, ...(formData as Task) }
            : t
        )
      );
    } else {
      // create
      const newTask: Task = {
        _id: Date.now().toString(),
        title: formData.title!,
        description: formData.description || '',
        priority: formData.priority as 'low' | 'medium' | 'high',
        status: 'todo',
        due: formData.due!,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTasks(ts => [newTask, ...ts]);
    }
    setFormData({ title: '', description: '', priority: 'medium', due: '' });
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      due: task.due
    });
    setShowForm(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600">Manage your tasks and to-dos</p>
        </div>
        <Button
          icon={Plus}
          onClick={() => {
            setEditingTask(null);
            setFormData({ title: '', description: '', priority: 'medium', due: '' });
            setShowForm(true);
          }}
        >
          Add Task
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <Input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
              value={formData.description}
              onChange={handleInputChange}
            />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Input
              type="date"
              name="due"
              value={formData.due}
              onChange={handleInputChange}
            />
            <div className="flex space-x-2">
              <Button onClick={handleCreateOrUpdateTask}>
                {editingTask ? 'Update' : 'Create'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingTask(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Details */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setShowDetails(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-2">{showDetails.title}</h2>
            <p className="text-gray-700 mb-2">{showDetails.description}</p>
            <p>
              <b>Priority:</b> {showDetails.priority}
            </p>
            <p>
              <b>Status:</b> {showDetails.status}
            </p>
            <p>
              <b>Due:</b>{' '}
              {new Date(showDetails.due).toLocaleDateString()}
            </p>
            <p>
              <b>Created:</b>{' '}
              {new Date(showDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-3xl font-bold">{tasks.length}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-gray-600">To Do</p>
              <p className="text-3xl font-bold text-orange-600">
                {tasks.filter(t => t.status === 'todo').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600">
                {tasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
            <Flag className="w-8 h-8 text-yellow-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <CheckSquare className="w-8 h-8 text-green-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              icon={Search}
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <Card key={task._id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => handleToggleTask(task._id)}
                  className="mt-1 rounded border-gray-300 text-blue-600"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3
                      className={`text-lg font-semibold ${
                        task.status === 'completed'
                          ? 'text-gray-500 line-through'
                          : 'text-gray-900'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <Badge
                      variant={
                        task.priority === 'high'
                          ? 'danger'
                          : task.priority === 'medium'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {task.priority}
                    </Badge>
                    <Badge
                      variant={
                        task.status === 'completed'
                          ? 'success'
                          : task.status === 'in-progress'
                          ? 'warning'
                          : 'outline'
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <p
                    className={`mb-4 ${
                      task.status === 'completed'
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    }`}
                  >
                    {task.description}
                  </p>
                  <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Due:{' '}
                        {task.due
                          ? new Date(task.due).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        Created:{' '}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetails(task)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
