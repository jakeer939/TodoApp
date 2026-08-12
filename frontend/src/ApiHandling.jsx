import { useEffect, useState } from "react";

function ApiHandling() {
  const [data, setData] = useState([]);
  const [editid, seteditid] = useState(null);
  const [title, settitle] = useState("");
  const [sortby, setsortby] = useState("id_asc");

  const URL = "http://127.0.0.1:8000";

  // GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const info = await response.json();
        setData(info);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // CREATE / UPDATE
  const formhandler = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    // Duplicate check
    for (const i of data) {
      if (
        i.id !== editid &&
        i.title.toLowerCase() === trimmedTitle.toLowerCase()
      ) {
        window.alert(`${trimmedTitle} already exists`);
        return;
      }
    }

    // UPDATE
    if (editid !== null) {
      const target = data.find((todo) => todo.id === editid);

      if (!target) return;

      try {
        const response = await fetch(`${URL}/${editid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: trimmedTitle,
            completed: target.completed,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update todo");
        }

        const updatedTodo = await response.json();

        setData((prev) =>
          prev.map((todo) =>
            todo.id === editid ? updatedTodo : todo
          )
        );

        seteditid(null);
        settitle("");
      } catch (error) {
        console.error("Failed to update todo:", error);
      }

      return;
    }

    // CREATE
    const todo = {
      title: trimmedTitle,
      completed: false,
    };

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo = await response.json();

      setData((prev) => [...prev, newTodo]);
      settitle("");
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  // EDIT
  const edithandler = (id) => {
    const target = data.find((todo) => todo.id === id);

    if (!target) return;

    settitle(target.title);
    seteditid(id);
  };

  // UPDATE COMPLETED
  const updateCompleted = async (id) => {
    const target = data.find((todo) => todo.id === id);

    if (!target) return;

    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: target.title,
          completed: !target.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update completed status");
      }

      const updatedTodo = await response.json();

      setData((prev) =>
        prev.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Failed to update completed:", error);
    }
  };

  // DELETE
  const deletehandler = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setData((prev) =>
        prev.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const sortedData = [...data].sort((a, b) => {
  switch (sortby) {
    case "id_asc":
      return a.id - b.id;

    case "id_dsc":
      return b.id - a.id;

    case "title_asc":
      return a.title.localeCompare(b.title);

    case "title_desc":
      return b.title.localeCompare(a.title);

    default:
      return 0;
  }
});

  return {
    data:sortedData,
    title,
    editid,
    settitle,
    formhandler,
    edithandler,
    updateCompleted,
    deletehandler,
    setsortby,
  };
}

export default ApiHandling;