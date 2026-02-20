# KodBank - Full-Stack Banking Application

A modern banking web application with React frontend and Node.js backend, connected to MySQL on Aiven.

## Setup Instructions

### 1. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Run the Application

```bash
# Terminal 1 - Start backend server
npm run server

# Terminal 2 - Start frontend
npm run client
```

The backend runs on `http://localhost:5000`
The frontend runs on `http://localhost:3000`

## Features

- User Registration with validation
- Secure Login with JWT authentication
- Dashboard with balance check
- Animated UI with glassmorphism design
- Confetti celebration on balance reveal
- MySQL database on Aiven cloud

## Tech Stack

- Frontend: React, React Router, Canvas Confetti
- Backend: Node.js, Express
- Database: MySQL (Aiven)
- Auth: JWT, bcrypt
- Styling: Custom CSS with Inter font
