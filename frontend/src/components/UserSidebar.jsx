import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const UserSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const baseStyle =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200";
  const activeStyle = "bg-secondary text-white shadow";
  const inactiveStyle = "hover:bg-secondary/40 text-gray-200";

  return (
    <aside
      className={`h-screen bg-primary text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-xl font-bold tracking-wide">
            User Panel
          </h2>
        )}

        <button onClick={() => setCollapsed(!collapsed)}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 mx-3 mb-4"></div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 px-3">

        {/* Home */}
        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <HomeIcon className="w-5 h-5" />
          {!collapsed && "Dashboard"}
        </NavLink>

        {/* My Tasks */}
        <NavLink
          to="/user/tasks"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <ClipboardDocumentListIcon className="w-5 h-5" />
          {!collapsed && "My Tasks"}
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <UserCircleIcon className="w-5 h-5" />
          {!collapsed && "Profile"}
        </NavLink>

      </nav>

      {/* Bottom Section (optional) */}
      <div className="mt-auto p-4 text-xs text-gray-300">
        {!collapsed && <p>© 2026 Task App</p>}
      </div>
    </aside>
  );
};

export default UserSidebar;