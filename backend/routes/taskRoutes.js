const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTasksKanban
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation,
  taskFilterValidation
} = require('../middleware/validation');

// All routes are protected
router.use(protect);

// Kanban view route
router.get('/kanban', getTasksKanban);

// Task CRUD routes
router.route('/')
  .get(taskFilterValidation, getTasks)
  .post(createTaskValidation, createTask);

router.route('/:id')
  .get(taskIdValidation, getTask)
  .put(updateTaskValidation, updateTask)
  .delete(taskIdValidation, deleteTask);

// Status update route for drag & drop
router.patch('/:id/status', taskIdValidation, updateTaskStatus);

module.exports = router;
