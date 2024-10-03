import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Paperclip, Flag, CheckSquare, User, AlignLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ViewTask = () => {
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/task/${id}`);
        if (response.data.success) {
          setTask(response.data.task);
        }
      } catch (error) {
        setError('Failed to fetch task');
      }
    };

    fetchTask();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-red-600 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-gray-600 text-xl font-semibold">Loading task...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started': return 'bg-gray-200 text-gray-800';
      case 'In Progress': return 'bg-blue-200 text-blue-800';
      case 'Completed': return 'bg-green-200 text-green-800';
      case 'On Hold': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-green-200 text-green-800';
      case 'Medium': return 'bg-yellow-200 text-yellow-800';
      case 'High': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{task.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Assigned to:</span>
              <span className="ml-2 text-sm font-medium text-gray-900">{task.assignedTo}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Due Date:</span>
              <span className="ml-2 text-sm font-medium text-gray-900">{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <CheckSquare className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
            <div className="flex items-center">
              <Flag className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Priority:</span>
              <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
              <AlignLeft className="h-5 w-5 text-gray-400 mr-2" />
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
          </div>
          
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                <Paperclip className="h-5 w-5 text-gray-400 mr-2" />
                Attachment
              </h2>
              {(task.attachment !== null ) ? (
                <img src={task.attachment} alt="Task attachment" className="max-w-full h-auto rounded-lg shadow-md" />
              )  : 
                <p className="text-gray-700">No attachment Included</p>
              }
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;