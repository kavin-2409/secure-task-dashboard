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

## Running the Backend Locally

1. Navigate to the backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

The backend will run at:
http://localhost:4000

---

## Environment Variables

Create a `.env` file inside the `backend` folder and add:

MONGO_URI=your_mongodb_connection_string
PORT=4000

The MongoDB database is hosted on MongoDB Atlas. You must create a free cluster and allow network access to connect successfully.

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
