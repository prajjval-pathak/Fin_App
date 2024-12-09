import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";
import { isAuthorized } from "../Utils/IsAuthorized";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticted] = useState("");

  const location = useLocation();
  useEffect(() => {
    const verifyAuthorization = async () => {
      try {
        const res = await isAuthorized();
        res === true
          ? setIsAuthenticted("Authorized")
          : setIsAuthenticted("UnAuthorized");
      } catch {
        setIsAuthenticted("UnAuthorized");
      }
    };
    verifyAuthorization();
    console.log(isAuthenticated);
  }, []);
  if (isAuthenticated === "") {
    return <p>Loading</p>;
  }
  return isAuthenticated === "Authorized" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
