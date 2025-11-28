# Employee Task Manager

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing employees and tasks with JWT-based authentication.

## 🚀 Tech Stack

### Frontend
- **React** (v18) - UI framework
- **React Router** (v6) - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management for auth and toasts

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Features

- ✅ User authentication (Login/Register) with JWT
- ✅ Protected routes for authorized actions
- ✅ Employee management (CRUD operations)
- ✅ Task management with employee assignment
- ✅ Dashboard with statistics and recent tasks
- ✅ Search functionality for tasks and employees
- ✅ Toast notifications for user feedback
- ✅ Responsive design with Tailwind CSS

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend_1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend_1 root:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/employee_task_db
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   SEED_ADMIN_PASSWORD=password
   ```

4. **Run seed script to populate database:**
   ```bash
   npm run seed
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
   
   Server will run at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   Application will open at `http://localhost:3000`

## 🔐 Default Credentials

After running the seed script, use these credentials to login:

- **Email:** `admin@example.com`
- **Password:** `password`

## 📁 Project Structure

```
employee-task-manager/
├── backend_1/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── employeeController.js # Employee CRUD
│   │   └── taskController.js     # Task CRUD
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Employee.js           # Employee schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── employeeRoutes.js     # Employee endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── scripts/
│   │   └── seed.js               # Database seeding
│   ├── server.js                 # Main server file
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── axios.js          # Axios configuration
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   ├── Sidebar.jsx       # Sidebar menu
    │   │   ├── Toast.jsx         # Toast notifications
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Auth state management
    │   │   └── ToastContext.jsx  # Toast state management
    │   ├── layouts/
    │   │   └── MainLayout.jsx    # Main app layout
    │   ├── pages/
    │   │   ├── Dashboard.jsx     # Dashboard page
    │   │   ├── Login.jsx         # Login/Register page
    │   │   ├── Employees.js      # Employee list
    │   │   ├── AddEmployee.jsx   # Add employee form
    │   │   ├── EditEmployee.jsx  # Edit employee form
    │   │   ├── Tasks.js          # Task list
    │   │   ├── AddTask.jsx       # Add task form
    │   │   └── EditTask.jsx      # Edit task form
    │   ├── App.js                # Main app component
    │   └── index.js              # Entry point
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/` - Health check

### Employees (protected endpoints require JWT token)
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create employee (protected)
- `PUT /api/employees/:id` - Update employee (protected)
- `DELETE /api/employees/:id` - Delete employee (protected)

### Tasks (protected endpoints require JWT token)
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `GET /api/tasks/employee/:employeeId` - Get tasks by employee

## 🎯 Key Features Explained

### Authentication Flow
1. User registers or logs in through the Login page
2. Backend validates credentials and returns JWT token
3. Token is stored in localStorage
4. Axios interceptor automatically attaches token to protected requests
5. Backend middleware verifies token for protected routes

### Protected Routes
- Dashboard (requires login)
- Add/Edit/Delete operations for Employees and Tasks
- Unauthorized users can view but not modify data

### Search Functionality
- Real-time search for employees by name/email
- Real-time search for tasks by title/description
- Search tasks from navbar (redirects to Tasks page with query)

## 🎨 Screenshots

### Login/Register Page
![Login Page](screenshots/login.png)
*Combined login and register form with toggle functionality*

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Overview with statistics, quick actions, and recent tasks*

### Employee List
![Employees](screenshots/employees.png)
*Employee management with search, add, edit, and delete*

### Task List
![Tasks](screenshots/tasks.png)
*Task management with status indicators and employee assignment*

### Add/Edit Forms
![Forms](screenshots/forms.png)
*Clean forms with validation and error handling*

## 🐛 Bug Fixes Implemented

### Fixed Issues:
1. **Duplicate imports in seed.js** - Removed duplicate User and bcrypt imports
2. **Path inconsistency** - Fixed import path in index.js (`./src/config/db.js` → `./config/db.js`)
3. **Missing fields** - Added missing `department` and `role` fields in Employee model usage
4. **Login/Signup logic** - Combined forms with proper state management and error handling
5. **Token handling** - Implemented proper JWT token storage and axios interceptor
6. **Protected routes** - Added ProtectedRoute component to secure sensitive pages

## 🎁 Bonus Features

1. **Toast Notifications** - User-friendly feedback for all actions
2. **Combined Login/Register** - Single page with toggle for better UX
3. **Search Functionality** - Search from navbar and page-level search
4. **Visual Enhancements**:
   - Avatar initials for employees
   - Color-coded task statuses
   - Responsive design
   - Loading states
5. **Dashboard Analytics** - Task distribution and quick actions

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- Protected API routes with middleware
- Token expiration (7 days)
- CORS enabled for frontend-backend communication

## 📝 Assumptions

1. Users can view employees and tasks without login
2. Only authenticated users can create, update, or delete records
3. Each task must be assigned to an employee
4. Default admin account is created via seed script
5. MongoDB is running locally on default port (27017)

## 🚀 Deployment Notes

For production deployment:

1. **Environment Variables:**
   - Use strong JWT secret
   - Configure production MongoDB URI
   - Set appropriate CORS origins

2. **Frontend:**
   - Update API base URL in `src/api/axios.js`
   - Run `npm run build`
   - Serve build folder

3. **Backend:**
   - Remove development dependencies
   - Add proper error handling and logging
   - Configure production server (PM2, nginx)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- React documentation
- Express.js documentation
- MongoDB documentation
- Tailwind CSS
- Stack Overflow community

---

**Note:** Make sure MongoDB is running before starting the backend server. Use `mongod` command or start MongoDB service based on your OS.

For any issues or questions, please open an issue on GitHub.
