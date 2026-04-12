import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen overflow-hidden">

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex pt-16 h-full">
        
        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-40">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Main Content */}
        <main
          className={`flex-1 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 p-6 transition-all duration-300 ${
            collapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminDashboard;