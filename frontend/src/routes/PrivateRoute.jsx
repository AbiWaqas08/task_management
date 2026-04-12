import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roleRequired }) => {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/" />;

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;