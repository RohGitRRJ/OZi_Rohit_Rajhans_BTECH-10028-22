import api from './api';

/**
 * Task service for CRUD operations
 */
const taskService = {
  /**
   * Get all tasks with optional filters
   */
  getTasks: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.sort) params.append('sort', filters.sort);
    
    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },

  /**
   * Get tasks grouped by status for Kanban board
   */
  getTasksKanban: async () => {
    const response = await api.get('/tasks/kanban');
    return response.data;
  },

  /**
   * Get single task by ID
   */
  getTask: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },

  /**
   * Create a new task
   */
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  /**
   * Update a task
   */
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  /**
   * Update task status (for drag & drop)
   */
  updateTaskStatus: async (taskId, status) => {
    const response = await api.patch(`/tasks/${taskId}/status`, { status });
    return response.data;
  },

  /**
   * Delete a task
   */
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  }
};

export default taskService;
