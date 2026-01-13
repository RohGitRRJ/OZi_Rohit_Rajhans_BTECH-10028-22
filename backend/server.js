const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/database');
const { authRoutes, userRoutes, taskRoutes } = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// CORS configuration
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Task Management API',
    version: '1.0.0',
    documentation: '/api/health'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || config.port;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log(`MongoDB URI configured: ${config.mongoUri ? 'Yes' : 'No'}`);
});

module.exports = app;
