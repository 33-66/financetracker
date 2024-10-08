// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    username_or_email: '',
    password: '',
  });
  const [error, setError] = useState('');
console.log(form);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        alert(data.message);
        // Store the tokens using AuthContext
        login(data.access_token, data.refresh_token);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        // Handle errors
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Welcome Back!</h2>

        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username or Email */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username_or_email"
              value={form.username_or_email}
              onChange={handleChange}
              required
              className="w-full focus:outline-none"
              placeholder="Username or Email"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full focus:outline-none"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </div>

        {/* Link to Signup */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
