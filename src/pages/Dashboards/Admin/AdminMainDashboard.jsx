import React from 'react'
import { Link } from 'react-router-dom'
import QuickStats from './AdminHomePage Components/QuickStats'
import Announcements from './AdminHomePage Components/AnnouncementsWidget'
import UserActivity from './AdminHomePage Components/UserActivitySummary'
import UserEngagement from './AdminHomePage Components/UserEngagementChart'
const AdminMainDashboard = () => {
  return (
   <>
    <div className="">
      <div className="row">
        <QuickStats />
      </div>
      {/* <div className="row">
        <Announcements />
      </div> */}
      <div className="row">
        <UserActivity />
      </div>
      {/* <div className="row">
        <UserEngagement />
      </div> */}
    </div>

   </>
  )
}

export default AdminMainDashboard