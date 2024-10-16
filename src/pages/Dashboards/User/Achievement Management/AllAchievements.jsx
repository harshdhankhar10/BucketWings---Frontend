import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiSearch, FiFilter } from 'react-icons/fi';

const AllAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/my-achievements`);
        setAchievements(response.data.achievements);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
      setIsLoading(false);
    };

    fetchAchievements();
  }, []);

  const filteredAchievements = achievements.filter(achievement =>
    achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || achievement.category === filterCategory)
  );

  const categories = [...new Set(achievements.map(a => a.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Page Heading */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-extrabold text-indigo-900"
          >
            Your Achievements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-indigo-600 mt-4"
          >
            Showcase your proudest moments and accomplishments.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-1/2">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="relative w-full sm:w-1/3">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-indigo-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Achievements Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {filteredAchievements.map((achievement) => (
                <motion.div
                  key={achievement._id}
                  className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <img
                      src={achievement.media || 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'}
                      alt={achievement.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 right-0 m-2 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {achievement.category}
                    </div>
                    <div>
                      {achievement.status === "private" && (
                        <span className="absolute top-0 left-0 m-2 bg-purple-500 text-white  px-3 py-1 rounded-full text-sm font-semibold">
                        {achievement.status}
                      </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-indigo-900 mb-2">{achievement.title}</h2>
                    <p className="text-indigo-600 mb-4">{achievement.description.substring(0, 100)}...</p>
                   <div className="flex justify-between items-center">
                   <Link
                      to={`/dashboard/user/achievement/view/${achievement._id}`}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
                    >
                      <FiAward className="mr-2" />
                      View Details
                    </Link>
                    <span className="text-gray-500 text-xm">
                      {new Date(achievement.createdAt).toLocaleDateString()}
                    </span>
                   </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* No Achievements Message */}
        {!isLoading && filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-indigo-600 py-20"
          >
            <FiAward className="mx-auto text-6xl mb-4" />
            <p className="text-xl">No achievements to display yet.</p>
            <p className="mt-2">Start adding your accomplishments!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AllAchievements;