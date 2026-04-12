// frontend/src/layouts/AdminLayout.jsx
import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;