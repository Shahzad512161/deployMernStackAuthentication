import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true); // User is authenticated

      // Redirect to /main if they are not on login/signup page
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/main", { replace: true });
      }
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, [location, setIsAuthenticated, navigate]);

  return null; // This component doesn't render anything
};

export default RefreshHandler;
