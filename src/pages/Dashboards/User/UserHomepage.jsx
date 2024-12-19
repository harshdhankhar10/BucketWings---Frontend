import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiHome,
  FiTarget,
  FiCheckSquare,
  FiTrendingUp,
  FiMessageSquare,
  FiSettings,
  FiUsers,
  FiBook,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
  FiSearch,
  FiBell
} from "react-icons/fi";
import { BsTicketPerforated } from "react-icons/bs";

import { AiOutlineFileText } from "react-icons/ai";
import { GiAchievement } from "react-icons/gi";
import { TbBrandStorytel } from "react-icons/tb";
import { VscMilestone } from "react-icons/vsc";
import { GrBlog } from "react-icons/gr";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const [messageLength, setMessageLength] = useState(0);
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth"))?.user);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMessagesLength = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/inbox`
        );
        if (response.data.success) {
          setMessageLength(response.data.messages.length);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessagesLength();
  }, []);

  const toggleHeaderSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const menuItems = [
    {
      title : "Quick Notes",
      icon : AiOutlineFileText,
      submenus : [
        { title : "View All Notes", link : "/dashboard/user/quick-notes/all" },
        { title : "Create New Note", link : "/dashboard/user/quick-notes/create" },
        { title : "Archived Notes", link : "/dashboard/user/quick-notes/archived" }
      ]
    },
    {
      title: "Goals",
      icon: FiTarget,
      submenus: [
        { title: "View All Goals", link: "/dashboard/user/myGoals" },
        { title: "Create New Goal", link: "/dashboard/user/create-goal" },
      ],
    },
    {
      title: "Stories",
      icon: TbBrandStorytel,
      submenus: [
        { title: "View All Stories", link: "/dashboard/user/myStories" },
        { title: "Create New Story", link: "/dashboard/user/create-story" },
      ],
    },
    {
      title: "Tasks",
      icon: FiCheckSquare,
      submenus: [
        { title: "View Dashboard", link: "/dashboard/user/task-dashboard" },
        { title: "View All Tasks", link: "/dashboard/user/my-tasks" },
        { title: "Create New Task", link: "/dashboard/user/create-task" },
        { title: "Filter Tasks", link: "/dashboard/user/filter-tasks" },
      ],
    },{
      title: "Achievements",
      icon: GiAchievement,
      submenus: [
        { title : "Achievement Dashboard", link: "/dashboard/user/achievement/dashboard" },
        { title: "Create New Achievement", link: "/dashboard/user/achievement/create" },
        { title: "View All Achievements", link: "/dashboard/user/achievement/all" },
      ],
    },
    {
      title: "Blog",
      icon: GrBlog,
      submenus: [
        { title: "My Dashabord", link: "/dashboard/user/blog/dashabord" },
        { title: "Create New Blog", link: "/dashboard/user/blog/create-blog" },
        { title: "My Blogs", link: "/dashboard/user/blog/my-blogs" },
      ],
    },
    {
      title: `Messages (${messageLength})`,
      icon: FiMessageSquare,
      submenus: [
        { title: "Inbox", link: "/dashboard/user/messages/inbox" },
        { title: "Sent", link: "/dashboard/user/messages/sent" },
      ],
    },
    {
      title : "Support Tickets",
      icon : BsTicketPerforated,
      submenus : [
        { title : "View All Tickets", link : "/dashboard/user/support-ticket" },
        { title : "Create New Ticket", link : "/dashboard/user/support-ticket/create" }
      ]
    },
    {
      title: "Settings",
      icon: FiSettings,
      submenus: [
        { title: "Profile Settings", link: "/dashboard/user/update-profile" },
        { title: "Account Security", link: "/dashboard/user/account-setting" },
        { title: "Notification Settings", link: "/dashboard/user/notification-setting" },
        { title: "Privacy", link: "/dashboard/user/privacy" },
      ],
    },
    // {
    //   title: "Community",
    //   icon: FiUsers,
    //   submenus: [
    //     { title: "Forums", link: "/dashboard/user/forums" },
    //     { title: "Chat with Mentors", link: "/dashboard/user/chat-mentors" },
    //     { title: "Leaderboard", link: "/dashboard/user/leaderboard" },
    //   ],
    // },
    {
      title: "Resources",
      icon: FiBook,
      submenus: [
        { title: "Guides & Tutorials", link: "/dashboard/user/guides-tutorials" },
        { title: "Recommended Tools", link: "/dashboard/user/recommended-tools" },
        { title: "FAQ", link: "/dashboard/user/faq" },
      ],
    },
    {
      title: "Support",
      icon: FiHelpCircle,
      submenus: [
        { title: "Help Center", link: "/dashboard/user/help-center" },
        { title: "Contact Support", link: "/dashboard/user/contact-support" },
        { title: "Report an Issue", link: "/dashboard/user/report-issue" },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      Swal .fire({
        title : "Enter Username to Confirm",
        input : "text",
        showCancelButton : true,
        confirmButtonText : "Logout",
        cancelButtonText : "Cancel",
        confirmButtonColor : "#f87171",
        cancelButtonColor : "#60a5fa",
        inputValidator : (value) => {
          if (!value) {
            return "Username is Required";
          }
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          if(result.value === JSON.parse(localStorage.getItem("auth")).user.username){ {
            localStorage.removeItem("auth");
            window.location.href = "/login";
          }}
          else{
            Swal.fire({
              icon : "error",
              title : "Invalid Username",
              text : "Please Enter Correct Username to Logout",
              confirmButtonColor : "#f87171",
            });
          }
        }
      });

    } catch (error) {
      console.error("Error logging out:", error);
    }
  }




  return (
    <div className="flex h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center justify-between px-4">
      {/* Left Section: Logo and Mobile Menu Button */}
      <div className="flex items-center">
        {isMobile && (
          <button
            onClick={toggleHeaderSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 mr-4"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        )}
        <div className="flex items-center pl-3">
          <img
            src="https://i.postimg.cc/1zRqmjj9/webLogo.png"
            alt="BucketWings Logo"
            className="h-12 w-12 rounded-xl"
          />
          <span className="ml-2 text-2xl font-bold text-purple-600 hidden sm:inline">
            BucketWings
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="md:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-56 lg:w-72 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>


        <button className="relative text-gray-600 hover:text-purple-600">
          <FiBell className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-600 rounded-full"></span>
        </button>

        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <img
              src={user.profilePicture}
              alt="Profile Avatar"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full"
            />
            <span className="hidden md:inline text-gray-600 font-medium">
              {user.fullName}
            </span>
          </button>
        </div>
      </div>
    </header>


<AnimatePresence>
  {sidebarOpen && (
    <motion.nav
      initial={isMobile ? { x: "-100%" } : { x: 0 }}
      animate={{ x: 0 }}
      exit={isMobile ? { x: "-100%" } : { x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 shadow-xl z-40 overflow-y-auto ${
        isMobile ? "block" : "hidden md:block"
      }`}
    >
      <div className="p-4 space-y-4">
        <Link
          to="/dashboard/user"
          className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          <FiHome className="w-5 h-5" />
          <span className="ml-3 text-sm font-semibold">Dashboard Home</span>
        </Link>

        {/* Menu Items */}
        {menuItems.map((item) => (
          <MenuOption
            key={item.title}
            item={item}
            expandedMenu={expandedMenu}
            setExpandedMenu={setExpandedMenu}
            currentPath={location.pathname}
            closeSidebar={() => isMobile && setSidebarOpen(false)}
          />
        ))}

        {/* Sign Out Button */}
        <button onClick ={handleLogout}
          className="flex items-center p-3 rounded-lg w-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 shadow-sm transform transition-all duration-300 hover:scale-105"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="ml-3 text-sm font-semibold">Sign Out</span>
        </button>
      </div>
    </motion.nav>
  )}
</AnimatePresence>


      {/* Main Content */}
      <div className={`flex-grow pt-16 transition-all duration-300 ${sidebarOpen && !isMobile ? "ml-64" : ""}`}>
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const MenuOption = ({ item, expandedMenu, setExpandedMenu, currentPath, closeSidebar }) => {
  const { title, icon: Icon, submenus, link } = item;
  const isExpanded = expandedMenu === title;
  const isActive = currentPath === link || (submenus && submenus.some(submenu => submenu.link === currentPath));

  const handleClick = () => {
    if (submenus) {
      setExpandedMenu(isExpanded ? null : title);
    } else {
      closeSidebar();
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
          isActive
            ? "bg-indigo-100 text-indigo-800"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center justify-center w-8 h-8">
          <Icon className="text-xl" />
        </div>
        <span className="ml-2 text-sm font-medium">{title}</span>
        {submenus && (
          <FiChevronDown
            className={`ml-auto transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      {submenus && isExpanded && (
        <div className="pl-8 mt-1 space-y-1">
          {submenus.map((submenu) => (
            <Link
              key={submenu.title}
              to={submenu.link}
              className={`block p-2 text-sm rounded-lg ${
                currentPath === submenu.link
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              {submenu.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;