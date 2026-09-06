# TodoApp

A full-stack Todo application built with **React** and **FastAPI**, backed by **SQLAlchemy** and **SQLite**.

The project demonstrates a complete frontend-to-backend CRUD workflow, including validation, sorting, editing, completion updates, and database persistence.

## Architecture

```text
React UI
   │
   │ HTTP / REST
   ▼
FastAPI
   │
   │ SQLAlchemy ORM
   ▼
SQLite
```

## Features

- Create, read, update, and delete Todos
- Mark Todos as completed
- Edit existing Todo titles
- Sort by ID or title
- Validate empty Todo titles
- Prevent duplicate Todo titles
- Persist data through SQLAlchemy
- Separate frontend API/state logic from UI rendering

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, JavaScript, Vite, Tailwind CSS |
| Backend | FastAPI, Python |
| ORM | SQLAlchemy |
| Database | SQLite |
| API | REST |

## API Operations

| Method | Purpose |
| --- | --- |
| `GET` | Retrieve Todos |
| `POST` | Create a Todo |
| `PUT` | Update a Todo |
| `DELETE` | Delete a Todo |

## Project Structure

```text
project/
├── frontend/
│   └── src/
│       ├── Todo.jsx
│       └── ApiHandling.jsx
│
└── backend/
    ├── main.py
    ├── database.py
    ├── models.py
    └── routers/
        └── todos.py
```

## Frontend Design

API requests and related state logic are separated from the main Todo UI. This keeps the presentation component focused on rendering and user interaction while the API layer handles communication and state operations.

## CRUD Flow

```text
React UI → REST Request → FastAPI → SQLAlchemy → SQLite
                                      ↓
                                 JSON Response
                                      ↓
                                    React UI
```

## Validation

The application validates empty Todo titles and duplicate titles. Duplicate checking also excludes the Todo currently being edited.

## Key Engineering Concepts

- REST API design
- HTTP methods and status codes
- FastAPI route handling
- Pydantic validation
- SQLAlchemy ORM
- Database sessions
- React state management
- Controlled forms
- Async API requests
- Separation of concerns
- Frontend/backend integration

## Getting Started

### Prerequisites

- Python
- Node.js and npm

### Backend

Install the Python dependencies used by the project and start the FastAPI application using the configured application entry point.

### Frontend

Install the frontend dependencies and start the Vite development server.

## Status

**Completed:** Core React + FastAPI Todo CRUD workflow with database persistence, validation, sorting, and frontend/backend integration.

## Author

**Jakeer**

GitHub: [@jakeer939](https://github.com/jakeer939)
