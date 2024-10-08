// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    token: '',
    new_password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
        // Optionally redirect to login after a delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        {message && (
          <div className="mb-4 text-green-500 text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}

        {/* Reset Token */}
        <div className="mb-4">
          <label className="block text-gray-700">Reset Token</label>
          <input
            type="text"
            name="token"
            value={form.token}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your reset token"
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your new password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Reset Password
        </button>

        {/* Link to Login */}
        <p className="mt-4 text-center text-gray-600">
          Remembered your password?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
