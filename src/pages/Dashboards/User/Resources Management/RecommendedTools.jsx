import React, { useState } from 'react';
import { Search, Star, ExternalLink, ThumbsUp, Download } from 'lucide-react';

const RecommendedTools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const tools = [
    { name: 'SuperProductivity', category: 'Productivity', rating: 4.8, downloads: '100K+', description: 'Boost your workflow with AI-powered task management.', icon: '🚀' },
    { name: 'CodeWizard IDE', category: 'Development', rating: 4.9, downloads: '500K+', description: 'Advanced code editor with intelligent suggestions.', icon: '💻' },
    { name: 'DesignMaster Pro', category: 'Design', rating: 4.7, downloads: '250K+', description: 'Create stunning visuals with ease.', icon: '🎨' },
    { name: 'DataCruncher', category: 'Analytics', rating: 4.6, downloads: '75K+', description: 'Powerful data analysis and visualization tool.', icon: '📊' },
    { name: 'SecureShield', category: 'Security', rating: 4.9, downloads: '1M+', description: 'Comprehensive cybersecurity suite for all devices.', icon: '🛡️' },
    { name: 'CloudMaster', category: 'Cloud Computing', rating: 4.8, downloads: '300K+', description: 'Simplify your cloud infrastructure management.', icon: '☁️' },
  ];

  const categories = ['All', ...new Set(tools.map(tool => tool.category))];

  const filteredTools = tools.filter(tool => 
    (activeCategory === 'All' || tool.category === activeCategory) &&
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Recommended Tools</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out ${
                activeCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-4xl mr-3">{tool.icon}</span>
                    <h2 className="text-xl font-semibold text-gray-800">{tool.name}</h2>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {tool.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{tool.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    <span>{tool.downloads} downloads</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <a href="#" className="text-purple-600 font-medium flex items-center hover:text-purple-800 transition duration-300 ease-in-out">
                    Learn More
                    <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition duration-300 ease-in-out flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Recommend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tools found matching "{searchQuery}". Try a different search term or category.</p>
          </div>
        )}

        {/* Featured Tool Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Featured Tool: AI Assistant Pro</h2>
          <p className="mb-6">Harness the power of artificial intelligence to supercharge your productivity. AI Assistant Pro learns from your work patterns to provide personalized suggestions and automate routine tasks.</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 ease-in-out flex items-center">
            Try for Free
            <ExternalLink className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedTools;