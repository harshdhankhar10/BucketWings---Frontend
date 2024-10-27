import React from 'react'
import {Routes, Route} from 'react-router-dom'

import LoginPage from './Auth/LoginPage'
import RegisterPage from './Auth/RegisterPage'
import ResetPassword from './Auth/ResetPassword.jsx'
import Homepage from "./Homepage"
import MyProfile from './MyProfile'
import Spinner from '../components/Spinner'
import FAQSection from '../components/HomePage/Faq'
import Aboutus from '../pages/Homepage/Aboutus'


import AdminPrivateRoute from './AdminPrivateRoute'
import PrivateRoute from './PrivateRoute'

// AI Chat Pages
import AIChatHomePage from '../AI Chat/AIChatHomePage.jsx'
import AIChatSidebar from '../AI Chat/AIChatSidebar.jsx'
import AiChatMessaging from '../AI Chat/AiChatMessaging.jsx'


// Community Forum Pages
import CommunityDashboard from './Community Forum/CommunityDashboard'
import CommunityHome from './Community Forum/CommunityHome'
import MyPosts from './Community Forum/MyPosts'
import MyNetwork from './Community Forum/MyNetwork'
import Messages from './Community Forum/Messages'
import Bookmarks from './Community Forum/Bookmarks'
import Settings from './Community Forum/Settings'
import CreatePost from './Community Forum/CreatePost'
import ViewUserProfile from './Community Forum/ViewUserProfile'
import ViewPost from './Community Forum/ViewPost'
import PostByCategory from './Community Forum/PostByCategories'
import PostByTags from './Community Forum/PostByTags'

import Sitemap from "../../public/sitemap.xml"
import Robots from "../../public/robots.txt"
import ErrorPage from './ErrorPage404.jsx'

import GoalsHomepage from './Homepage/GoalsHomepage.jsx'
import StoriesHomepage from './Homepage/StoriesHomepage.jsx'
import AchievementHomepage from './Homepage/AchievementHomepage.jsx'
import TaskHomepage from './Homepage/TaskHomepage.jsx'

// Homepage Blogs related pages
import ViewHomeBlog from './Blog/ViewHomeBlog'
import Blogs from './Blog/Blogs'
import CategoryBasedBlogs from './Blog/CategoryBasedBlogs'
import TagBasedBlogs from './Blog/TagBasedBlogs'


// User Dashboard Pages
import UserHomepage from './Dashboards/User/UserHomepage'
import MainDashboard from './Dashboards/User/MainDashboard'

import UpdateProfile from './Dashboards/User/Profile Management/UpdateProfile'
import AccountSetting from "./Dashboards/User/Account Management/AccountSetting"
import NotificationSetting from './Dashboards/User/Account Management/NotificationSetting'
import Privacy from './Dashboards/User/Account Management/Privacy'

import HelpCenter from './Dashboards/User/Support Management/HelpCenter'
import ContactSupport from './Dashboards/User/Support Management/ContactSupport'
import ReportIssue from './Dashboards/User/Support Management/ReportIssue'

import GuidesAndTutorials from './Dashboards/User/Resources Management/GuidesAndTutorials'
import RecommendedTools from './Dashboards/User/Resources Management/RecommendedTools'

import ProgressOverview from './Dashboards/User/Progress Management/ProgressOverview'

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
import ViewTask from './Dashboards/User/Task Management/ViewTask'

import MessagesInbox from './Dashboards/User/Messages Management/MessagesInbox'
import SentMessages from './Dashboards/User/Messages Management/SentMessages'
import SendMessage from './Dashboards/User/Messages Management/SendMessage'
import ViewMessage from './Dashboards/User/Messages Management/ViewMessage'

import MyBlogDashboard from "./Dashboards/User/Blog Management/MyBlogDashboard"
import CreateBlog from "./Dashboards/User/Blog Management/CreateBlog"
import UpdateBlog from "./Dashboards/User/Blog Management/UpdateBlog"
import MyBlogs from "./Dashboards/User/Blog Management/MyBlogs"
import ViewBlog from './Dashboards/User/Blog Management/ViewBlog'

import CreateAchievement from './Dashboards/User/Achievement Management/CreateAchievement'
import AllAchievements from './Dashboards/User/Achievement Management/AllAchievements'
import AchievementDashboard from './Dashboards/User/Achievement Management/AchievementDashboard'
import UpdateAchievement from './Dashboards/User/Achievement Management/UpdateAchievement'
import ViewAchievement from './Dashboards/User/Achievement Management/ViewAchievement'






// Admin Dashboard Pages
import AdminHomepage from './Dashboards/Admin/AdminHomepage'



const RoutesPath = () => {
  return (
      <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/user/:username" element={<MyProfile />} />
        <Route path="/spinner" element={<Spinner />} />
        <Route path="/about" element={<Aboutus />} />

        <Route path="/sitemap.xml" element={<Sitemap />} />
        <Route path="/robots.txt" element={<Robots />} />

        <Route path="/goals" element={<GoalsHomepage />} />
        <Route path="/stories" element={<StoriesHomepage />} />
        <Route path="/achievements" element={<AchievementHomepage />} />
        <Route path="/tasks" element={<TaskHomepage />} />

        {/* Community Forum Routes */}
        <Route path="/community" element={<CommunityDashboard />} >
          <Route path="" element={<CommunityHome />} />
          <Route path="view-post/:slug" element={<ViewPost />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="my-network" element={<MyNetwork />} />
          <Route path="messages" element={<Messages />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="user/:username" element={<ViewUserProfile />} />
          <Route path="category/:category" element={<PostByCategory />} />
          <Route path="tag/:tag" element={<PostByTags />} />
          
        </Route>

        {/* Homepage Blogs Routes */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/category/:category" element={<CategoryBasedBlogs />} />
        <Route path="/blog/tag/:tag" element={<TagBasedBlogs />} />
        <Route path="/blog/:slug" element={<ViewHomeBlog />} />

        {/* AI Chat Routes */}
        <Route path="/ai-chat" element={<AIChatHomePage />} >
          <Route path="" element={<AIChatSidebar />} />
          <Route path="chat/:id" element={<AiChatMessaging />} />

        </Route>
       

      {/* Private Routes */}
      <Route path="/dashboard/" element={<PrivateRoute />}>
        <Route path="user" element={<UserHomepage />} >
          <Route path="" element={<MainDashboard />} />

          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="account-setting" element={<AccountSetting />} />
          <Route path="notification-setting" element={<NotificationSetting />} />
          <Route path="privacy" element={<Privacy />} />

          <Route path="help-center" element={<HelpCenter />} />
          <Route path="contact-support" element={<ContactSupport />} />
          <Route path="report-issue" element={<ReportIssue />} />

          <Route path="guides-tutorials" element={<GuidesAndTutorials />} />
          <Route path="recommended-tools" element={<RecommendedTools />} />
          <Route path="faq" element={<FAQSection/>} />

          <Route path="progress-overview" element={<ProgressOverview />} />

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
          <Route path="view-task/:id" element={<ViewTask />} />

          <Route path="messages/inbox" element={<MessagesInbox />} />
          <Route path="messages/sent" element={<SentMessages />} />
          <Route path="messages/send" element={<SendMessage />} />
          <Route path="messages/view/:id" element={<ViewMessage />} />

          <Route path="blog/dashabord" element={<MyBlogDashboard />} />
          <Route path="blog/create-blog" element={<CreateBlog />} />
          <Route path="blog/update-blog/:id" element={<UpdateBlog />} />
          <Route path="blog/my-blogs" element={<MyBlogs />} />
          <Route path="blog/view-blog/:slug" element={<ViewBlog />} />

          <Route path="achievement/create" element={<CreateAchievement />} />
          <Route path="achievement/all" element={<AllAchievements />} />
          <Route path="achievement/dashboard" element={<AchievementDashboard />} />
          <Route path="achievement/update/:id" element={<UpdateAchievement />} />
          <Route path="achievement/view/:id" element={<ViewAchievement />} />
          
        </Route>
       
      </Route>
     

      {/* Admin Private Routes */}\
      <Route path="/dashboard/admin" element={<AdminPrivateRoute />}>
        <Route path="" element={<AdminHomepage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />

      </Routes>

      </>
  )
}

export default RoutesPath