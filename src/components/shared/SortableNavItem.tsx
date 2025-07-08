import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableNavItemProps {
  id: string;
  children: React.ReactNode;
}

export const SortableNavItem: React.FC<SortableNavItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'z-10' : ''}`}
    >
      <div className="flex items-center">
        <div
          {...attributes}
          {...listeners}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex-1 ml-6">
          {children}
        </div>
      </div>
    </div>
  );
};