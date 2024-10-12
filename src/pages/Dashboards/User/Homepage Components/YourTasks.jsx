import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import "../../styles.css"

const YourTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/pending-tasks`);
        if (response.data.success) {
          setTasks(response.data.tasks);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in-progress':
        return 'text-yellow-500';
      default:
        return 'text-red-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded mb-3"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-500">Error</h2>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found. Enjoy your free time!</p>
      ) : (
        <div className="max-h-56 overflow-y-scroll scrollbar-hide"> 
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li
                key={task._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {task.status === 'completed' ? (
                    <CheckCircleIcon className="text-green-500" size={24} />
                  ) : (
                    <XCircleIcon className={`${getStatusColor(task.status)}`} size={24} />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon size={16} className="mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default YourTasks;
