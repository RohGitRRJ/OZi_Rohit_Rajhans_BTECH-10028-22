import { useState, useCallback } from 'react';
import { taskService } from '../services';

/**
 * Custom hook for task operations
 */
const useTasks = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    'in-progress': [],
    completed: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getTasksKanban();
      if (response.success) {
        setTasks(response.data.kanban);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      if (response.success) {
        const newTask = response.data.task;
        setTasks(prev => ({
          ...prev,
          [newTask.status]: [...prev[newTask.status], newTask]
        }));
        return { success: true, task: newTask };
      }
      return { success: false, message: response.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to create task' };
    }
  }, []);

  const updateTask = useCallback(async (taskId, taskData, oldStatus) => {
    try {
      const response = await taskService.updateTask(taskId, taskData);
      if (response.success) {
        const updatedTask = response.data.task;
        
        setTasks(prev => {
          const newTasks = { ...prev };
          
          // If status changed, move task to new column
          if (oldStatus && oldStatus !== updatedTask.status) {
            newTasks[oldStatus] = prev[oldStatus].filter(t => t._id !== taskId);
            newTasks[updatedTask.status] = [...prev[updatedTask.status], updatedTask];
          } else {
            // Update in place
            const status = updatedTask.status;
            newTasks[status] = prev[status].map(t => 
              t._id === taskId ? updatedTask : t
            );
          }
          
          return newTasks;
        });
        
        return { success: true, task: updatedTask };
      }
      return { success: false, message: response.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to update task' };
    }
  }, []);

  const updateTaskStatus = useCallback(async (taskId, newStatus, oldStatus) => {
    // Optimistic update
    setTasks(prev => {
      const task = prev[oldStatus].find(t => t._id === taskId);
      if (!task) return prev;
      
      return {
        ...prev,
        [oldStatus]: prev[oldStatus].filter(t => t._id !== taskId),
        [newStatus]: [...prev[newStatus], { ...task, status: newStatus }]
      };
    });

    try {
      const response = await taskService.updateTaskStatus(taskId, newStatus);
      if (!response.success) {
        // Revert on failure
        await fetchTasks();
        return { success: false, message: response.message };
      }
      return { success: true };
    } catch (err) {
      // Revert on error
      await fetchTasks();
      return { success: false, message: err.response?.data?.message || 'Failed to update status' };
    }
  }, [fetchTasks]);

  const deleteTask = useCallback(async (taskId, status) => {
    try {
      const response = await taskService.deleteTask(taskId);
      if (response.success) {
        setTasks(prev => ({
          ...prev,
          [status]: prev[status].filter(t => t._id !== taskId)
        }));
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to delete task' };
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    clearError: () => setError(null)
  };
};

export default useTasks;
