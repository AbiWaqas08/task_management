import { Outlet } from "react-router-dom";
import Sidebar from "../../components/UserSidebar";
import Navbar from "../../components/Navbar";

const UserDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          <Outlet /> {/* Render nested pages like UserTasks or Profile */}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;