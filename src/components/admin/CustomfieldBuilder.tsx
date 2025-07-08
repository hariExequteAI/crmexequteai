import React, { useState } from 'react';
import {
  Plus, Trash2, Edit3, Save, X, Type, Calendar, Hash, List, Upload, Download,
  Menu, Search, Eye, GripVertical
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type FieldType =
  | 'text' | 'number' | 'date'
  | 'dropdown' | 'checkbox' | 'radio'
  | 'file';

interface CustomField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
}

export const CustomFieldBuilder: React.FC = () => {
  // ←– Now seeded with dummy fields
  const [fields, setFields] = useState<CustomField[]>([
    {
      id: 'f1',
      label: 'Full Name',
      type: 'text',
    },
    {
      id: 'f2',
      label: 'Age',
      type: 'number',
    },
    {
      id: 'f3',
      label: 'Date of Birth',
      type: 'date',
    },
    {
      id: 'f4',
      label: 'Department',
      type: 'dropdown',
      options: ['Sales','Engineering','HR','Support'],
    },
    {
      id: 'f5',
      label: 'Newsletter Opt-in',
      type: 'checkbox',
      options: ['Email','SMS'],
    },
    {
      id: 'f6',
      label: 'Gender',
      type: 'radio',
      options: ['Male','Female','Other'],
    },
  ]);

  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState<FieldType>('text');
  const [newOptions, setNewOptions] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState(false);

  // Dummy stubs
  const handleExport = () => alert('Export coming soon!');
  const handleImport = () => alert('Import coming soon!');
  const handleBulk = () => alert('Bulk actions coming soon!');

  const addField = () => {
    if (!newLabel.trim()) return;
    const f: CustomField = {
      id: Date.now().toString(),
      label: newLabel.trim(),
      type: newType,
      options: ['dropdown','checkbox','radio'].includes(newType)
        ? newOptions.split(',').map(o => o.trim())
        : undefined
    };
    setFields(prev => [...prev, f]);
    resetForm();
  };

  const startEdit = (f: CustomField) => {
    setEditingId(f.id);
    setNewLabel(f.label);
    setNewType(f.type);
    setNewOptions(f.options?.join(', ') || '');
  };
  const saveEdit = () => {
    setFields(prev => prev.map(f =>
      f.id === editingId
        ? { ...f,
            label: newLabel.trim(),
            type: newType,
            options: ['dropdown','checkbox','radio'].includes(newType)
              ? newOptions.split(',').map(o => o.trim())
              : undefined
          }
        : f
    ));
    resetForm();
  };
  const cancelEdit = () => resetForm();
  const resetForm = () => {
    setEditingId(null);
    setNewLabel('');
    setNewType('text');
    setNewOptions('');
  };

  const deleteField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
  };

  const onDragEnd = (res: any) => {
    if (!res.destination) return;
    const arr = Array.from(fields);
    const [m] = arr.splice(res.source.index, 1);
    arr.splice(res.destination.index, 0, m);
    setFields(arr);
  };

  const filtered = fields.filter(f =>
    f.label.toLowerCase().includes(search.toLowerCase())
  );

  const typeIcon = (t: FieldType) => {
    switch (t) {
      case 'text':     return <Type className="h-4 w-4 text-blue-500"/>;
      case 'number':   return <Hash className="h-4 w-4 text-indigo-500"/>;
      case 'date':     return <Calendar className="h-4 w-4 text-green-500"/>;
      case 'dropdown': return <List className="h-4 w-4 text-purple-500"/>;
      case 'checkbox': return <List className="h-4 w-4 text-purple-500"/>;
      case 'radio':    return <List className="h-4 w-4 text-purple-500"/>;
      case 'file':     return <Upload className="h-4 w-4 text-yellow-500"/>;
      default:         return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Custom Field Builder</h1>
        <div className="flex space-x-2">
          <Button variant="outline" icon={Eye} onClick={() => setPreview(p => !p)}>
            {preview ? 'Exit Preview' : 'Preview'}
          </Button>
          <Button variant="outline" icon={Download} onClick={handleExport}>
            Export
          </Button>
          <Button variant="outline" icon={Upload} onClick={handleImport}>
            Import
          </Button>
          <Button variant="outline" icon={Menu} onClick={handleBulk}>
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Builder Form */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Field label"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
            />
            <select
              className="border rounded px-3 py-2"
              value={newType}
              onChange={e => setNewType(e.target.value as FieldType)}
            >
              {(['text','number','date','dropdown','checkbox','radio','file'] as FieldType[])
                .map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {(newType === 'dropdown' || newType==='checkbox' || newType==='radio') && (
              <Input
                placeholder="Options (comma-separated)"
                value={newOptions}
                onChange={e => setNewOptions(e.target.value)}
              />
            )}
            <div className="flex space-x-2">
              {editingId ? (
                <>
                  <Button icon={Save} onClick={saveEdit}>Save</Button>
                  <Button variant="outline" icon={X} onClick={cancelEdit}>Cancel</Button>
                </>
              ) : (
                <Button icon={Plus} onClick={addField}>Add Field</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
          <Input
            placeholder="Search fields..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Draggable List */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="cfb">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {filtered.map((f, i) => (
                <Draggable key={f.id} draggableId={f.id} index={i}>
                  {p => (
                    <Card
                      ref={p.innerRef}
                      {...p.draggableProps}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="flex justify-between items-center p-4">
                        <div className="flex items-center space-x-3">
                          <div {...p.dragHandleProps} className="cursor-move">
                            <GripVertical className="h-5 w-5 text-gray-400"/>
                          </div>
                          {typeIcon(f.type)}
                          <span className="font-medium">{f.label}</span>
                          {f.options && <Badge variant="outline">{f.options.join(', ')}</Badge>}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" icon={Edit3} onClick={() => startEdit(f)}/>
                          <Button size="sm" variant="outline" icon={Trash2} onClick={() => deleteField(f.id)}/>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Preview */}
      {preview && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
          <Card>
            <CardContent className="space-y-6 p-6">
              {filtered.map(f => (
                <div key={f.id} className="space-y-1">
                  <label className="block font-medium">{f.label}</label>
                  {f.type === 'text'     && <Input placeholder={f.label} />}
                  {f.type === 'number'   && <Input type="number" placeholder={f.label} />}
                  {f.type === 'date'     && <Input type="date" />}
                  {f.type === 'dropdown' && (
                    <select className="border rounded px-3 py-2 w-full">
                      {f.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                  )}
                  {f.type === 'checkbox' && f.options?.map(o => (
                    <div key={o} className="flex items-center">
                      <input type="checkbox" className="mr-2"/>
                      <label>{o}</label>
                    </div>
                  ))}
                  {f.type === 'radio' && f.options?.map(o => (
                    <div key={o} className="flex items-center">
                      <input type="radio" name={f.id} className="mr-2"/>
                      <label>{o}</label>
                    </div>
                  ))}
                  {f.type === 'file' && <Input type="file" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
