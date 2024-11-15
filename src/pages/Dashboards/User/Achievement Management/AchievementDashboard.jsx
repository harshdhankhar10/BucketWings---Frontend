import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { FiAward, FiEye, FiThumbsUp, FiMessageCircle } from 'react-icons/fi';

const AchievementDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/analytics`);
        setAnalytics(response.data.analytics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
      setIsLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <p className="text-2xl text-indigo-700">Failed to load analytics. Please try again later.</p>
      </div>
    );
  }

  const barData = [
    { name: 'Achievements', value: analytics.totalAchievements },
    { name: 'Views', value: analytics.totalViews },
    { name: 'Likes', value: analytics.totalLikes },
  ];

  const pieData = [
    { name: 'Views', value: analytics.totalViews },
    { name: 'Likes', value: analytics.totalLikes },
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 text-center">Achievement Dashboard</h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            { icon: FiAward, title: 'Total Achievements', value: analytics.totalAchievements, color: 'bg-indigo-500' },
            { icon: FiEye, title: 'Total Views', value: analytics.totalViews, color: 'bg-green-500' },
            { icon: FiThumbsUp, title: 'Total Likes', value: analytics?.totalLikes || 0, color: 'bg-yellow-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className={`${stat.color} p-4`}>
                <stat.icon className="text-white text-3xl" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700">{stat.title}</h2>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{stat.value.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-indigo-900 mb-6">Achievement Overview</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#F3F4F6', border: 'none', borderRadius: '0.5rem' }}
                  cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-indigo-900 mb-6">Engagement Breakdown</h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#F3F4F6', border: 'none', borderRadius: '0.5rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementDashboard;