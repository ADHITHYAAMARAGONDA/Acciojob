// frontend/src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(userInfo);
    if (!user || !user.token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    console.error("ProtectedRoute - Error parsing userInfo:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
