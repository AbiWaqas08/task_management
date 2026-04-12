import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-surface border-b border-border flex justify-between items-center px-6 py-4 shadow-sm">

      {/* LEFT - DYNAMIC TITLE */}
      <div className="text-lg font-semibold text-text-primary">
        {user?.role === "admin"
          ? "Admin Dashboard"
          : "User Dashboard"}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* PROFILE */}
        <div
          onClick={() =>
            navigate(
              user?.role === "admin"
                ? "/admin/profile"
                : "/user/profile"
            )
          }
          className="flex items-center gap-2 cursor-pointer"
        >
          <UserCircleIcon className="w-6 h-6 text-text-secondary" />
          <span className="hidden md:inline text-text-secondary">
            {user?.name || "User"}
          </span>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>

      </div>
    </header>
  );
};

export default Navbar;