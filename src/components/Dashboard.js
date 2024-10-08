// src/components/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import useCustomFetch from '../utils/CustomFetch';

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const customFetch = useCustomFetch();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await customFetch('http://127.0.0.1:5000/api/user-profile', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else if (response.status === 401) {
          setError('Session expired. Please log in again.');
          logout();
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to fetch user data.');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('An error occurred while fetching data.');
      }
    };

    fetchUserData();
  }, [customFetch, logout]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!userData) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome, {userData.first_name}!</h1>
      <div className="flex items-center mb-6">
        <img
          src={`http://localhost:5000/${userData.profile_picture}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-4 object-cover"
        />
        <div>
          <p className="text-lg"><strong>Username:</strong> {userData.username}</p>
          <p className="text-lg"><strong>Email:</strong> {userData.email}</p>
          <p className="text-lg"><strong>Phone:</strong> {userData.phone_number}</p>
          <p className="text-lg"><strong>Date of Birth:</strong> {userData.date_of_birth}</p>
        </div>
      </div>
      {/* Add more dashboard features here */}
    </div>
  );
};

export default Dashboard;
