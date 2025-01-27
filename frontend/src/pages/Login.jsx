import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you import `useNavigate`
import { ToastContainer, toast } from 'react-toastify'; // Ensure `toast` is imported
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for Toastify
// import { handleError } from '../utils';

const Login = () => {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Ensure `navigate` is defined

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const { email, password } = LoginInfo;
  
    if (!email || !password) {
      return toast.error('All fields are required');
    }
  
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      console.log('Login Response:', result); // Debugging
  
      const { success, jwtToken, name, error } = result;
  
      if (success) {
        localStorage.setItem('token', jwtToken); // Set immediately
        localStorage.setItem('LoggedInUser', name);
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/main');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        return toast.error(details || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      toast.error(err.message || 'An error occurred while logging in');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h1>Login Form</h1>
        
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={LoginInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={LoginInfo.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/signup">SignUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
