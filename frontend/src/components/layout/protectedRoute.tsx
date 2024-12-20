import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

type ProtectedRouteProps = {
  allowedRoles: string[];
  redirection?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirection,
}) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/ourStudents" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to={redirection ? redirection : "/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
