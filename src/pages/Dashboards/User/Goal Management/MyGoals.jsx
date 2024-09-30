import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Clock, Calendar, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/myAllGoals`);
                setGoals(response.data.goals);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch goals. Please try again later.');
                setLoading(false);
            }
        };
        fetchGoals();
    }, []);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8 bg-[#F2F3F5]">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Goals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                    <div key={goal._id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
                        <div className="relative h-48 bg-purple-100">
                            <img
                                src={goal.image}
                                alt={goal.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <Link to={`/dashboard/user/view-goal/${goal._id}`} className="text-white font-semibold text-lg hover:text-[#E9D5FF]">{goal.title}</Link>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="mb-2">
                                <span className="inline-block bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                                    {goal.category}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: goal.description }} />
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>Created: {format(new Date(goal.createdAt), 'MMM d, yyyy')}</span>
                            </div>
                            {
  new Date(goal.deadline) - new Date() < 0 ? (
    <div className="flex items-center text-sm text-red-500 mb-2">
      <Clock className="h-4 w-4 mr-2" />
      <span>Expired</span>
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

                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="flex items-center">
                                        <BarChart2 className="h-4 w-4 mr-2 text-blue-500" />
                                        <span className="text-xs font-semibold inline-block text-blue-600">
                                            Progress
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-blue-600">
                                            {goal.progress}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                    <div style={{ width: `${goal.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyGoals;