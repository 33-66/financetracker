// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendar, FaFlag, FaImage } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    country_code: '',
    date_of_birth: '',
    profile_picture: null, // For file upload
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      const file = files[0];
      setForm({ ...form, profile_picture: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Prepare form data
    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        // Removed 'Content-Type' header to let the browser set it automatically
        body: formData,
      });

      // Check if the response has content
      const data =  await response.json()

      if (response.ok) {
        // Registration successful
        alert(data.message);
        navigate('/login'); // Redirect to login page
      } else {
        // Handle errors
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to the server.');
    }
  };
console.log(form);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Your Account</h2>

        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={20}
              pattern="^[a-zA-Z0-9_]+$"
              title="Username can only contain letters, numbers, and underscores."
              className="w-full focus:outline-none"
              placeholder="Username"
            />
          </div>

          {/* First Name */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full focus:outline-none"
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full focus:outline-none"
              placeholder="Last Name"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full focus:outline-none"
              placeholder="Email Address"
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaPhone className="text-gray-500 mr-2" />
            <input
              type="tel"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              required
              className="w-full focus:outline-none"
              placeholder="Phone Number"
            />
          </div>

          {/* Country Code */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaFlag className="text-gray-500 mr-2" />
            <input
              type="text"
              name="country_code"
              value={form.country_code}
              onChange={handleChange}
              required
              placeholder="Country Code (e.g., +1)"
              className="w-full focus:outline-none"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2">
            <FaCalendar className="text-gray-500 mr-2" />
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={handleChange}
              required
              className="w-full focus:outline-none"
              placeholder="Date of Birth"
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

          {/* Profile Picture */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Profile Picture (optional)</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaImage className="text-gray-500 mr-2" />
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={handleChange}
                className="w-full focus:outline-none"
              />
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="Profile Preview" className="mt-4 w-24 h-24 object-cover rounded-full mx-auto" />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
