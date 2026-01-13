import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const KanbanColumn = ({ id, title, tasks, icon, color, onEditTask, onDeleteTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const colorClasses = {
    yellow: {
      header: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-600',
      badge: 'bg-yellow-100 text-yellow-700'
    },
    blue: {
      header: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700'
    },
    green: {
      header: 'bg-green-50 border-green-200',
      icon: 'text-green-600',
      badge: 'bg-green-100 text-green-700'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="flex-1 min-w-[280px] max-w-[400px]">
      {/* Column Header */}
      <div className={`rounded-t-lg border ${colors.header} p-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={colors.icon}>{icon}</span>
            <h2 className="font-semibold text-gray-800">{title}</h2>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}>
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Column Body */}
      <div
        ref={setNodeRef}
        className={`bg-gray-100 rounded-b-lg p-3 kanban-column transition-colors ${
          isOver ? 'bg-primary-50 ring-2 ring-primary-300' : ''
        }`}
      >
        <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                <p>No tasks</p>
                <p className="text-xs mt-1">Drag tasks here or create new ones</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
