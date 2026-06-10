import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    setLoading(true);
    axios
      .get(`${API}/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    await axios.post(`${API}/tasks`, {
      text: newTask,
    });

    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    await axios.put(`${API}/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#1e3a8a" }}>
          📋 MERN Task Dashboard
        </h1>

        <h3 style={{ textAlign: "center", color: "#555" }}>
          Total Tasks: {tasks.length}
        </h3>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter Task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={addTask}
            style={{
              background: "linear-gradient(90deg, #2563eb, #1e40af)",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>

        <h2 style={{ marginTop: "30px" }}>My Tasks</h2>

        {loading && <p>Loading tasks...</p>}

        {!loading && tasks.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>
            No tasks yet. Add your first task 🚀
          </p>
        )}

        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f8fafc",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          >
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                fontSize: "18px",
              }}
            >
              {task.text}
            </span>

            <div>
              <button
                onClick={() => toggleComplete(task._id)}
                style={{
                  background: task.completed
                    ? "#f59e0b"
                    : "#22c55e",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;