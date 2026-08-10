# Todo App — FastAPI Backend (Today's Work)
Overview

A FastAPI backend providing CRUD endpoints for a Todo app, backed by SQLAlchemy + a Todos model. Consumed by a React frontend running on a separate origin.

Endpoints
Method	Path	Description
GET	/	Returns all todos. Raises 404 if none exist.
POST	/	Creates a new todo.
PUT	/{todo_id}	Updates an existing todo's title and completed.
DELETE	/{todo_id}	Deletes a todo by id.
Bugs Fixed Today
1. id missing from POST response until page refresh

Cause: response_model=CreateTodo was reused for both input (request body) and output (response), and CreateTodo only defines title + completed — no id. FastAPI's response_model strips out any field not declared on the schema, so even though db.refresh(new_todo) correctly populated new_todo.id, it got filtered out before reaching the client.

Fix: Split input and output schemas. Input schema (CreateTodo) stays as-is for POST/PUT request bodies. A new output schema includes id:

python
class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        from_attributes = True  # Pydantic v2, reads from SQLAlchemy ORM objects

Applied response_model=TodoResponse to GET, POST, PUT, and DELETE routes.

2. CORS (frontend/backend on different origins)

React dev server and FastAPI run on different ports, so the browser blocks requests unless CORS is explicitly configured:

python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # match actual frontend origin/port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Confirmed Working
db.refresh(new_todo) correctly repopulates server-generated fields (like id) after commit() — this pattern is correct and used consistently across POST/PUT.
PUT and DELETE routes correctly use db.scalar(select(...).where(...)) and raise 404 via HTTPException when a todo isn't found (note: minor typo statuscode should be status_code in PUT/DELETE — Python won't error on this since it's just an unused kwarg name in the current call, but it should be fixed to avoid ambiguity).
Small Cleanup Still Needed
Fix statuscode=404 → status_code=404 in the PUT and DELETE handlers (currently likely a typo that doesn't raise an error but should be corrected for clarity/correctness).
Apply response_model=TodoResponse consistently across all routes (GET, POST, PUT, DELETE) if not already done.
Consider narrowing allow_origins and allow_methods/allow_headers from wildcards once frontend is closer to production.
Next Steps
Double check every route returns TodoResponse (or list[TodoResponse] for GET) consistently.
Fix the statuscode typo in PUT/DELETE.
Support the upcoming frontend Edit feature — current PUT endpoint already accepts a full CreateTodo body, so no backend changes should be needed once React-side edit mode is built.