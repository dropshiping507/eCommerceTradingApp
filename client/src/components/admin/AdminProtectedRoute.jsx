import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin-auth" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
