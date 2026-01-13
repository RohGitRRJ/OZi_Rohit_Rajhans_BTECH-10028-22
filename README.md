# TaskFlow - Kanban Task Management System

A full-stack Task Management application with user authentication and a Kanban-style task board. Built with Node.js, Express, MongoDB, React, and Tailwind CSS.

![TaskFlow Banner](https://via.placeholder.com/800x400?text=TaskFlow+-+Kanban+Task+Manager)

## 🚀 Features

### User Management
- ✅ User registration with validation
- ✅ Secure login/logout with JWT authentication
- ✅ Update profile information
- ✅ Change password
- ✅ Delete account

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Tasks include title, description, status, and due date
- ✅ Filter tasks by status
- ✅ User-specific tasks (private to each user)

### Kanban Board
- ✅ Three columns: Pending, In Progress, Completed
- ✅ Drag-and-drop functionality to move tasks between columns
- ✅ Real-time status updates persisted to backend
- ✅ Visual indicators for overdue tasks

### UI/UX
- ✅ Clean, minimal design with Tailwind CSS
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Toast notifications for user feedback
- ✅ Loading states and error handling

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Context API
- **Drag & Drop**: @dnd-kit
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: react-hot-toast

## 📁 Project Structure

```
rohitrajhans_rollnumber/
├── backend/
│   ├── config/
│   │   ├── config.js         # Environment configuration
│   │   └── database.js       # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js # Authentication logic
│   │   ├── userController.js # User management
│   │   └── taskController.js # Task CRUD operations
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication middleware
│   │   ├── errorHandler.js   # Global error handling
│   │   └── validation.js     # Input validation rules
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Task.js           # Task schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── userRoutes.js     # User endpoints
│   │   └── taskRoutes.js     # Task endpoints
│   ├── server.js             # Express app entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/         # Login & Register forms
│   │   │   ├── kanban/       # Kanban board components
│   │   │   ├── layout/       # Navbar & Layout
│   │   │   └── profile/      # Profile management
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── hooks/
│   │   │   └── useTasks.js
│   │   ├── services/
│   │   │   ├── api.js        # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   └── taskService.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
└── README.md
```

## ⚙️ Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/task_management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

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

4. Update `.env` with your configuration:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `JWT_SECRET` to a secure random string

5. Start the server:
   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

### Frontend Setup

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

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update profile | Yes |
| DELETE | `/api/users/profile` | Delete account | Yes |
| PUT | `/api/users/password` | Change password | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks | Yes |
| GET | `/api/tasks/kanban` | Get tasks for Kanban | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| PATCH | `/api/tasks/:id/status` | Update status | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

### Query Parameters

- `GET /api/tasks?status=pending` - Filter tasks by status
- `GET /api/tasks?sort=-created_at` - Sort tasks (prefix `-` for descending)

### Request/Response Examples

#### Register User
```json
// POST /api/auth/register
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

#### Create Task
```json
// POST /api/tasks
// Request
{
  "title": "Complete project",
  "description": "Finish the task management system",
  "status": "pending",
  "due_date": "2026-01-20"
}

// Response
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "...",
      "title": "Complete project",
      "description": "Finish the task management system",
      "status": "pending",
      "due_date": "2026-01-20T00:00:00.000Z",
      "created_at": "2026-01-13T00:00:00.000Z"
    }
  }
}
```

## 🔒 Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT-based authentication
- Protected routes require valid token
- Input validation and sanitization
- CORS configuration for allowed origins
- Environment variables for sensitive data

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full Kanban board with side-by-side columns
- **Tablet**: Columns stack or scroll horizontally
- **Mobile**: Single column view with horizontal scrolling

## 🎨 Screenshots

### Dashboard - Kanban Board
![Kanban Board](https://via.placeholder.com/800x500?text=Kanban+Board+Screenshot)

### Task Modal
![Task Modal](https://via.placeholder.com/400x300?text=Task+Modal+Screenshot)

### Mobile View
![Mobile View](https://via.placeholder.com/300x600?text=Mobile+View+Screenshot)

## 📝 Future Enhancements

- [ ] Task labels/tags
- [ ] Due date reminders
- [ ] Task comments
- [ ] Team collaboration
- [ ] Task attachments
- [ ] Dark mode
- [ ] Export tasks to CSV

## 👤 Author

**Rohit Rajhans**

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ for the SDE Assignment
