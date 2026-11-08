# Wedent

**Wedent** is a web application for a dental clinic, designed to support the appointment booking process.

> **Project status: Work in progress**
>
> Wedent is currently under active development. The repository contains the initial frontend structure and backend foundations, but the application is not yet a complete booking system. Some components and backend workflows are still being implemented.

## Overview

The goal of the project is to build a full-stack application that will allow patients to learn about a dental clinic and request appointments online. The project is also an opportunity to practise building a React frontend and connecting it to a REST API.

## Tech stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Current progress

### Frontend
- Initial React application set up with Vite.
- Basic page structure split into layout components.
- Initial hero section with a call-to-action.
- Reusable button components with configurable props.

The main page sections are currently being developed. Some components are still placeholders.

### Backend
- Express server setup.
- MongoDB connection configured through environment variables.
- Basic health-check endpoint: `GET /api/health`.
- Initial Mongoose models for appointments and appointment time slots.
- Appointment route and controller scaffolded; booking validation and the complete reservation workflow are still under development.

**The appointment endpoint is not ready for normal use yet.** The booking process, including reliable handling of appointment slots, still needs to be completed and tested.

## Project structure

```text
Wedent/
├── client/
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   └── ui/
│       ├── App.jsx
│       ├── App.css
│       └── index.css
└── server/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── .env.example
    └── server.js
```

## Getting started

The frontend and backend are separate applications. Run them in two terminal windows.

### 1. Clone the repository

```bash
git clone https://github.com/JanCiszewski/Wedent.git
cd Wedent
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend in development mode:

```bash
npm run dev
```

The API health check is available at:

```text
http://localhost:5000/api/health
```

### 3. Set up the frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Vite will display the local development URL in the terminal (usually `http://localhost:5173`).

## Environment variables

| Variable | Description | Required |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Backend server port (defaults to `5000`) | No |

Never commit your actual `.env` file or database credentials.

## Planned work

The following areas are planned for future development:

- Complete the responsive clinic website interface.
- Build the patient appointment booking form.
- Finish appointment and time-slot validation.
- Implement reliable appointment booking and conflict handling.
- Develop appointment management features.
- Improve error handling and add tests.

This list may change as the project develops.

## Author

Created as a personal full-stack web development project.
