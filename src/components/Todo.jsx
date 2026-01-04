import "./Todo.css";
import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoApi";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  // ✅ edit state
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  // ADD TODO
  const addTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Todo title is required");
      return;
    }

    setError("");
    const newTodo = await createTodo({ title });
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  // TOGGLE TODO
  const toggleTodo = async (todo) => {
    setTodos((prev) =>
      prev.map((t) =>
        t._id === todo._id ? { ...t, completed: !t.completed } : t
      )
    );

    await updateTodo(todo._id, {
      completed: !todo.completed,
    });
  };

  // DELETE TODO
  const removeTodo = async (id) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
    await deleteTodo(id);
  };

  // START EDIT
  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.title);
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    if (!editText.trim()) return;

    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, title: editText } : t))
    );

    await updateTodo(id, { title: editText });

    setEditId(null);
    setEditText("");
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">Todo App</h2>

        <form className="form" onSubmit={addTodo}>
          <input
            className="input"
            placeholder="Enter todo..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
          />
          <button className="button" type="submit">
            Add
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <ul className="list">
          {todos.map((todo) => (
            <li className="item" key={todo._id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
                className="checkbox"
              />

              {/* 🔄 EDIT MODE */}
              {editId === todo._id ? (
                <>
                  <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <button
                    className="icon-btn save"
                    onClick={() => saveEdit(todo._id)}
                    title="Save">
                    &#10004;
                  </button>

                  <button
                    className="icon-btn cancel"
                    onClick={cancelEdit}
                    title="Cancel">
                    &#10005;
                  </button>
                </>
              ) : (
                <>
                  <span className={`text ${todo.completed ? "completed" : ""}`}>
                    {todo.title}
                  </span>

                  <button
                    className="icon-btn edit"
                    onClick={() => startEdit(todo)}
                    title="Edit">
                    &#9998;
                  </button>

                  <button
                    className="icon-btn delete"
                    onClick={() => removeTodo(todo._id)}
                    title="Delete">
                    &#10006;
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
