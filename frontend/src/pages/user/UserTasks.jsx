import { useEffect, useState } from "react";
import { getUserTasks, updateTaskStatus } from "../../api/taskapi";

import {
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await getUserTasks();
      setTasks(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      fetchTasks();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const filtered = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-2">
        <ClipboardDocumentListIcon className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold text-text-primary">
          My Tasks
        </h1>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded border border-border shadow focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* TASK LIST */}
      <ul className="space-y-4">

        {filtered.map((task) => (
          <li
            key={task.id}
            className="bg-surface p-5 rounded-lg shadow border border-border flex justify-between items-center hover:shadow-md transition"
          >

            {/* LEFT SIDE */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <PencilSquareIcon className="w-4 h-4 text-secondary" />
                <p className="font-semibold text-text-primary">
                  {task.title}
                </p>
              </div>

              <p className="text-text-secondary text-sm">
                {task.description}
              </p>

              <p className="text-xs text-gray-500">
                Status:{" "}
                <span className="font-medium text-primary">
                  {task.status.replace("_", " ")}
                </span>
              </p>
            </div>

            {/* RIGHT SIDE (STATUS UPDATE) */}
            <select
              value={task.status}
              onChange={(e) =>
                handleStatusChange(task.id, e.target.value)
              }
              className="border border-border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
            >
              <option value="pending">⏳ Pending</option>
              <option value="in_progress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>

          </li>
        ))}

      </ul>
    </div>
  );
};

export default UserTasks;