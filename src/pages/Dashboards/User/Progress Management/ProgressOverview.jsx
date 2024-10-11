import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Card = ({ children, title, value, icon: Icon, color }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 ${color}`}>
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <Icon className={`w-8 h-8 ${color.replace('border-l-', 'text-')}`} />
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      {children}
    </div>
  </div>
);

const ProgressOverview = () => {
    const [data, setData] = useState({ achievements: {}, goals: {}, stories: {}, tasks: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [achievementsRes, goalsRes, storiesRes, tasksRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/analytics`),
                    axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/analytics`),
                    axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/analytics`),
                    axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/analytics`)
                ]);

                setData({
                    achievements: achievementsRes.data.achievements,
                    goals: goalsRes.data.goal,
                    stories: storiesRes.data.story,
                    tasks: tasksRes.data.tasks
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const achievementsData = [
        { name: 'Featured', value: data.achievements.featuredAchievements },
        { name: 'Non-Featured', value: data.achievements.nonFeaturedAchievements },
        { name: 'Private', value: data.achievements.privateAchievements },
        { name: 'Public', value: data.achievements.publicAchievements },
    ];

    const goalsData = [
        { name: 'Completed', value: data.goals.totalCompletedGoals },
        { name: 'Incomplete', value: data.goals.totalIncompleteGoals },
    ];

    const storiesData = [
        { name: 'Public', value: data.stories.publicStories },
        { name: 'Total', value: data.stories.totalStories },
        { name: 'Comments', value: data.stories.totalComments },
        { name: 'Likes', value: data.stories.totalLikes },
    ];

    const tasksData = [
        { name: 'Completed', value: data.tasks.completedTasks },
        { name: 'Pending', value: data.tasks.pendingTasks },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-900">Progress Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <Card title="Achievements" value={data.achievements.totalAchievements} color="border-l-blue-500" icon={() => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}>
                        <p className="text-sm text-gray-600">Total achievements reached</p>
                    </Card>
                    <Card title="Goals" value={`${data.goals.percentageCompleted}%`} color="border-l-green-500" icon={() => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>}>
                        <p className="text-sm text-gray-600">Goal completion rate</p>
                    </Card>
                    <Card title="Stories" value={data.stories.totalStories} color="border-l-yellow-500" icon={() => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>}>
                        <p className="text-sm text-gray-600">Total stories shared</p>
                    </Card>
                    <Card title="Tasks" value={data.tasks.totalTasks} color="border-l-red-500" icon={() => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>}>
                        <p className="text-sm text-gray-600">Total tasks managed</p>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements Breakdown</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={achievementsData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {achievementsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Goals Progress</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={goalsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Stories Engagement</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={storiesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip />
                                <Legend />
                                {COLORS.map((color, index) => (
                                    <Line key={index} type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tasks Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={tasksData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {tasksData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressOverview;