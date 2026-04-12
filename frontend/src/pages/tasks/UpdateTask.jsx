import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, updateTask } from "../../api/taskapi";

import {
  ClipboardDocumentIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ stable state (no nesting issues)
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  // FETCH TASK
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTask(id);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          status: res.data.status || "pending",
        });

      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // HANDLE CHANGE (IMPORTANT FIX FOR SMOOTH TYPING)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateTask(id, form);

      navigate("/admin/tasks");

    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setSaving(false);
    }
  };

  const InputWrapper = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary transition">
      <Icon className="w-5 h-5 text-gray-400" />
      {children}
    </div>
  );

  // LOADING UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-gray-500 animate-pulse">Loading task...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">
            Update Task
          </h2>
          <p className="text-sm text-gray-500">
            Modify task details and save changes
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <InputWrapper icon={ClipboardDocumentIcon}>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              className="w-full outline-none bg-transparent text-gray-700"
              required
            />
          </InputWrapper>

          {/* DESCRIPTION */}
          <InputWrapper icon={DocumentTextIcon}>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Task description"
              className="w-full outline-none bg-transparent text-gray-700 resize-none"
              rows={4}
            />
          </InputWrapper>

          {/* STATUS */}
          <InputWrapper icon={CheckCircleIcon}>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700 capitalize"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </InputWrapper>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-medium py-2.5 rounded-xl transition"
          >
            {saving ? "Updating..." : "Update Task"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateTask;