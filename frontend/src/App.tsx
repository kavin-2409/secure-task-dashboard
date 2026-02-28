import { useEffect, useState } from "react";
import API from "./services/api";
import Login from "./pages/Login";
import "./App.css";
type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

  // Fetch tasks
const fetchTasks = async () => {
  try {
    const response = await API.get("/tasks");
    setTasks(response.data as Task[]);
  } catch (error) {
    console.log("Backend error:", error);
  }
};
const handleCreateTask = async () => {
  if (!title.trim()) return;

  try {
    await API.post("/tasks", {
      title,
      description,
    });

    setTitle("");
    setDescription("");
    fetchTasks(); // refresh tasks
  } catch (error) {
    console.log("Failed to create task", error);
  }
};
const handleDeleteTask = async (id: string) => {
  try {
    await API.delete(`/tasks/${id}`);
    fetchTasks(); // refresh list
  } catch (error) {
    console.log("Failed to delete task", error);
  }
};
const handleToggleComplete = async (task: Task) => {
  try {
    await API.put(`/tasks/${task._id}`, {
      ...task,
      completed: !task.completed,
    });

    fetchTasks();
  } catch (error) {
    console.log("Failed to update task", error);
  }
};

  // Check login on app start
 useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoggedIn(false);
      return;
    }

    setLoggedIn(true);
    await fetchTasks();
  };

  checkAuth();
}, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setTasks([]);
  };

if (!loggedIn) {
  return <Login />;
}

return (
  <div className="page">
    {!loggedIn ? (
      <Login />
    ) : (
      <div className="dashboard">
        <div className="topbar">
          <h2>My Tasks</h2>
          
        </div>
        

        {/* Create Task Card */}
        <div className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="add-btn" onClick={handleCreateTask}>
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet</p>
          ) : (
            tasks.map((task) => (
  <div
    className={`task-card ${task.completed ? "completed" : ""}`}
    key={task._id}
  >
    <div className="task-card-header">
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleToggleComplete(task)}
        />
        <h3>{task.title}</h3>
      </div>

      <button
        className="delete-btn"
        onClick={() => handleDeleteTask(task._id)}
      >
        ✕
      </button>
    </div>

    <p>{task.description}</p>
  </div>
))
          )}
        </div>
        <div className="logout-container">
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>

        

      </div>
    )}
  </div>
);
}

export default App;