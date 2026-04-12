import { useState } from "react";
import { createTask } from "../../api/taskapi";
import { useAuth } from "../../context/AuthContext";
import {
  ClipboardDocumentIcon,
  DocumentTextIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned_to, setAssigned_to] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description, assigned_to }, token);
      alert("Task created!");
      setTitle("");
      setDescription("");
      setAssigned_to("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const InputField = ({ icon: Icon, children }) => (
    <div className="flex items-center border border-border rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary">
      <Icon className="w-5 h-5 text-text-secondary mr-2" />
      {children}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-6">

      <div className="w-full max-w-lg bg-surface rounded-xl shadow-lg border border-border p-6 space-y-6">

        {/* Header */}
        <h2 className="text-2xl font-bold text-text-primary text-center">
          Create Task
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <InputField icon={ClipboardDocumentIcon}>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full outline-none bg-transparent"
              required
            />
          </InputField>

          {/* Description */}
          <InputField icon={DocumentTextIcon}>
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none bg-transparent resize-none"
              rows={3}
            />
          </InputField>

          {/* Assigned To */}
          <InputField icon={UserIcon}>
            <input
              type="number"
              placeholder="Assign to (User ID)"
              value={assigned_to}
              onChange={(e) => setAssigned_to(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </InputField>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded-lg transition"
          >
            Create Task
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateTask;