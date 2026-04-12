import { useEffect, useState } from "react";
import { getAllTasksAdmin } from "../../api/taskapi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  ClipboardDocumentListIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const AdminHome = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    completed: 0,
  });

  const fetchTasks = async () => {
    try {
      const res = await getAllTasksAdmin(token);
      const data = res.data;

      setTasks(data);

      setStats({
        total: data.length,
        pending: data.filter(t => t.status === "pending").length,
        in_progress: data.filter(t => t.status === "in_progress").length,
        completed: data.filter(t => t.status === "completed").length,
      });

    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const Card = ({ title, value, icon: Icon, color }) => (
    <div className="bg-surface p-6 rounded-lg shadow border border-border flex items-center justify-between">
      <div>
        <h3 className="text-text-secondary text-sm">{title}</h3>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <Icon className={`w-10 h-10 ${color} opacity-80`} />
    </div>
  );

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 text-xs rounded text-white";
    if (status === "pending") return `${base} bg-warning`;
    if (status === "in_progress") return `${base} bg-secondary`;
    if (status === "completed") return `${base} bg-success`;
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header + Quick Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Admin Dashboard
          </h1>
          <p className="text-text-secondary">
            Welcome back! Manage your tasks efficiently.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/tasks/create")}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded"
          >
            + Create Task
          </button>

          <button
            onClick={() => navigate("/admin/tasks")}
            className="bg-secondary hover:bg-secondary-hover text-white px-4 py-2 rounded"
          >
            View Tasks
          </button>
        </div>
      </div>

      {/* Notification */}
      <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
        <BellIcon className="w-5 h-5" />
        <span>
          You have <strong>{stats.pending}</strong> pending tasks.
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card title="Total Tasks" value={stats.total} icon={ClipboardDocumentListIcon} color="text-primary" />
        <Card title="Pending" value={stats.pending} icon={ClockIcon} color="text-warning" />
        <Card title="In Progress" value={stats.in_progress} icon={ArrowPathIcon} color="text-secondary" />
        <Card title="Completed" value={stats.completed} icon={CheckCircleIcon} color="text-success" />

      </div>

      {/* Recent Tasks */}
      <div className="bg-surface p-6 rounded-lg shadow border border-border">
        <h2 className="text-lg font-semibold mb-4 text-text-primary">
          Recent Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-text-secondary">No tasks found.</p>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 5).map(task => (
              <div
                key={task.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-text-primary">
                    {task.title}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Created by: {task.created_by}
                  </p>
                </div>

                <span className={getStatusBadge(task.status)}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminHome;