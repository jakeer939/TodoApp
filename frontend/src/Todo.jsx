import { useEffect, useState } from "react";

function Todo() {
  const [data, setData] = useState([]);
  const [title,settitle] = useState("");
  const URL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const info = await response.json();
        setData(info);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const formhandler = async (e) => {
  e.preventDefault();
  if (!title.trim()) return;
  for(const i of data){
    if(i.title.toLowerCase()===title.toLowerCase()){
      window.alert(`${title} already exists`);
      return;
    }
  }

  const todo = { title, completed: false };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("failed to create todo");

    const newTodo = await response.json();
    setData((prev) => [...prev, newTodo]);
  } catch (error) {
    console.log(error);
  }
  finally{
    settitle("");
  }
};
  const deletehandler = async(index)=>{
    console.log(index)
    try{
      const response = await fetch(`${URL}/${index}`,{
      method:"DELETE",
    });
      if(!response.ok) throw new Error("failed to delete");
      setData((prev)=> prev.filter((todo)=>todo.id !== index));
    }
    catch(error){
      console.log(error)
    }
  }
  const updateCompleted = async(id)=>{
    const target = data.find((todo)=>todo.id===id);
    if(!target) return;
    const updatedtodo = {title:target.title, completed:!target.completed}
    try{
      const response = await fetch(`${URL}/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(updatedtodo)
      });
      if(!response.ok) throw new Error("Failed to Update");
      const result = await response.json();
      setData((prev)=> prev.map((todo)=>todo.id === id ?result:todo));
    }
    catch(error){
      console.log(error);
    }
  }

  const edithandler = async (id)=>{
    const target = data.find((todo)=>todo.id===id);
    if(!target) return;
    setData(target.title);


  }

  return (
    <div className="h-screen">
      <form className="flex px-2 mb-10 w-full mt-5"
      onSubmit={formhandler}>
        <p className="w-[20%] ml-10">Enter a Todo:</p>
        <div className="w-[40%]">
          <input className="border-2 w-[70%] rounded-full text-center py-1"
          value = {title}
          onChange={(e)=>settitle(e.target.value)}
          type="text"
          placeholder="Enter a Todo" />
        </div>
        <div className="w-[40%]">
          <button className="w-[40%] border-2 py-1 rounded-lg"
          type="submit">submit</button>
        </div>
      </form>
        <hr /><br />
        <h1 className="text-5xl font-bold flex justify-center">Todo File Data</h1><br /><hr />
      {data.map((d, index) => (
        <div key={index} className="flex mb-5 justify-between items-center">
            <p className="ml-5 w-[15%]">{d.id}</p>
            <p className="ml-10 w-[45%]">{d.title}</p>
            
            <p className="ml-5 w-[15%]">
                <button type="button"
                onClick={()=>updateCompleted(d.id)}
                className={`px-2 py-1 text-white w-[70%] font-bold
                border-2 ${(d.completed)?"bg-green-300":"bg-red-400"}`}>
                {(d.completed)?"True":"False"}</button>
            </p>
            <p className="w-[10%]">
              <button onClick={()=>edithandler(d.id)}
              type="button"
              className="px-2 py-1 text-white w-[80%] border-2 bg-blue-400 font-bold">
                Edit</button>
            </p>
            <p className="w-[15%]">
              <button type="button"
              onClick={()=>deletehandler(d.id)}
              className="px-2 py-1 text-white w-[70%] border-2 bg-red-400 font-bold">
                Delete</button>
            </p>
            
        </div>
      ))}
    </div>
  );
}

export default Todo;
