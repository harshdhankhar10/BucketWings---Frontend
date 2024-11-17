import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-50">
  <div className="text-center">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
  </div>
</div>
);

const AdminStoriesManagement = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/admin/analytics`
        );
        if (response.data.success) {
          setAnalytics(response.data.analytics);
        }
      } catch (error) {
        setError('Failed to fetch analytics data.');
        console.error('Error fetching analytics:', error);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <p>No analytics data available.</p>
      </div>
    );
  }

  const { 
    totalStories, 
    totalLikes, 
    publicStories, 
    mostLikedStory, 
    userWithMostStories 
  } = analytics;

  const pieData = [
    { name: 'Public Stories', value: publicStories },
    { name: 'Private Stories', value: totalStories - publicStories }
  ];

  const COLORS = ['#8884d8', '#82ca9d'];

  const barData = [
    {
      name: 'Stories & Likes',
      'Total Stories': totalStories,
      'Public Stories': publicStories,
      'Total Likes': totalLikes
    }
  ];

  const trendData = [
    { month: 'Jan', stories: totalStories * 0.5, likes: totalLikes * 0.3 },
    { month: 'Feb', stories: totalStories * 0.6, likes: totalLikes * 0.5 },
    { month: 'Mar', stories: totalStories * 0.8, likes: totalLikes * 0.7 },
    { month: 'Apr', stories: totalStories, likes: totalLikes }
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Admin Stories Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Stories</h2>
          <p className="text-3xl font-bold text-purple-600">{totalStories}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Likes</h2>
          <p className="text-3xl font-bold text-pink-600">{totalLikes}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Public Stories</h2>
          <p className="text-3xl font-bold text-blue-600">{publicStories}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Story Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Story Metrics Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total Stories" fill="#8884d8" />
              <Bar dataKey="Public Stories" fill="#82ca9d" />
              <Bar dataKey="Total Likes" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Engagement Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="stories" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="likes" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      
    </div>
  );
};

export default AdminStoriesManagement;