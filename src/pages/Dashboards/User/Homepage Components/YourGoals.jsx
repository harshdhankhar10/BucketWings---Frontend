import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flag, Loader } from 'lucide-react';

const YourGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/analytics`);
        if (response.data.success) {
          setGoals(response.data.pendingGoals);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('Failed to fetch goals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-56 flex items-center justify-center">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-56">
        <h2 className="text-xl font-semibold text-red-500">Error</h2>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-56 overflow-y-auto scrollbar-hide">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Flag className="mr-2 text-blue-500" size={24} />
        Your Goals
      </h2>
      {goals.length === 0 ? (
        <p className="text-gray-500">No goals found. Time to set some new targets!</p>
      ) : (
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{goal.title}</span>
                <span className="text-sm font-semibold text-blue-500">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourGoals;