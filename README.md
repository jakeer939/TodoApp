# FastAPI + React Todo App

A full-stack Todo application built with **React** on the frontend and **FastAPI** on the backend. Today's work focused on connecting the frontend to the backend, implementing CRUD operations, and organizing the React API/state logic into a separate module.

## Tech Stack

* React
* Vite
* Tailwind CSS
* FastAPI
* Python
* SQLAlchemy
* SQLite
* REST API
* JavaScript

## Today's Progress

### React

Implemented:

* Fetching Todo data from FastAPI
* Creating new Todos
* Editing existing Todos
* Updating Todo completion status
* Deleting Todos
* Controlled form inputs with `useState`
* Fetching initial data with `useEffect`
* Duplicate Todo title validation
* Empty input validation
* Edit mode using `editid`
* Sorting Todo data
* Separated API/state logic from UI

### FastAPI

Connected the React frontend to the FastAPI backend through REST endpoints.

Implemented API operations for:

* `GET` → Fetch Todos
* `POST` → Create Todo
* `PUT` → Update Todo
* `DELETE` → Delete Todo

The React application communicates with the FastAPI backend using `fetch()`.

## Project Structure

```text
project/
│
├── frontend/
│   ├── src/
│   │   ├── Todo.jsx
│   │   └── ApiHandling.jsx
│   └── ...
│
└── backend/
    ├── main.py
    ├── database.py
    ├── models.py
    └── routers/
        └── todos.py
```

## React API Handling

Instead of putting API requests directly inside `Todo.jsx`, the application uses `ApiHandling.jsx` to contain the state and API-related logic.

The component receives the required values and functions:

```js
const {
  data,
  title,
  editid,
  settitle,
  formhandler,
  edithandler,
  updateCompleted,
  deletehandler,
} = ApiHandling();
```

This keeps `Todo.jsx` focused mainly on rendering the UI.

## CRUD Flow

### Create

```text
User enters Todo
        ↓
React form
        ↓
POST request
        ↓
FastAPI
        ↓
Database
        ↓
New Todo returned
        ↓
React state updated
```

### Read

```text
React loads
    ↓
GET request
    ↓
FastAPI
    ↓
Database
    ↓
Todo data
    ↓
setData()
    ↓
UI
```

### Update

The same `PUT` operation is used for editing the title and changing the completion status.

```text
User clicks Edit
        ↓
Todo title loaded into input
        ↓
User changes title
        ↓
PUT request
        ↓
FastAPI updates database
        ↓
Updated Todo returned
        ↓
React updates state
```

### Delete

```text
User clicks Delete
        ↓
DELETE request
        ↓
FastAPI
        ↓
Database record deleted
        ↓
React removes Todo from state
```

## Sorting

Added a sorting dropdown with four options:

```text
ID ascending
ID descending
Title A-Z
Title Z-A
```

Sorting is performed on the frontend because all Todo data is already available in React state.

The original array is preserved using:

```js
const sortedData = [...data].sort(...)
```

This avoids directly mutating React state.

## Validation

The application checks:

* Empty Todo titles
* Duplicate Todo titles
* Duplicate checking while excluding the Todo currently being edited

Example:

```js
if (
  i.id !== editid &&
  i.title.toLowerCase() === trimmedTitle.toLowerCase()
) {
  window.alert(`${trimmedTitle} already exists`);
  return;
}
```

## Key React Concepts Practiced

* `useState`
* `useEffect`
* Controlled inputs
* Event handling
* Form submission
* Array `map()`
* Array `find()`
* Array `filter()`
* Array `sort()`
* Async/await
* `fetch()`
* Conditional rendering
* State updates
* Component separation

## Key Backend Concepts Practiced

* FastAPI routes
* HTTP methods
* Request bodies
* JSON
* REST API communication
* CRUD operations
* Database interaction
* Pydantic models
* SQLAlchemy
* React ↔ FastAPI communication

## What I Learned Today

The main concept was understanding that React does not directly modify the database.

The actual flow is:

```text
React
  ↓
HTTP Request
  ↓
FastAPI
  ↓
SQLAlchemy
  ↓
Database
```

After the backend completes the operation, it sends a response back:

```text
Database
  ↓
FastAPI
  ↓
JSON Response
  ↓
React
  ↓
setData()
  ↓
UI
```

This helped clarify the difference between **React state** and **database state**.


## Current Status

**React + FastAPI Todo CRUD: Completed**

The application can now communicate with the backend, persist Todo data in the database, and perform the complete CRUD workflow from the React interface.
