import React, { useState } from 'react';
import { Search, Book, Video, FileText, ChevronRight, Clock } from 'lucide-react';

const GuidesAndTutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const content = [
    { type: 'guide', title: 'Getting Started with Our Platform', duration: '10 min read', icon: <Book className="w-6 h-6" /> },
    { type: 'video', title: 'Advanced Feature Walkthrough', duration: '15 min watch', icon: <Video className="w-6 h-6" /> },
    { type: 'tutorial', title: 'Creating Your First Project', duration: '20 min read', icon: <FileText className="w-6 h-6" /> },
    { type: 'guide', title: 'Best Practices for Optimal Performance', duration: '12 min read', icon: <Book className="w-6 h-6" /> },
    { type: 'video', title: 'Tips and Tricks for Power Users', duration: '8 min watch', icon: <Video className="w-6 h-6" /> },
    { type: 'tutorial', title: 'Customizing Your Workspace', duration: '18 min read', icon: <FileText className="w-6 h-6" /> },
  ];

  const filteredContent = content.filter(item => 
    (activeTab === 'all' || item.type === activeTab) &&
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Guides and Tutorials</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search guides and tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {['all', 'guide', 'video', 'tutorial'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{item.duration}</span>
                </div>
                <a href="#" className="text-purple-600 font-medium flex items-center hover:text-purple-800 transition duration-300 ease-in-out">
                  {item.type === 'video' ? 'Watch now' : 'Read now'}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No results found for "{searchQuery}". Try a different search term.</p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Featured Tutorial</h2>
          <p className="mb-6">Master the art of data visualization with our comprehensive guide.</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 ease-in-out">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidesAndTutorials;