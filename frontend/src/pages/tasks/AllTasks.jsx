import { useEffect, useState } from "react";
import { getAllTasksAdmin, deleteTask } from "../../api/taskapi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const { token } = useAuth();
  const navigate = useNavigate();

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await getAllTasksAdmin(token);
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchTitle.trim()) {
      setFilteredTasks(tasks);
    } else {
      const lower = searchTitle.toLowerCase();
      setFilteredTasks(
        tasks.filter((task) =>
          task.title.toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTitle, tasks]);

  // DELETE with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id, token);
      fetchTasks(); // refresh
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* SEARCH */}
      <div className="max-w-md mx-auto relative">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-full px-10 py-2 rounded-lg border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* TASK LIST */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-text-primary">
          No tasks found.
        </p>
      ) : (
        <ul className="space-y-4">

          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="bg-surface p-4 rounded-lg shadow border border-border flex justify-between items-center"
            >

              {/* LEFT SIDE */}
              <div className="space-y-1">

                <p className="font-semibold text-text-primary">
                  {task.title}
                </p>

                <p className="text-sm text-text-secondary">
                  Status:{" "}
                  <span
                    className={`capitalize font-medium ${
                      task.status === "completed"
                        ? "text-success"
                        : task.status === "pending"
                        ? "text-warning"
                        : "text-primary"
                    }`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                </p>

                <p className="text-sm text-text-secondary">
                  Created by: {task.created_by} | Assigned to:{" "}
                  {task.assigned_to || "N/A"}
                </p>

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">

                {/* EDIT */}
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  onClick={() =>
                    navigate(`/admin/tasks/update/${task.id}`)
                  }
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>

                {/* DELETE */}
                <button
                  className="bg-primary hover:bg-primary-hover text-white px-3 py-1 rounded flex items-center gap-1"
                  onClick={() => handleDelete(task.id)}
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>

              </div>
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default AllTasks;