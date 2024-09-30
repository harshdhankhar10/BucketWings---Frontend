import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { Calendar, Clock, BarChart2, User, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ViewGoal = () => {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/info/${id}`);
        setGoal(response.data.goal);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch goal. Please try again later.');
        setLoading(false);
      }
    };
    fetchGoal();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  if (!goal) return <div className="flex justify-center items-center h-screen">Goal not found</div>;


  const handleDeleteGoal  = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/delete/${id}`);
      if (response.data.success) {
        Swal.fire({
          title: 'Goal deleted successfully',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.replace('/dashboard/user/myGoals');
        }, 1500);


      } else {
        Swal.fire({
          title: 'An error occurred',
          text: response.data.message,
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
      Swal.fire({
        title: 'An error occurred',
        text: 'An error occurred while deleting the goal',
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 sm:h-80">
          <img
            src={goal.image}
            alt={goal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{goal.title}</h1>
              <span className="inline-block bg-purple-500 text-white text-sm px-3 py-1 rounded-full uppercase tracking-wide">
                {goal.category}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: goal.description }} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm text-gray-600">Created: {format(new Date(goal.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            {
  new Date(goal.deadline) - new Date() < 0 ? (
    <div className="flex items-center text-sm text-red-500 mb-2">
      <Clock className="h-4 w-4 mr-2" />
      <span>Expired ({format(new Date(goal.deadline), 'MMM d, yyyy')})</span>
    </div>
  ) : new Date(goal.deadline) - new Date() < 259200000 ? (
    <div className="flex items-center text-sm text-yellow-500 mb-2">
      <Clock className="h-4 w-4 mr-2" />
      <span>Deadline: {format(new Date(goal.deadline), 'MMM d, yyyy')} (Approaching Soon)</span>
    </div>
  ) : (
    <div className="flex items-center text-sm text-gray-500 mb-2">
      <Clock className="h-4 w-4 mr-2" />
      <span>Deadline: {format(new Date(goal.deadline), 'MMM d, yyyy')}</span>
    </div>
  )
}

            <div className="flex items-center">
              <User className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm text-gray-600">User ID: {goal.user}</span>
            </div>
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm text-gray-600">Last Updated: {format(new Date(goal.updatedAt), 'MMMM d, yyyy')}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Progress</h2>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                    {goal.progress}% Complete
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-purple-600">
                    {goal.progress}/100
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                <div style={{ width: `${goal.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Link to={`/dashboard/user/edit-goal/${goal._id}`}>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Edit Goal
            </button>
            </Link>
            <button
            onClick = {handleDeleteGoal}
             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2 transition duration-300">
                Delete Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGoal;