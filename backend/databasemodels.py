from sqlalchemy import Column,String,Integer,Boolean
from database import Base
from pydantic import BaseModel

class Todos(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True,index=True)
    title = Column(String)
    completed = Column(Boolean)

class CreateTodo(BaseModel):
    title: str
    completed: bool


