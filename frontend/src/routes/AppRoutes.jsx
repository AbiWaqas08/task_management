import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminHome from "../pages/admin/AdminHome";
import AllTasks from "../pages/tasks/AllTasks";
import CreateTask from "../pages/tasks/CreateTask";
import UpdateTask from "../pages/tasks/UpdateTask";

// User pages
import UserDashboard from "../pages/user/UserDashboard";
import UserTasks from "../pages/user/UserTasks";

// Auth pages
import Login from "../pages/auth/Login";
import Profile from "../pages/admin/Profile"; // can be shared
import UserHome from "../pages/user/UserHome";
import Register from "../pages/auth/Register";

const AppRoutes = () => {
  const { user } = useAuth();

   return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        {/* Admin routes */}
        {user?.role === "admin" && (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="tasks" element={<AllTasks />} />
            <Route path="tasks/create" element={<CreateTask />} />
            <Route path="tasks/update/:id" element={<UpdateTask />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        )}

        {/* User routes */}
        {user?.role === "user" && (
          <Route path="/user" element={<UserDashboard />}>
            <Route index element={<UserHome/>} />
            
            <Route path="tasks" element={<UserTasks />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        )}

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user
                  ? user.role === "admin"
                    ? "/admin"
                    : "/user"
                  : "/login"
              }
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;