# TaskFlow - Kanban Task Management System

A full-stack Task Management application featuring user authentication and a Kanban-style task board with drag-and-drop functionality.

## Project Overview

TaskFlow is a web-based task management system that allows users to organize their tasks using a Kanban board interface. Users can create, update, and delete tasks, and move them between different status columns (Pending, In Progress, Completed) using intuitive drag-and-drop interactions.

### Key Features

- **User Authentication**: Secure signup, login, and logout functionality
- **Profile Management**: Update profile details and change password
- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Kanban Board**: Visual task management with three status columns
- **Drag & Drop**: Move tasks between columns with automatic status updates
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| @dnd-kit | Drag and drop |
| Axios | HTTP client |
| react-hot-toast | Notifications |

## Project Structure

```
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & validation middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── context/     # Auth context
│       ├── hooks/       # Custom hooks
│       └── services/    # API services
```

## Backend Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation Steps

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables (see section below)

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5001`

## Frontend Setup Instructions

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Environment Variables Configuration

### Backend (`backend/.env`)

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/task_management

# JWT Configuration
JWT_SECRET=your_secure_random_secret_key
JWT_EXPIRE=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

| Variable | Description |
|----------|-------------|
| PORT | Server port number |
| NODE_ENV | Environment mode |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT signing |
| JWT_EXPIRE | Token expiration time |
| CLIENT_URL | Frontend URL for CORS |

### Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:5001/api
```

| Variable | Description |
|----------|-------------|
| REACT_APP_API_URL | Backend API base URL |

## API Overview

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/password` | Change password |
| DELETE | `/api/users/profile` | Delete account |

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/kanban` | Get tasks for Kanban board |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id` | Delete task |

### Query Parameters

- Filter by status: `GET /api/tasks?status=pending`
- Sort tasks: `GET /api/tasks?sort=-created_at`

## Running the Application

1. **Start MongoDB** (if running locally):
   ```bash
   brew services start mongodb-community
   ```

2. **Start Backend** (Terminal 1):
   ```bash
   cd backend && npm run dev
   ```

3. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend && npm start
   ```

4. Open `http://localhost:3000` in your browser

## Usage Guide

1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Click "Add Task" button to create new tasks
4. **Manage Tasks**: 
   - Drag and drop tasks between columns to change status
   - Click edit icon to modify task details
   - Click delete icon to remove tasks
5. **Profile**: Click your name in navbar to access profile settings

## Testing

The backend includes comprehensive API tests using Jest and Supertest.

### Running Tests

1. Make sure MongoDB is running locally

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Run tests with coverage report:
   ```bash
   npm test -- --coverage
   ```

### Test Coverage

Tests cover the following areas:
- **Authentication**: Register, login, token validation
- **User Management**: Profile retrieval and updates
- **Task Operations**: CRUD operations, status updates, filtering
- **Error Handling**: Invalid inputs, unauthorized access, not found resources

## Deployment

### Backend Deployment (Render)

1. Create a free account at [Render](https://render.com)
2. Create a new Web Service and connect your GitHub repository
3. Configure the following:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
4. Add environment variables:
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `JWT_EXPIRE`: 7d
   - `CLIENT_URL`: Your frontend URL

### Frontend Deployment (Vercel)

1. Create a free account at [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure the following:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your deployed backend URL + `/api`

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write permissions
3. Add `0.0.0.0/0` to IP Access List (for Render access)
4. Get connection string and use in `MONGODB_URI`

## Author

**Rohit Rajhans**  
Roll Number: BTECH-10028-22
