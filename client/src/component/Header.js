import React from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import "../css/header.css";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const logout = () => {
    toast.success("Logged out!");
    localStorage.removeItem("auth");
    window.location.reload();
  };

  const user = auth?.token;
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          Blog
        </Link>
        <nav className="nav">
          {user ? (
            <>
              <Link to="/write-blog/blog" className="nav-link">
                Create New Post
              </Link>
              <Link to="#" onClick={logout} className="nav-link">
                Logout
              </Link>
              <p className="user-greeting">{`Hello @${auth?.user.username}`}</p>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
