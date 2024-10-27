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
import { Helmet } from 'react-helmet';
const MainDashboard = () => {
  return (
      <>
      <Helmet>
        <title>Dashboard - BucketWing</title>
      </Helmet>
        <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Header Section */}
          <div className="col-span-12 bg-white rounded-lg shadow-md p-2">
            <WelcomeMessage />
          </div>

          {/* Quick Stats */}
          <div className="col-span-12 lg:col-span-12 bg-white rounded-lg shadow-md p-3">
            <QuickStats />
          </div>
          <div className="col-span-12 lg:col-span-12 bg-white rounded-lg shadow-md p-3">
                <YourTasks />
              </div>

          {/* Notifications */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-lg shadow-md p-3">
            <YourGoals />
          </div>
          <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-3">
              <Calendar />
            </div>

       

            <div className= "col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-3">
                <Notifications />
              </div>
              <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-3">
              <Milestones />
            </div>
            <div className=" col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-3">
              <ReportsAnalytics />
            </div>


          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-3">
              <UpcomingDeadlines />
            </div>
           
            <div className="bg-white rounded-lg shadow-md p-3">
              <RecentMessages />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-3">
            <CommunityHighlight />
          </div>
          <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-3">
            <RecentActivity />
          </div>
          <div className="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md p-3">
            <ResourceHighlights />
          </div>

          {/* Motivational Quote */}
          <div className="col-span-12 bg-white rounded-lg shadow-md p-3">
            <MotivationalQuote />
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default MainDashboard;