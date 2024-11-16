import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiUsers, FiEdit, FiBarChart, FiMail, FiSettings, 
  FiClipboard, FiBook, FiMessageSquare, FiUser, FiTool, 
  FiMenu, FiBell, FiSearch, FiChevronDown, FiX 
} from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import '../styles.css';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useAuth();
  const auth = currentUser.user;

  const menuItems = [
   
    {
      label: 'Overview',
      icon: FiBarChart,
      subMenus: [
        { label: 'View Overview', link: '/overview' }
      ]
    },
    {
      label: 'User Management',
      icon: FiUsers,
      subMenus: [
        { label: 'View Users', link: '/dashboard/admin/user/user-management' },
        // { label: 'Activity Logs', link: '/dashboard/admin/user/activity-logs' },
        // { label: 'Feedback Reports', link: '/dashboard/admin/user/feedback-reports' }
      ]
    },
    {
      label: 'Content Management',
      icon: FiEdit,
      subMenus: [
        { label: 'Notes', link: '/notes' },
        { label: 'Goals', link: '/goals' },
        { label: 'Stories', link: '/stories' },
        { label: 'Tasks', link: '/tasks' },
        { label: 'Blogs', link: '/blogs' },
        { label: 'Achievements', link: '/achievements' }
      ]
    },
    {
      label: 'Analytics & Reports',
      icon: FiBarChart,
      subMenus: [
        { label: 'User Engagement', link: '/user-engagement' },
        { label: 'Feature Usage', link: '/feature-usage' },
        { label: 'Content Trends', link: '/content-trends' },
        { label: 'Growth Reports', link: '/growth-reports' }
      ]
    },
    {
      label: 'Messages & Communication',
      icon: FiMail,
      subMenus: [
        { label: 'Inbox', link: '/inbox' },
        { label: 'Announcements', link: '/announcements' },
        { label: 'Automated Messages', link: '/automated-messages' }
      ]
    },
    {
      label: 'Support & Feedback',
      icon: FiMessageSquare,
      subMenus: [
        { label: 'Support Tickets', link: '/support-tickets' },
        { label: 'User Feedback', link: '/user-feedback' },
        { label: 'Issue Tracker', link: '/issue-tracker' }
      ]
    },
    {
      label: 'Resource Management',
      icon: FiBook,
      subMenus: [
        { label: 'Guides & Tutorials', link: '/guides' },
        { label: 'Recommended Tools', link: '/recommended-tools' },
        { label: 'FAQs', link: '/faqs' }
      ]
    },
    {
      label: 'Settings',
      icon: FiSettings,
      subMenus: [
        { label: 'Platform Settings', link: '/platform-settings' },
        { label: 'Notification Settings', link: '/notification-settings' },
        { label: 'Privacy & Security', link: '/privacy-security' }
      ]
    },
    {
      label: 'Admin Account Management',
      icon: FiUser,
      subMenus: [
        { label: 'Roles & Permissions', link: '/roles-permissions' },
        { label: 'Admin Profiles', link: '/admin-profiles' },
        { label: 'Activity Logs', link: '/admin-activity-logs' }
      ]
    },
    {
      label: 'System Logs & Maintenance',
      icon: FiTool,
      subMenus: [
        { label: 'Activity Logs', link: '/system-logs' },
        { label: 'Error Tracker', link: '/error-tracker' },
        { label: 'Maintenance Mode', link: '/maintenance-mode' }
      ]
    }
  ];


  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const filteredMenuItems = () => {
    if (!searchTerm) return menuItems;
    return menuItems.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subMenus?.some(sub => sub.label.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="max-h-screen  via-purple-50 to-pink-50 flex">
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : (window.innerWidth < 1024 ? -300 : 0)
        }}
        className="fixed lg:relative top-0 left-0 max-h-screen w-[300px] bg-white/90 backdrop-blur-lg shadow-lg z-50"
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BucketWings
            </h1>
            <span className="ml-auto lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
              <FiX size={24} className="hover:text-gray-600 cursor-pointer" />
            </span>
          </div>

          <div className="px-4 mb-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all placeholder-gray-400 text-gray-600"
              />
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-3 overflow-y-auto scrollbar-hide">
            <Link
              to="/dashboard/admin"
              className={`w-full bg-purple-100 flex items-center p-3 rounded-xl transition-all duration-200
                ${location.pathname === '/dashboard/admin'
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700'
                  : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <FiHome className={`text-xl ${location.pathname === `/dashboard/admin` ? 'text-indigo-600' : 'text-gray-500'}`} />
              <span className="ml-6 text-left flex-1 font-medium">Dashboard</span>
            </Link>

            {filteredMenuItems().map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center p-3 rounded-xl transition-all duration-200
                    ${location.pathname === item.link
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700'
                      : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  <item.icon className={`text-xl ${location.pathname === item.link
                    ? 'text-indigo-600'
                    : 'text-gray-500'}`} />
                  <span className="ml-6 text-left flex-1 font-medium">{item.label}</span>
                  {item.subMenus && (
                    <FiChevronDown
                      className={`transition-transform duration-200 ${
                        activeMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {item.subMenus && activeMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-8 mt-2 space-y-1"
                    >
                      {item.subMenus.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className={`block px-4 py-2 ml-2 rounded-lg text-sm transition-colors
                            ${location.pathname === subItem.link
                              ? 'bg-indigo-500/10 text-indigo-700'
                              : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <button className="w-full bg-purple-100 p-3 flex items-center rounded-xl transition-all duration-200 gap-6">
              <FiLogOut className="text-xl text-red-600" />
              <span className="text-left font-medium">Logout</span>
            </button>
            <br/>
          </nav>
          
        </div>
       
      </motion.div>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-purple-50 backdrop-blur-lg shadow-sm py-6 px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <FiX className="text-xl text-gray-600" />
                ) : (
                  <FiMenu className="text-xl text-gray-600" />
                )}
              </button>
              <h2 className="hidden lg:block text-2xl font-bold text-gray-700">
                Welcome back, <span className="text-purple-600">{auth.fullName}</span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <FiBell className="text-xl text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <img src={auth.profilePicture} alt="profile" className="w-10 h-10 rounded-lg" />
                </div>
                <div className="flex flex-col items-start">
                  <span className=" text-md font-medium text-gray-700">{auth.fullName}</span>
                  <span className="text-xs font-medium text-gray-500">@{auth.username}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 inset-y-0 right-0 overflow-y-auto p-4  max-h-screen scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;