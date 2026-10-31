import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!["ADMIN", "OWNER"].includes(String(user.role || "").toUpperCase())) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
