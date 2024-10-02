// components/FilterTasks.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, CheckCircle, Clock, AlertCircle, PauseCircle } from 'lucide-react';

const FilterTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = ['All', 'Not Started', 'In Progress', 'Completed', 'On Hold'];

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]); 

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/filter-tasks`, {
        params: {
          status: status === 'All' ? '' : status
        }
      });
      setTasks(response.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError('Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (taskStatus) => {
    switch (taskStatus) {
      case 'Not Started':
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'On Hold':
        return <PauseCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Filter Tasks</h1>

        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-6 w-6 text-purple-500" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white overflow-hidden shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {task.priority}
                  </span>
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{task.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(task.status)}
                    <span className="ml-2 text-sm font-medium text-gray-900">{task.status}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-8">
            No tasks found for the selected status.
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterTasks;
