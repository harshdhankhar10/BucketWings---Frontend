import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from "recharts";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-50">
  <div className="text-center">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
  </div>
</div>      
);

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-2" style={{ color }}>{value}</p>
      </div>
      <Icon className="w-8 h-8" style={{ color }} />
    </div>
  </div>
);

const AdminAchievementsManagement = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/admin/analytics`
        );
        if (response.data.success) {
          setAnalytics(response.data.analytics);
        } else {
          setError("Failed to fetch analytics.");
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("An error occurred while fetching analytics.");
      }

      setLoading(false);
    };

    fetchAnalytics();
  }, []);


  if (loading) return <Loader />;
  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );
  if (!analytics) return null;


  const pieData = [
    { name: 'Public', value: analytics.publicAchievements },
    { name: 'Private', value: analytics.totalAchievements - analytics.publicAchievements }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Achievements Analytics</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Achievements" 
            value={analytics.totalAchievements}
            icon={(props) => (
              <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            )}
            color="#0088FE"
          />
          <StatCard 
            title="Total Views" 
            value={analytics.totalViews}
            icon={(props) => (
              <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
            color="#00C49F"
          />
          <StatCard 
            title="Total Likes" 
            value={analytics.totalLikes}
            icon={(props) => (
              <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            color="#FFBB28"
          />
          <StatCard 
            title="Public Achievements" 
            value={analytics.publicAchievements}
            icon={(props) => (
              <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            )}
            color="#FF8042"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Achievement Visibility</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
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

          <div className="bg-white p-6 rounded-lg shadow-md max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">All Public Achievements</h2>
              {analytics.publicAchievementsLists.length > 0 ? (
                  analytics.publicAchievementsLists.map((achievement, index) => (
                    <div key={index} className="border-b border-gray-200 py-4">
                     <a href={`/achievements/${achievement._id}`} target="_blank" className="block hover:underline">
                     <h3 className="text-lg font-semibold">{achievement.title}</h3>
                     </a>
                      <p className="text-gray-500">{achievement.description.slice(0, 100)}...</p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">No public achievements found.</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAchievementsManagement;