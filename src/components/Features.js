// src/components/Features.js
import React from 'react';
import { FaWallet, FaChartPie, FaRegCalendarAlt } from 'react-icons/fa';

const Features = () => {
  const featureList = [
    {
      icon: <FaWallet size={40} className="text-blue-500 mb-4" />,
      title: 'Expense Tracking',
      description: 'Keep a close eye on where your money goes with detailed expense tracking.',
    },
    {
      icon: <FaChartPie size={40} className="text-blue-500 mb-4" />,
      title: 'Budgeting Tools',
      description: 'Create and manage budgets to help you stay on top of your financial goals.',
    },
    {
      icon: <FaRegCalendarAlt size={40} className="text-blue-500 mb-4" />,
      title: 'Financial Reports',
      description: 'Generate insightful reports to analyze your financial health over time.',
    },
  ];

  return (
    <section id="features" className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
      <div className="flex flex-wrap -mx-4">
        {featureList.map((feature, index) => (
          <div key={index} className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
