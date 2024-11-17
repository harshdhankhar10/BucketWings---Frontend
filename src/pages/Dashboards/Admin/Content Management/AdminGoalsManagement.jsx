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
  ResponsiveContainer
} from 'recharts';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-50">
  <div className="text-center">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
  </div>
</div>
);

const AdminGoalsManagement = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/admin/analytics`
        );
        if (response.data.success) {
          setAnalytics(response.data.analytics);
        }
      } catch (error) {
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

  if (!analytics) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <p>No analytics data available.</p>
      </div>
    );
  }

  const {
    completedGoals,
    totalGoals,
    totalCompletedGoals,
    totalIncompleteGoals,
    percentageCompleted,
    percentageIncomplete,
    pendingGoals,
    mostEngaggedUser,
  } = analytics;

  // Data for Pie Chart
  const pieData = [
    { name: 'Completed', value: totalCompletedGoals },
    { name: 'Incomplete', value: totalIncompleteGoals }
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  // Data for Bar Chart
  const barData = [
    {
      name: 'Goals Status',
      completed: totalCompletedGoals,
      incomplete: totalIncompleteGoals,
      total: totalGoals
    }
  ];

  // Mock data for Line Chart (you can replace this with real historical data)
  const lineData = [
    { name: 'Week 1', completion: percentageCompleted * 0.2 },
    { name: 'Week 2', completion: percentageCompleted * 0.4 },
    { name: 'Week 3', completion: percentageCompleted * 0.6 },
    { name: 'Week 4', completion: percentageCompleted * 0.8 },
    { name: 'Current', completion: percentageCompleted }
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Goal Analytics Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Goals</h2>
          <p className="text-2xl">{totalGoals}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Completed Goals</h2>
          <p className="text-2xl text-green-600">{totalCompletedGoals}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Incomplete Goals</h2>
          <p className="text-2xl text-red-600">{totalIncompleteGoals}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Goals Distribution</h2>
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

        {/* Bar Chart */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Goals Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#0088FE" />
              <Bar dataKey="incomplete" fill="#FF8042" />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="p-4 bg-white rounded-lg shadow-md col-span-2">
          <h2 className="text-lg font-semibold mb-4">Completion Progress Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Engaged User Card */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Most Engaged User</h2>
        <div className='flex items-center mt-4 justify-between'>
        <p className="text-xl">
         User ID :  <span className='text-gray-500'>{mostEngaggedUser?._id || 'N/A'}</span>
        </p>
        <p className="text-md font-semibold text-gray-500 bg-gray-100 px-4 py-2 rounded-md">Progress: {mostEngaggedUser?.progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default AdminGoalsManagement;