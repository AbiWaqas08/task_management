import { useEffect, useState } from "react";
import { getUserTasks } from "../../api/taskapi";

import {
  ClipboardDocumentListIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const UserHome = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    completed: 0,
  });

  const fetchTasks = async () => {
    try {
      const res = await getUserTasks();
      const tasks = res.data || [];

      setStats({
        total: tasks.length,
        pending: tasks.filter(t => t.status === "pending").length,
        in_progress: tasks.filter(t => t.status === "in_progress").length,
        completed: tasks.filter(t => t.status === "completed").length,
      });

    } catch (err) {
      console.error("Error fetching user stats:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const Card = ({ title, value, icon: Icon, color }) => (
    <div className="bg-surface p-6 rounded-lg shadow border border-border flex justify-between items-center">
      <div>
        <p className="text-text-secondary text-sm">{title}</p>
        <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
      </div>
      <Icon className={`w-10 h-10 ${color}`} />
    </div>
  );

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold text-text-primary">
        User Dashboard
      </h1>

      <p className="text-text-secondary">
        Here is your task summary.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card
          title="Assigned Tasks"
          value={stats.total}
          icon={ClipboardDocumentListIcon}
          color="text-primary"
        />

        <Card
          title="Pending"
          value={stats.pending}
          icon={ClockIcon}
          color="text-warning"
        />

        <Card
          title="In Progress"
          value={stats.in_progress}
          icon={ArrowPathIcon}
          color="text-secondary"
        />

        <Card
          title="Completed"
          value={stats.completed}
          icon={CheckCircleIcon}
          color="text-success"
        />

      </div>

    </div>
  );
};

export default UserHome;