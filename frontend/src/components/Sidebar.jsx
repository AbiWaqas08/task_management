import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const baseStyle = "flex items-center gap-3 px-3 py-2 rounded transition";
  const activeStyle = "bg-secondary text-white";
  const inactiveStyle = "hover:bg-secondary/50";

  return (
    <div
      className={`h-full bg-primary text-white flex flex-col p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6 flex justify-center"
      >Admin Panel
        <Bars3Icon className="w-6 h-6" />
      </button>

      <nav className="flex flex-col gap-2">
        
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <HomeIcon className="w-5 h-5" />
          {!collapsed && "Home"}
        </NavLink>

        <NavLink
          to="/admin/tasks"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <ClipboardDocumentListIcon className="w-5 h-5" />
          {!collapsed && "All Tasks"}
        </NavLink>

        <NavLink
          to="/admin/tasks/create"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <PlusCircleIcon className="w-5 h-5" />
          {!collapsed && "Create Task"}
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;