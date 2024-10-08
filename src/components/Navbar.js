// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        alert(data.msg);
        logout(); // Clear tokens and update state
        navigate('/'); // Redirect to home page
      } else {
        alert(data.message || 'Failed to log out.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold text-gray-800">
            FinanceTracker
          </Link>
        </div>
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <div className={`flex-col md:flex md:flex-row md:space-x-6 items-center ${isMobileMenuOpen ? 'flex' : 'hidden'} md:visible`}>
          {auth.isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/features" className="text-gray-600 hover:text-gray-800">
                Features
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-800">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-800">
                Contact
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
