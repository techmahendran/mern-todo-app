const API_URL = "http://localhost:5000/api/todos";

export const getTodos = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return await res.json();
  } catch (error) {
    console.error("GET ERROR:", error);
    return [];
  }
};

export const createTodo = async (data) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create todo");
    return await res.json();
  } catch (error) {
    console.error("POST ERROR:", error);
  }
};

export const updateTodo = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update todo");
    return await res.json();
  } catch (error) {
    console.error("PUT ERROR:", error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete todo");
  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
};
