import React from 'react'
import {Routes, Route} from 'react-router-dom'

import LoginPage from './Auth/LoginPage'
import RegisterPage from './Auth/RegisterPage'
import Homepage from "./Homepage"
import MyProfile from './MyProfile'
import Spinner from '../components/Spinner'

import AdminPrivateRoute from './AdminPrivateRoute'
import PrivateRoute from './PrivateRoute'


// User Dashboard Pages
import UserHomepage from './Dashboards/User/UserHomepage'
import MainDashboard from './Dashboards/User/MainDashboard'
import UpdateProfile from './Dashboards/User/Profile Management/UpdateProfile'

import CreateGoal from './Dashboards/User/Goal Management/CreateGoal'
import MyGoals from './Dashboards/User/Goal Management/MyGoals'
import ViewGoal from './Dashboards/User/Goal Management/ViewGoal'
import EditGoal from './Dashboards/User/Goal Management/EditGoal'

import CreateStory from './Dashboards/User/Story Management/CreateStory'
import ViewStory from './Dashboards/User/Story Management/ViewStory'
import EditStory from './Dashboards/User/Story Management/EditStory'
import MyStories from './Dashboards/User/Story Management/MyStories'

import FilterTasks from './Dashboards/User/Task Management/FilterTasks'
import CreateTask from './Dashboards/User/Task Management/CreateTask'
import MyTasks from './Dashboards/User/Task Management/MyTasks'
import UpdateTask from './Dashboards/User/Task Management/UpdateTask'
import TaskDashboard from './Dashboards/User/Task Management/TaskDashboard'


// Admin Dashboard Pages
import AdminHomepage from './Dashboards/Admin/AdminHomepage'

const RoutesPath = () => {
  return (
      <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/:username" element={<MyProfile />} />
        <Route path="/spinner" element={<Spinner />} />


      {/* Private Routes */}
      <Route path="/dashboard/" element={<PrivateRoute />}>
        <Route path="user" element={<UserHomepage />} >
          <Route path="" element={<MainDashboard />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="create-goal" element={<CreateGoal />} />
          <Route path="myGoals" element={<MyGoals />} />
          <Route path="view-goal/:id" element={<ViewGoal />} />
          <Route path="edit-goal/:id" element={<EditGoal />} />

          <Route path="create-story" element={<CreateStory />} />
          <Route path="myStories" element={<MyStories />} />
          <Route path="view-story/:id" element={<ViewStory />} />
          <Route path="edit-story/:id" element={<EditStory />} />

          <Route path="create-task" element={<CreateTask />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="update-task/:id" element={<UpdateTask />} />
          <Route path="filter-tasks" element={<FilterTasks />} />
          <Route path="task-dashboard" element={<TaskDashboard />} />
         

          
          

        </Route>
       
      </Route>

      {/* Admin Private Routes */}\
      <Route path="/dashboard/admin" element={<AdminPrivateRoute />}>
        <Route path="" element={<AdminHomepage />} />
      </Route>

      </Routes>

      </>
  )
}

export default RoutesPath