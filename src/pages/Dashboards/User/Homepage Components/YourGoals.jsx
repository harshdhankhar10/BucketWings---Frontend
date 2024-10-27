import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flag, Loader, AlertCircle, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const YourGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredGoal, setHoveredGoal] = useState(null);

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

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const LoadingState = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg h-56 flex flex-col items-center justify-center space-y-4">
      <Loader className="animate-spin text-blue-500" size={32} />
      <p className="text-gray-600 animate-pulse">Loading your goals...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg h-56">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <AlertCircle className="text-red-500" size={32} />
        <h2 className="text-xl font-semibold text-red-500">Oops! Something went wrong</h2>
        <p className="text-gray-600 text-center">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <Target className="text-gray-400" size={32} />
      <p className="text-gray-500 text-center">No goals found. Time to set some new targets!</p>
     <Link to="/dashboard/user/create-task">
     <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Create Your First Goal
      </button>
      </Link>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-56 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Flag className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Your Goals</h2>
        </div>
        {goals.length > 0 && (
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500" size={20} />
            <span className="text-sm font-medium text-gray-600">
              {goals.length} Active Goal{goals.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {goals.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <div 
              key={index}
              className="transform transition-all duration-200 hover:scale-102"
              onMouseEnter={() => setHoveredGoal(index)}
              onMouseLeave={() => setHoveredGoal(null)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{goal.title}</h3>
                  {hoveredGoal === index && (
                    <p className="text-sm text-gray-500 mt-1 transition-opacity">
                      Target completion: {goal.targetDate}
                    </p>
                  )}
                </div>
                <span className={`text-sm font-semibold ${
                  goal.progress >= 80 ? 'text-green-500' : 
                  goal.progress >= 50 ? 'text-blue-500' : 
                  goal.progress >= 25 ? 'text-yellow-500' : 
                  'text-red-500'
                }`}>
                  {goal.progress}%
                </span>
              </div>
              <div className="relative w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${getProgressColor(goal.progress)} h-full rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${goal.progress}%` }}
                >
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourGoals;