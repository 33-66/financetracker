// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gray-100 pt-24">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Take Control of Your Finances</h1>
          <p className="text-gray-600 mb-6">Manage your income, track your expenses, and achieve your financial goals with ease.</p>
          <Link to="/signup" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Get Started</Link>
        </div>
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img src="https://images.pexels.com/photos/4475524/pexels-photo-4475524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Finance Tracking" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
