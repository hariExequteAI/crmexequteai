import React from 'react';
import { NavLink } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableNavItem } from './SortableNavItem';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import * as Icons from 'lucide-react';

export const Navigation: React.FC = () => {
  const { navItems, updateNavItems } = useApp();
  const { user } = useAuth();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = navItems.findIndex(item => item.id === active.id);
      const newIndex = navItems.findIndex(item => item.id === over.id);
      
      const reorderedItems = arrayMove(navItems, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index + 1
      }));
      
      updateNavItems(reorderedItems);
    }
  };

  // Filter nav items based on user role
  const visibleNavItems = navItems
    .filter(item => item.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-full flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Icons.Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">CRM AI</h1>
            <p className="text-xs text-gray-500 capitalize">{user?.role} Dashboard</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={visibleNavItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-1 px-3">
              {visibleNavItems.map((item) => {
                const IconComponent = (Icons as any)[item.icon] || Icons.Circle;
                
                return (
                  <SortableNavItem key={item.id} id={item.id}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`
                      }
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SortableNavItem>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <Icons.User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};