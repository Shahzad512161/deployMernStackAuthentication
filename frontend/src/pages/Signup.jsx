import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you import `useNavigate`
import { ToastContainer, toast } from 'react-toastify'; // Ensure `toast` is imported
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for Toastify
import { handleError } from '../utils';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Ensure `navigate` is defined

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
      return toast.error('All fields are required');
    }

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      const {success, error} = result;
      console.log('Server response:', result);

      if (success) {
        toast.success('Signup successful'); // `toast` is properly defined here
        setTimeout(() => {
          navigate('/'); // `navigate` is properly defined here
        }, 1000);
      } else if (error ){
        const details = error?.details[0].message;
        return handleError(details)
        // return toast.error(result.message || 'Signup failed');
       
      }



    } catch (err) {
      console.error('Error during signup:', err);
      toast.error(err.message || 'An error occurred while signing up');
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
