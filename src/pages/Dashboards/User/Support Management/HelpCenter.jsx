import React, { useState } from 'react';
import { Search, Book, MessageCircle, FileText, ChevronRight } from 'lucide-react';

const HelpCenter = () => {

  const categories = [
    { icon: <Book className="w-6 h-6" />, title: 'Getting Started', description: 'Learn the basics of our platform' },
    { icon: <MessageCircle className="w-6 h-6" />, title: 'FAQs', description: 'Find answers to common questions' },
    { icon: <FileText className="w-6 h-6" />, title: 'User Guides', description: 'Detailed instructions for advanced features' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Help Center</h1>
        
        {/* Search Bar */}
      

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <a href="#" className="text-purple-600 font-medium flex items-center hover:text-purple-800 transition duration-300 ease-in-out">
                Learn more <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need more help?</h2>
          <p className="mb-6">Our support team is always here to assist you. Get in touch with us for personalized help.</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 ease-in-out">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;