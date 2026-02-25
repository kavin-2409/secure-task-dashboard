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