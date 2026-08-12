from database import engine,SessionLocal
from databasemodels import Base,Todos,CreateTodo
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.get("/")
def read_todos(db:Session=Depends(get_db)):
    todos = db.scalars(select(Todos)).all()
    if todos:
        return todos
    raise HTTPException(status_code=404, detail="todos are empty")

@router.post("/")
def create_todo(todo:CreateTodo,db:Session=Depends(get_db)):
    new_todo = Todos(
        **todo.model_dump()
    )
    
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

@router.put("/{todo_id}")
def update_todo(todo_id:int,todo:CreateTodo,db:Session=Depends(get_db)):
    up_todo = db.scalar(select(Todos).where(Todos.id==todo_id))
    if up_todo is None:
        raise HTTPException(statuscode=404,detail="todo not found")
    up_todo.title = todo.title
    up_todo.completed = todo.completed
    db.commit()
    db.refresh(up_todo)
    return up_todo

@router.delete("/{todo_id}")
def delete_todo(todo_id:int,db:Session=Depends(get_db)):
    del_todo = db.scalar(select(Todos).where(Todos.id == todo_id))
    if del_todo is None:
        raise HTTPException(statuscode=404, detail = "todo not found")
    db.delete(del_todo)
    db.commit()
    return del_todo
    
    
