import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />; 
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/visaoGeral" />; 
  }

  return children; 
}
