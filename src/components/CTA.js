// src/components/CTA.js
import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="bg-blue-500 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
        <p className="mb-6">Join thousands of users who are managing their finances effectively.</p>
        <Link to="/signup" className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600">Sign Up Now</Link>
      </div>
    </section>
  );
};

export default CTA;
