// src/components/Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} FinanceTracker. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="hover:text-white"><FaFacebookF /></a>
          <a href="https://twitter.com" className="hover:text-white"><FaTwitter /></a>
          <a href="https://linkedin.com" className="hover:text-white"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
