import ApiHandling from "./ApiHandling";

function Todo() {
  const {
    data,
    title,
    editid,
    settitle,
    formhandler,
    edithandler,
    updateCompleted,
    deletehandler,
    sortby,
    setsortby,
  } = ApiHandling();

  return (
    <div className="h-screen">

      <form
        className="flex px-2 mb-10 w-full mt-5"
        onSubmit={formhandler}
      >
        <p className="w-[20%] ml-10">
          Enter a Todo:
        </p>

        <div className="w-[40%]">
          <input
            className="border-2 w-[70%] rounded-full text-center py-1"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="Enter a Todo"
          />
        </div>

        <div className="w-[40%]">
          <button
            className="w-[40%] border-2 py-1 rounded-lg"
            type="submit"
          >
            {editid !== null ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      <hr />
      <br />

      <div className="flex justify-around items-center">
        <h1 className="text-5xl font-bold flex justify-center">
        Todo File Data
        </h1>
        <select 
        value={sortby}
        onChange={(e)=>setsortby(e.target.value)}
        className="border-2 rounded-xl px-4 py-2 text-2xl">
          <option value="id_asc">id - [1 to n] </option>
          <option value="id_dsc">id - [n to 1] </option>
          <option value="title_asc">title - [A - z] </option>
          <option value="title_desc">title - [z - A]</option>
        </select>
      </div>

      <br />
      <hr />

      {data.map((d) => (
        <div
          key={d.id}
          className="flex mb-5 justify-between items-center"
        >
          <p className="ml-5 w-[15%]">
            {d.id}
          </p>

          <p className="ml-10 w-[45%]">
            {d.title}
          </p>

          <p className="ml-5 w-[15%]">
            <button
              type="button"
              onClick={() => updateCompleted(d.id)}
              className={`px-2 py-1 text-white w-[70%] font-bold border-2 ${
                d.completed
                  ? "bg-green-300"
                  : "bg-red-400"
              }`}
            >
              {d.completed ? "True" : "False"}
            </button>
          </p>

          <p className="w-[10%]">
            <button
              onClick={() => edithandler(d.id)}
              type="button"
              className="px-2 py-1 text-white w-[80%] border-2 bg-blue-400 font-bold"
            >
              Edit
            </button>
          </p>

          <p className="w-[15%]">
            <button
              type="button"
              onClick={() => deletehandler(d.id)}
              className="px-2 py-1 text-white w-[70%] border-2 bg-red-400 font-bold"
            >
              Delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Todo;