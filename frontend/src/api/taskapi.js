import axios from "./axios";

// 🔐 Helper → always get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ================= ADMIN ================= */

// Get all tasks (admin)
export const getAllTasksAdmin = () =>
  axios.get("/tasks/admin", getAuthHeader());

// Create task (admin)
export const createTask = (task) =>
  axios.post("/tasks/admin", task, getAuthHeader());

// Update task (admin)
export const updateTask = (id, task) =>
  axios.put(`/tasks/${id}`, task, getAuthHeader());

// Delete task (admin)
export const deleteTask = (id) =>
  axios.delete(`/tasks/${id}`, getAuthHeader());


/* ================= USER ================= */

// Get assigned tasks
export const getUserTasks = () =>
  axios.get("/tasks/my", getAuthHeader());


// Get single task
export const getTask = (id) =>
  axios.get(`/tasks/${id}`, getAuthHeader());


// Update ONLY status
export const updateTaskStatus = (taskId, status) =>
  axios.put(
    `/tasks/${taskId}`,
    { status },
    getAuthHeader()
  );

