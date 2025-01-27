import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = signupInfo;

    if (!username || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const response = await fetch('https://deploy-mern-stack-authentication-api.vercel.app/auth/signup/auth/signup' {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      const { success, error } = result;

      if (success) {
        toast.success("Signup successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        return toast.error(error.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      toast.error(err.message || "An error occurred while signing up");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Signup Form</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={signupInfo.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupInfo.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
