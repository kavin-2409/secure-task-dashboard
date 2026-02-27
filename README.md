# Secure Task Management Dashboard

## Project Overview
A full-stack secure task management application built using React, TypeScript, Node.js, and MongoDB.

The application allows authenticated users to manage personal tasks with complete CRUD functionality. All API routes are protected using JWT-based authentication.

---

## Tech Stack

### Frontend
- React
- TypeScript
- CSS

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

---

## Development Approach
This project is developed with clean architecture principles, strict TypeScript usage, and containerized using Docker.

---

## Backend Setup

1. Navigate to backend folder
cd backend

2. Install dependencies
npm install

3. Create a .env file inside backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000

4. Start the backend server
npm run dev

Server will run on:
http://localhost:4000

The MongoDB database is hosted on MongoDB Atlas. You must create a free cluster and allow network access to connect successfully.

## How to Obtain MongoDB Connection String

1. Go to https://www.mongodb.com/atlas/database
2. Create a free account and create a free shared cluster.
3. Create a database user (choose any username and password).
4. Go to "Network Access" → Add IP Address → Allow `0.0.0.0/0` (for local testing).
5. Click "Connect" → "Drivers" → Select Node.js.
6. Copy the connection string provided.

It will look like this:

mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskdb

Replace <username> and <password> with the database user you created.

Then paste it into the `.env` file:

MONGO_URI=your_connection_string

You can choose any random string for JWT secret:

JWT_SECRET=mySecretKey123

## Error Handling

The API uses centralized error handling and validation.

Examples:
- Invalid input → 400 Bad Request
- Unauthorized access → 401 Unauthorized
- Invalid resource ID → 400 Invalid resource ID

All errors return JSON responses in this format:

{
  "success": false,
  "message": "Error description"
}

## Authentication APIs

### Register User

POST /api/auth/register

**Body**
{
"email": "[user@gmail.com](mailto:user@gmail.com)",
"password": "123456"
}

Creates a new account. Password is encrypted using bcrypt before storing.

---

### Login User

POST /api/auth/login

**Body**
{
"email": "[user@gmail.com](mailto:user@gmail.com)",
"password": "123456"
}

**Response**
Returns a JWT token.

After successful login, the server generates a JSON Web Token (JWT).
This token must be sent in the Authorization header to access protected APIs.

Example:
Authorization: Bearer <token>

---

## Protected Routes

Some endpoints require authentication.

After logging in, you will receive a JWT token:

{
"message": "Login successful",
"token": "your_jwt_token"
}

To access protected APIs, include the token in the request header:

Authorization: Bearer your_jwt_token

Example:

GET /api/auth/profile

This route verifies the token using middleware.
If the token is valid, access is granted.
If the token is missing or invalid, the server returns **401 Unauthorized**.

### Authentication
POST /api/auth/register
POST /api/auth/login

### Tasks (Protected)
POST   /api/tasks        -> create task
GET    /api/tasks        -> get user tasks
PUT    /api/tasks/:id    -> update own task
DELETE /api/tasks/:id    -> delete own task

---

### Third Party Packages

### bcrypt
Used to securely hash user passwords before storing them in the database. This ensures passwords are never stored in plain text.

### jsonwebtoken (JWT)
Used for stateless authentication. After login, the server issues a token that the client must send with each request to access protected routes.

### express-validator
Validates incoming request data and prevents invalid or malicious input from reaching the database.

### mongoose
ODM (Object Data Modeling) library used to interact with MongoDB using schemas and models.

### cors
Allows the frontend application to securely communicate with the backend API.

### dotenv
Loads environment variables such as database connection string and secret keys from the `.env` file.

### Future Improvements
- Add task due dates and overdue detection
- Implement rate limiting for login attempts
- Add activity logging for user actions
- Improve UI with better responsiveness
- Add unit and integration testing