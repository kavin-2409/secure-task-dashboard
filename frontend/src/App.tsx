import { useEffect, useState, useCallback } from "react";
import API from "./services/api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

type Task = {
  _id: string;
  title: string;
  description: string;
  completed?: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Check local storage directly when the component first loads to prevent double renders
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("token") !== null;
  });
  
  const [showRegister, setShowRegister] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // Track which task is currently being edited
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Wrapped in useCallback to prevent infinite dependency loops
  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks", err);
    }
  }, []);

  // Check token on load and fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Wrap the fetch call to satisfy the strict linter
      const loadInitialTasks = async () => {
        await fetchTasks();
      };
      
      loadInitialTasks();
    }
  }, [fetchTasks]);

  // Handles BOTH creating new tasks and updating existing ones
  const handleSubmitTask = async () => {
    if (!title.trim()) return;
    setLoading(true);

    try {
      if (editingTaskId) {
        // Update existing task
        await API.put(`/tasks/${editingTaskId}`, { title, description });
        setEditingTaskId(null); // Clear edit mode after successful update
      } else {
        // Create new task
        await API.post("/tasks", { title, description });
      }
      
      // Clear inputs and refresh list
      setTitle("");
      setDescription("");
      await fetchTasks();
    } catch (err) {
      console.log("Submit task error", err);
    } finally {
      setLoading(false);
    }
  };

  // Populates the form when the edit button is clicked
  const handleEditClick = (task: Task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll up to the form smoothly
  };

  // Cancels edit mode and clears the form
  const cancelEdit = () => {
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
  };

  // Delete task
  const handleDeleteTask = async (id: string) => {
    setLoading(true);
    try {
      await API.delete(`/tasks/${id}`);
      if (editingTaskId === id) cancelEdit(); // If deleting the task we are currently editing, clear the form
      await fetchTasks();
    } catch (error) {
      console.log("Failed to delete task", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (task: Task) => {
    setLoading(true);
    try {
      await API.put(`/tasks/${task._id}`, {
        ...task,
        completed: !task.completed,
      });
      await fetchTasks();
    } catch (error) {
      console.log("Failed to update task", error);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setTasks([]);
    cancelEdit();
  };

  return (
    <div className="page">
      {!loggedIn ? (
        showRegister ? (
          <Register goToLogin={() => setShowRegister(false)} />
        ) : (
          <Login
            onLoginSuccess={() => {
              setLoggedIn(true);
              fetchTasks();
            }}
            goToRegister={() => setShowRegister(true)}
          />
        )
      ) : (
        <div className="tasks-container">
          <h2>My Tasks</h2>

          {/* Form Area for Creating and Editing */}
          <div className="create-task">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              disabled={loading}
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              disabled={loading}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
              <button 
                onClick={handleSubmitTask} 
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? "Processing..." : editingTaskId ? "Update Task" : "Add Task"}
              </button>
              
              {editingTaskId && (
                <button 
                  onClick={cancelEdit} 
                  disabled={loading} 
                  style={{ flex: 1, backgroundColor: "#64748b" }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Task List */}
          {tasks.length === 0 ? (
            <p>No tasks yet</p>
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
                      checked={task.completed || false}
                      onChange={() => handleToggleComplete(task)}
                      disabled={loading}
                    />
                    <h3>{task.title}</h3>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleEditClick(task)}
                      disabled={loading || task.completed}
                      className="delete-btn"
                      style={{ color: task.completed ? '#64748b' : '#3b82f6' }}
                      title="Edit Task"
                    >
                      ✎
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task._id)}
                      disabled={loading}
                      title="Delete Task"
                    >
                      ✕
                    </button>
                  </div>
                  
                </div>

                <p>{task.description}</p>
              </div>
            ))
          )}

          <button className="logout-btn" onClick={handleLogout} disabled={loading}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;