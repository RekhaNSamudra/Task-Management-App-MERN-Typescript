# Task Management App - Backend Setup

## Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)

## Installation

1. **Clone/Navigate to the backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and update:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong random secret key (generate one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `FRONTEND_URL`: Your frontend URL (default: http://localhost:3000)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The server should run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Tasks (All require Bearer token in Authorization header)
- `POST /api/tasks` - Create a new task
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "pending"
  }
  ```

- `GET /api/tasks` - Get all user's tasks

- `GET /api/tasks/:id` - Get a single task

- `PUT /api/tasks/:id` - Update a task
  ```json
  {
    "title": "Updated title",
    "status": "completed"
  }
  ```

- `DELETE /api/tasks/:id` - Delete a task

## Technology Stack
- Express.js - REST API framework
- MongoDB - Database
- Mongoose - ODM for MongoDB
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin resource sharing
