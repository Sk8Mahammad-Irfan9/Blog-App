import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import "../../css/login.css"

const Login = () => {
  document.title = "Login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log("Email or Password is wrong!");
      // console.log(err);
    }
  };
  return (
    <>
      <div className="login-container">
        <h1 className="login-title">LOGIN</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="login-input"
              placeholder="Enter Email"
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />

            <input
              className="login-input"
              id="outlined-password-input"
              placeholder="Enter password"
              label="Password"
              type="password"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="button-container">
              <button className="login-button" variant="outlined" type="submit">
                LOGIN
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
