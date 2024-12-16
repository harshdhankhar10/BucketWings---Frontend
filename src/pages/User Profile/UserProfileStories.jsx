import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UserProfileStories = ({ stories }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6 py-4 border-t-2 border-gray-100"
    >
      <h2 className="text-3xl font-bold text-gray-700 mb-6">User Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
              {index + 1}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-xl mb-2 hover:text-purple-500 transition-colors">
                <Link to={`/stories/${story._id}`}>{story.title}</Link>
              </h3>
              <p className="text-sm text-gray-600">
                {story.content.replace(/<[^>]+>/g, '').substring(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserProfileStories;
