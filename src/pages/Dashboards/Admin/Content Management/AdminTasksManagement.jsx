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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-50">
  <div className="text-center">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
  </div>
</div>
);

const AdminTasksManagement = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/admin/analytics`
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
    totalTasks,
    completedTasks,
    inProgressTasks,
    onHoldTasks,
    notStartedTasks,
    averageTaskCompletionTime,
    averageTaskPriority,
    averageTaskCompletionRate,
    averageTaskInProgressRate,
    averageTaskOnHoldRate,
    averageTaskNotStartedRate,
  } = analytics;

  const pieData = [
    { name: 'Completed', value: completedTasks, color: '#4CAF50' },
    { name: 'In Progress', value: inProgressTasks, color: '#2196F3' },
    { name: 'On Hold', value: onHoldTasks, color: '#FFC107' },
    { name: 'Not Started', value: notStartedTasks, color: '#F44336' }
  ];

  const radarData = [
    {
      metric: 'Completion Rate',
      value: averageTaskCompletionRate * 100,
      color : '#4CAF50'
    },
    {
      metric: 'In Progress Rate',
      value: averageTaskInProgressRate * 100,
      color : '#2196F3'
    },
    {
      metric: 'On Hold Rate',
      value: averageTaskOnHoldRate * 100,
      color : '#FFC107'
    },
    {
      metric: 'Not Started Rate',
      value: averageTaskNotStartedRate * 100,
      color : '#F44336'
    }
  ];

  const trendData = [
    { month: 'Jan', completed: completedTasks * 0.4, inProgress: inProgressTasks * 0.6 },
    { month: 'Feb', completed: completedTasks * 0.6, inProgress: inProgressTasks * 0.7 },
    { month: 'Mar', completed: completedTasks * 0.8, inProgress: inProgressTasks * 0.8 },
    { month: 'Apr', completed: completedTasks, inProgress: inProgressTasks }
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Tasks Analytics Dashboard </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Tasks</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalTasks}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
          <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">In Progress</h2>
          <p className="text-3xl font-bold text-blue-600">{inProgressTasks}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">On Hold</h2>
          <p className="text-3xl font-bold text-yellow-600">{onHoldTasks}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Not Started</h2>
          <p className="text-3xl font-bold text-red-600">{notStartedTasks}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Task Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Task Rates Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
             <Pie 
                data={radarData} 
                dataKey="value" 
                nameKey="metric" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label                 
              >
                {radarData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Task Completion Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#4CAF50" 
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="inProgress" 
                stroke="#2196F3" 
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Average Completion Time</h2>
          <p className="text-3xl font-bold text-purple-600">{averageTaskCompletionTime} hrs</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Task Completion Rate</h2>
          <p className="text-3xl font-bold text-purple-600">
            {(averageTaskCompletionRate * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminTasksManagement;