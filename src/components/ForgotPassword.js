// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
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
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

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

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Send Reset Code
        </button>

        {/* Link to Login */}
        <p className="mt-4 text-center text-gray-600">
          Remembered your password?{' '}
          <Link to="/login" className="text-green-500 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
