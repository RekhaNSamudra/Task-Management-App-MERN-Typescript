import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to fetch tasks - if 401, user is not authenticated
        await api.get("/tasks");
        setIsAuthenticated(true);
      } catch (error: any) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        } else {
          // Other errors, allow access and let component handle
          setIsAuthenticated(true);
        }
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;