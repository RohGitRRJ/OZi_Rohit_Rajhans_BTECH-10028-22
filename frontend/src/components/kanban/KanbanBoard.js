import React, { useEffect, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useTasks } from '../../hooks';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import toast from 'react-hot-toast';

const KanbanBoard = () => {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
  } = useTasks();

  const [activeTask, setActiveTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Find which column a task belongs to
  const findContainer = (id) => {
    if (tasks.pending.find(t => t._id === id)) return 'pending';
    if (tasks['in-progress'].find(t => t._id === id)) return 'in-progress';
    if (tasks.completed.find(t => t._id === id)) return 'completed';
    return null;
  };

  // Handle drag start
  const handleDragStart = (event) => {
    const { active } = event;
    const container = findContainer(active.id);
    if (container) {
      const task = tasks[container].find(t => t._id === active.id);
      setActiveTask(task);
    }
  };

  // Handle drag end
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeContainer = findContainer(active.id);
    let overContainer = over.id;

    // If dropped on a task, find its container
    if (!['pending', 'in-progress', 'completed'].includes(overContainer)) {
      overContainer = findContainer(over.id);
    }

    if (!activeContainer || !overContainer) return;

    // Only update if moved to different column
    if (activeContainer !== overContainer) {
      const result = await updateTaskStatus(active.id, overContainer, activeContainer);
      if (result.success) {
        toast.success('Task moved successfully');
      } else {
        toast.error(result.message || 'Failed to move task');
      }
    }
  };

  // Handle task creation
  const handleCreateTask = async (taskData) => {
    setModalLoading(true);
    const result = await createTask(taskData);
    
    if (result.success) {
      toast.success('Task created successfully');
      setIsModalOpen(false);
    } else {
      toast.error(result.message || 'Failed to create task');
    }
    
    setModalLoading(false);
  };

  // Handle task update
  const handleUpdateTask = async (taskData, oldStatus) => {
    setModalLoading(true);
    const result = await updateTask(editingTask._id, taskData, oldStatus);
    
    if (result.success) {
      toast.success('Task updated successfully');
      setIsModalOpen(false);
      setEditingTask(null);
    } else {
      toast.error(result.message || 'Failed to update task');
    }
    
    setModalLoading(false);
  };

  // Handle modal submit
  const handleModalSubmit = (taskData, oldStatus) => {
    if (editingTask) {
      handleUpdateTask(taskData, oldStatus);
    } else {
      handleCreateTask(taskData);
    }
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Handle delete task
  const handleDeleteTask = async (taskId, status) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const result = await deleteTask(taskId, status);
      if (result.success) {
        toast.success('Task deleted successfully');
      } else {
        toast.error(result.message || 'Failed to delete task');
      }
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Column configuration
  const columns = [
    {
      id: 'pending',
      title: 'Pending',
      color: 'yellow',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'blue',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'green',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  if (loading && !Object.values(tasks).some(arr => arr.length > 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchTasks}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
          <p className="text-sm text-gray-500 mt-1">Drag and drop tasks to change their status</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks[column.id]}
              icon={column.icon}
              color={column.color}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? (
            <div className="drag-overlay">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        task={editingTask}
        loading={modalLoading}
      />
    </div>
  );
};

export default KanbanBoard;
