import React from 'react';
import WelcomeMessage from "./Homepage Components/WelcomeMessage";
import Calendar from "./Homepage Components/Calendar";
import CommunityHighlight from "./Homepage Components/CommunityHighlights";
import YourGoals from "./Homepage Components/YourGoals";
import YourTasks from "./Homepage Components/YourTasks";
import Milestones from "./Homepage Components/Milestones";
import ReportsAnalytics from "./Homepage Components/ReportsAnalytics";
import Notifications from "./Homepage Components/Notifications";
import RecentMessages from "./Homepage Components/RecentMessages";
import QuickStats from "./Homepage Components/QuickStats";
import MotivationalQuote from "./Homepage Components/MotivationalQuote";
import RecentActivity from "./Homepage Components/RecentActivity";
import ResourceHighlights from "./Homepage Components/ResourceHighlights";
import UpcomingDeadlines from "./Homepage Components/UpcomingDeadlines";

const MainDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Header Section */}
          <div className="col-span-12 bg-white rounded-lg shadow-md p-6">
            <WelcomeMessage />
          </div>

          {/* Quick Stats */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-lg shadow-md p-6">
            <QuickStats />
          </div>

          {/* Notifications */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-6">
            <Notifications />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Your Tasks and Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <YourTasks />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <YourGoals />
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <Milestones />
            </div>

            {/* Reports and Analytics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <ReportsAnalytics />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <UpcomingDeadlines />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Calendar />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <RecentMessages />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-6">
            <CommunityHighlight />
          </div>
          <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-6">
            <RecentActivity />
          </div>
          <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-6">
            <ResourceHighlights />
          </div>

          {/* Motivational Quote */}
          <div className="col-span-12 bg-white rounded-lg shadow-md p-6">
            <MotivationalQuote />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;