import React from 'react';
import QuickStats from './AdminHomePage Components/QuickStats';
import Announcements from './AdminHomePage Components/AnnouncementsWidget';
import UserActivity from './AdminHomePage Components/UserActivitySummary';
import UserEngagement from './AdminHomePage Components/UserEngagementChart';
import { FiBell, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';

const AdminMainDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-purple-50 backdrop-blur-lg shadow-sm py-6 px-6 lg:px-8">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">
            <h2 className="hidden lg:block text-2xl font-bold text-gray-700">
              Welcome back, <span className="text-purple-600">{auth.user.fullName}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <FiBell className="text-xl text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <img src={auth.user.profilePicture} alt="profile" className="w-10 h-10 rounded-lg object-cover" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-md font-medium text-gray-700">{auth.user.fullName}</span>
                <span className="text-xs font-medium text-gray-500">@{auth.user.username}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mb-8">
        <QuickStats />
      </section>

      {/* Announcements Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Announcements</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <Announcements />
        </div>
      </section>

      {/* User Activity and Engagement Section */}
      <section className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* User Activity Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Activity Summary</h2>
          <UserActivity />
        </div>

        {/* User Engagement Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Engagement</h2>
          <UserEngagement />
        </div>
      </section>
    </div>
  );
};

export default AdminMainDashboard;
