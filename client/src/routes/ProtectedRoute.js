import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/auth/user-auth`
        );
        if (response.data.ok) {
          setIsLoading(false);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    if (auth?.token) {
      checkAuth();
    } else {
      navigate("/login");
    }
  }, [auth?.token, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
