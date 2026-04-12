import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      const token = res.data.access_token;
      const role = res.data.role;
      const name = res.data.name;
      const email = res.data.email;

      login(token, role, name, email);

      navigate(role === "admin" ? "/admin" : "/user");

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const InputField = ({ icon: Icon, children }) => (
    <div className="flex items-center border border-border rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary transition">
      <Icon className="w-5 h-5 text-text-secondary mr-2" />
      {children}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-border space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-primary">
            Welcome Back
          </h2>

          {/* Added Info */}
          <p className="text-sm text-text-secondary">
            Welcome to Task Management System
          </p>
          <p className="text-xs text-text-secondary">
            Developed by <span className="text-primary font-medium">Abi Waqas</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <InputField icon={EnvelopeIcon}>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full outline-none bg-transparent"
            />
          </InputField>

          {/* Password */}
          <InputField icon={LockClosedIcon}>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full outline-none bg-transparent"
            />
          </InputField>

          {/* Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-lg transition"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Login
          </button>

        </form>

        {/* Register Link */}
        <p className="text-sm text-center text-text-secondary">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-primary cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

        {/* Footer */}
        <div className="text-center text-xs text-text-secondary">
          © 2026 Task Management System
        </div>

      </div>
    </div>
  );
};

export default Login;