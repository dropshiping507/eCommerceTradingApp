import { Navigate, Outlet } from "react-router-dom";

const LeaderProtectedRoute = () => {
  const token = localStorage.getItem("leaderToken");

  if (!token) {
    return <Navigate to="/leader-auth" replace />;
  }

  return <Outlet />;
};

export default LeaderProtectedRoute;
