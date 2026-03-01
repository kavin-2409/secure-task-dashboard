# Secure Task Management Dashboard

## Overview

Secure Task Management Dashboard is a full-stack web application that allows users to securely manage personal tasks.

The system provides authentication, protected APIs, and complete CRUD operations for tasks.
All user data is protected using JWT authentication and passwords are securely hashed using bcrypt.

This project demonstrates real-world backend architecture, authentication flow, validation, and Docker-based deployment.

---

## Features

* User registration and login
* JWT-based authentication
* Protected API routes
* Create, view, update, and delete tasks
* Request validation
* Centralized error handling
* Full-stack Docker deployment

---

## Tech Stack

#### Frontend

* React
* TypeScript
* Vite

#### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

#### Security

* bcrypt password hashing
* JSON Web Token (JWT) authentication
* Authorization middleware

#### DevOps

* Docker
* Docker Compose

---

## Project Architecture

The backend follows layered architecture:

* Routes → API endpoints
* Controllers → Business logic
* Models → Database schema
* Middleware → Authentication & validation
* Utils → Token generation helpers

This improves scalability, readability, and maintainability.

---

## Running the Project (Recommended — Docker)

The application is fully containerized.
No need to install Node.js or MongoDB locally.

### Step 1 — Clone Repository

git clone <your-github-repo-link>
cd secure-task-management

### Step 2 — Run Application

docker compose up --build

(First run may take 2-5 minutes)

---

## Access URLs

Frontend
http://localhost:3000

Backend API
http://localhost:4000

MongoDB
mongodb://localhost:27017

---

## How to Use

1. Open the frontend URL
2. Click Register
3. Create an account
4. Login
5. Start adding tasks

No additional configuration required.

---

## API Endpoints

### Authentication

#### Register

POST /api/auth/register

Body
{
"email": "[user@gmail.com](mailto:user@gmail.com)",
"password": "123456"
}

#### Login

POST /api/auth/login

Body
{
"email": "[user@gmail.com](mailto:user@gmail.com)",
"password": "123456"
}

Response
{
"message": "Login successful",
"token": "jwt_token"
}

---

### Task APIs (Protected)

All task routes require header:

Authorization: Bearer <JWT Token>

#### Get Tasks

GET /api/tasks

#### Create Task

POST /api/tasks
{
"title": "Complete assignment",
"description": "Finish backend module"
}

#### Update Task

PUT /api/tasks/:id

#### Delete Task

DELETE /api/tasks/:id

---

## Security Implementation

* Passwords stored as hashed values using bcrypt
* Stateless authentication using JWT
* Protected routes using middleware
* Request validation using express-validator
* Centralized error handling

---

## Run Without Docker (Optional)

### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

Create a `.env` file inside backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000

---

## Future Improvements

* Task deadlines
* Notifications
* Refresh tokens
* Unit and integration testing
* Cloud deployment

---
---

## Third-Party Packages Used

### Backend Dependencies

**express**
Used to build the REST API server and handle HTTP requests and routing.

**mongoose**
MongoDB Object Data Modeling (ODM) library.
It allows defining schemas and interacting with MongoDB using models instead of raw queries.

**bcrypt**
Used to hash user passwords securely before storing them in the database.
Passwords are never stored in plain text, preventing credential leaks even if the database is compromised.

**jsonwebtoken (JWT)**
Used for stateless authentication.
After login, the server generates a token that the client must include in future requests to access protected routes.

**express-validator**
Validates incoming request data (email, password, task fields).
Prevents invalid or malicious data from reaching the database.

**cors**
Allows secure communication between frontend (React) and backend (Express) running on different ports.

**dotenv**
Loads environment variables (database URL and secret keys) from a `.env` file instead of hardcoding them in the source code.

---

### Frontend Dependencies

**react**
Used to build the user interface with component-based architecture.

**axios**
Used to send HTTP requests from the frontend to the backend API.

**vite**
Frontend development server and build tool providing fast startup and hot reload.

---

## Author

Kavin A
Full Stack Developer
