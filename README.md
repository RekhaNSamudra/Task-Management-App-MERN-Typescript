# Task Management App

A full-stack Task Management Application built using the MERN stack with JWT authentication using HTTP-only cookies.

## Features

- User Registration & Login
- JWT Authentication
- HTTP-Only Cookie Authentication
- Protected Routes
- Create Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed
- Filter Tasks by Status
- Responsive UI
- Toast Notifications
- Confirmation Dialog for Delete

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Tailwind CSS 4
- Axios (with credentials support)
- React Router DOM v7
- React Hot Toast (notifications)
- Vite (build tool)

### Backend

- Node.js
- Express.js v5
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- Cookie Parser (for HTTP-only cookies)
- CORS (Cross-Origin requests)

---

## Folder Structure

```bash
backend/
├── src/
│   ├── app.ts                 # Express app configuration
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   └── db.ts              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts  # Login, Register, Logout
│   │   └── taskController.ts  # CRUD operations for tasks
│   ├── middlewares/
│   │   ├── authMiddleware.ts  # JWT verification (cookies/header)
│   │   └── validationMiddleware.ts # Input validation
│   ├── models/
│   │   ├── user.ts            # User schema
│   │   └── task.ts            # Task schema
│   └── routes/
│       ├── authRoutes.ts      # Auth endpoints
│       └── taskRoutes.ts      # Task CRUD endpoints
├── .env                       # Environment variables
└── package.json

frontend/
├── src/
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   ├── api/
│   │   └── axios.ts           # Axios instance with credentials
│   ├── components/
│   │   ├── ProtectedRoute.tsx # Auth check wrapper
│   │   ├── TaskForm.tsx       # Filter buttons component
│   │   ├── TaskFormComponent.tsx # Add/Edit task form
│   │   ├── TaskCard.tsx       # Individual task card
│   │   ├── ErrorAlert.tsx     # Error display
│   │   └── ConfirmationDialog.tsx # Delete confirmation
│   ├── pages/
│   │   ├── Login.tsx          # Login page
│   │   ├── Register.tsx       # Register page
│   │   └── Dashboard.tsx      # Main task dashboard
│   └── types/
│       └── task.ts            # TypeScript interfaces
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
└── package.json
```

---

## Environment Variables

### Backend `.env`

```env
# Server Configuration
PORT=5050
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_secret_key

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend

No `.env` file needed. Backend API URL is hardcoded in `src/api/axios.ts`

---

## Important Notes

- **Development**: `NODE_ENV=development` allows HTTP cookies on localhost
- **Production**: Change to `NODE_ENV=production` (requires HTTPS)
- **JWT Tokens**: Stored in HTTP-only cookies (secure from XSS attacks)
- **CORS**: Configured with `credentials: true` to allow cookie transmission

---

## Installation

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Clone the repository

```bash
git clone <your-repository-url>
cd Task\ Management\ App
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file with variables (see Environment Variables section above)

```bash
npm run dev
# Backend runs on http://localhost:5050
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5050/api

---

## API Endpoints

### Auth Routes

| Method | Endpoint             | Auth Required | Description                        |
| ------ | -------------------- | ------------- | ---------------------------------- |
| POST   | `/api/auth/register` | ❌ No         | Register user                      |
| POST   | `/api/auth/login`    | ❌ No         | Login user (sets HTTP-only cookie) |
| POST   | `/api/auth/logout`   | ✅ Yes        | Logout user                        |

### Task Routes (All require authentication)

| Method | Endpoint         | Auth Required | Description          |
| ------ | ---------------- | ------------- | -------------------- |
| GET    | `/api/tasks`     | ✅ Yes        | Get all user's tasks |
| GET    | `/api/tasks/:id` | ✅ Yes        | Get single task      |
| POST   | `/api/tasks`     | ✅ Yes        | Create task          |
| PUT    | `/api/tasks/:id` | ✅ Yes        | Update task          |
| DELETE | `/api/tasks/:id` | ✅ Yes        | Delete task          |

---

## Authentication Flow

- JWT token is generated on login
- Token is stored in HTTP-only cookies
- Protected APIs verify JWT from cookies
- Logout clears authentication cookie

---

---

## Screenshots

### Login Page

![Login](./screenshots/Login.png)

---

### Register Page

![Register](./screenshots/Register.png)

---

### Edit Task

![Edit Task](./screenshots/Edit%20Tasks.png)

---

### Mark Completed

![Mark Completed](./screenshots/Mark%20completed.png)

---

### Pending Filter

![Pending Filter](./screenshots/Pending%20filter.png)

---

### Completed Filter

![Completed Filter](./screenshots/Completed%20filter.png)

---

### Delete Task

![Delete Task](./screenshots/Delete%20task.png)

---

## Author

Rekha N