import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import axios from 'axios';

const AdminNotesManagement = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/notes/admin/analytics`
        );
        if (response.data.success) {
          setAnalytics(response.data.analytics);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className=" border-b border-gray-200  w-full z-30 ">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Notes Analytics Dashboard
              </h1>
            
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                Last Updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-4 px-6 pb-8 max-w-7xl mx-auto">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Notes</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalNotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Notes</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalActiveNotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-amber-50 rounded-lg">
                <svg className="w-6 h-6 text-amber-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Archived Notes</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalArchivedNotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Archive Ratio</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.archiveNotesRatio}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Notes Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Active", value: analytics.totalActiveNotes },
                    { name: "Archived", value: analytics.totalArchivedNotes }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Notes Creation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.notesByMonth}>
                <XAxis dataKey="_id" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Notes Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Notes Creation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.notesByDate}>
              <XAxis dataKey="_id" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem'
                }}
              />
              <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Top Contributors</h2>
            <p className="text-sm text-gray-500 mt-1">Users with the most notes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics.userWithMostNotes?.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0  rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            <img src={user.profilePicture} alt={user.username} className="h-6 w-6 rounded-full" />
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.totalNotes} notes
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminNotesManagement;