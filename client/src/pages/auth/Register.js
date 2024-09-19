import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../css/register.css";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        { username, email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error(err.response.message);
      } else {
        toast.error(err.data.message);
      }
      console.error(err);
    }
  };

  return (
    <>
      <div class="register-container">
        <h1 class="register-title">Register</h1>
        <form id="registerForm" class="register-form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="username" class="form-label">
              Username
            </label>
            <div class="tooltip-container">
              <input
                type="text"
                id="username"
                class="form-input"
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <span class="tooltip-text">
                Choose your username wisely; it’s permanent.
              </span>
            </div>
          </div>
          <div class="form-group">
            <label htmlFor="email" class="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              class="form-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label htmlFor="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              class="form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="form-group">
            <button type="submit" class="form-button">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
