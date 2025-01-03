import React from 'react'
import { motion } from 'framer-motion';
import { RiBookLine, RiToolsLine, RiVideoLine, RiArticleLine } from 'react-icons/ri';


const ResourceHighlights = () => {
    const resources = [
        {
          id: 1,
          title: 'Productivity Guide',
          description: 'Learn essential productivity techniques and tools',
          icon: RiBookLine,
          type: 'Guide',
        },
        {
          id: 2,
          title: 'Task Management Tools',
          description: 'Recommended tools for better task organization',
          icon: RiToolsLine,
          type: 'Tools',
        },
        {
          id: 3,
          title: 'Goal Setting Workshop',
          description: 'Video tutorial on effective goal setting',
          icon: RiVideoLine,
          type: 'Video',
        },
        {
          id: 4,
          title: 'Time Management Tips',
          description: 'Best practices for managing your time',
          icon: RiArticleLine,
          type: 'Article',
        },
      ];

      const typeColors = {
        Guide: 'bg-purple-100 text-primary',
        Tools: 'bg-blue-100 text-blue-600',
        Video: 'bg-red-100 text-red-600',
        Article: 'bg-green-100 text-green-600',
      };
      
      
      
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold">Recommended Resources</h3>
      <span className="text-purple-500 hover:text-purple-600 cursor-pointer text-sm">Browse All</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {resources.map((resource) => (
        <motion.div
          key={resource.id}
          whileHover={{ y: -5 }}
          className="p-4 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-lg ${typeColors[resource.type]}`}>
              <resource.icon className="text-xl" />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${typeColors[resource.type]}`}>
              {resource.type}
            </span>
          </div>
          <h4 className="font-semibold mb-2">{resource.title}</h4>
          <p className="text-sm text-gray-600">{resource.description}</p>
        </motion.div>
      ))}
    </div>
  </div>

  )
}

export default ResourceHighlights