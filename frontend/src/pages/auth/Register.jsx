import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";

import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  IdentificationIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const navigate = useNavigate();

  /**
   * Handle register submit
   */
  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      alert("Registration successful");
      navigate("/login");

    } catch (error) {
      alert("Registration failed");
    }
  };

  /**
   * Reusable input with icon
   */
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
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-primary">
            Create Account
          </h2>
          <p className="text-sm text-text-secondary">
            Register to start managing tasks
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <InputField icon={UserIcon}>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full outline-none bg-transparent"
              />
            </InputField>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <InputField icon={EnvelopeIcon}>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full outline-none bg-transparent"
              />
            </InputField>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <InputField icon={LockClosedIcon}>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full outline-none bg-transparent"
              />
            </InputField>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <InputField icon={IdentificationIcon}>
              <select
                {...register("role")}
                className="w-full outline-none bg-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </InputField>
          </div>

          {/* Info */}
          <div className="text-xs text-text-secondary text-center">
            Choose your role carefully. Admin has full access.
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-lg transition disabled:opacity-60"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            {isSubmitting ? "Registering..." : "Register"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-center text-text-secondary">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;