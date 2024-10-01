import React, { useState, useRef, useEffect } from "react";
import {
  FiChevronDown,
  FiChevronsLeft,
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
} from "react-icons/fi";
import { TbBrandStorytel } from "react-icons/tb";
import { VscMilestone } from "react-icons/vsc";


import { motion, AnimatePresence } from "framer-motion";
import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { title: "Dashboard", icon: FiHome, link: "#" },
    {
      title: "Goals",
      icon: FiTarget,
      submenus: [
        { title: "View All Goals", link: "/dashboard/user/myGoals" },
        { title: "Create New Goal", link: "/dashboard/user/create-goal" },
        // { title: "Completed Goals", link: "#" },
      ],
    },
    {
      title : "Stories",
      icon : TbBrandStorytel,
      submenus : [
        {title : "View All Stories", link : "/dashboard/user/myStories"},
        {title : "Create New Story", link : "/dashboard/user/create-story"},
        ]
    },
    {
      title: "Tasks",
      icon: FiCheckSquare,
      submenus: [
        { title: "View All Tasks", link: "#" },
        { title: "Create New Task", link: "#" },
        { title: "Pending Tasks", link: "#" },
        { title: "Completed Tasks", link: "#" },
      ],
    },
    {
      title: "Milestones",
      icon: VscMilestone,
      submenus: [
        { title: "View All Milestones", link: "#" },
        { title: "Create New Milestone", link: "#" },
        { title: "Pending Milestones", link: "#" },
        { title: "Completed Milestones", link: "#" },
      ],
    },
    {
      title: "Progress",
      icon: FiTrendingUp,
      submenus: [
        { title: "Progress Overview", link: "#" },
        { title: "Milestones", link: "#" },
        { title: "Analytics & Reports", link: "#" },
      ],
    },
    {
      title: "Messages",
      icon: FiMessageSquare,
      submenus: [
        { title: "Inbox", link: "#" },
        { title: "Sent", link: "#" },
        { title: "Notifications", link: "#" },
      ],
    },
    {
      title: "Settings",
      icon: FiSettings,
      submenus: [
        { title: "Profile Settings", link: "#" },
        { title: "Account Security", link: "#" },
        { title: "Notification Settings", link: "#" },
        { title: "Privacy", link: "#" },
      ],
    },
    {
      title: "Community",
      icon: FiUsers,
      submenus: [
        { title: "Forums", link: "#" },
        { title: "Chat with Mentors", link: "#" },
        { title: "Leaderboard", link: "#" },
      ],
    },
    {
      title: "Resources",
      icon: FiBook,
      submenus: [
        { title: "Guides & Tutorials", link: "#" },
        { title: "Recommended Tools", link: "#" },
        { title: "FAQ", link: "#" },
      ],
    },
    {
      title: "Support",
      icon: FiHelpCircle,
      submenus: [
        { title: "Help Center", link: "#" },
        { title: "Contact Support", link: "#" },
        { title: "Report an Issue", link: "#" },
      ],
    },
    { title: "Sign Out", icon: FiLogOut, link: "#" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.nav
        ref={sidebarRef}
        initial={false}
        animate={{ width: open ? "280px" : "80px" }}
        className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-40"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-white"
              >
                <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
                <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
              </svg>
            </div>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 overflow-hidden"
                >
                  <span className="block text-lg font-bold text-indigo-600 whitespace-nowrap">
                    GoalTracker
                  </span>
                  <span className="block text-xs text-gray-500 whitespace-nowrap">
                    Pro Account
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="p-4 space-y-1">
              {menuItems.map((item) => (
                <MenuOption
                  key={item.title}
                  item={item}
                  selected={selected}
                  setSelected={setSelected}
                  open={open}
                  expandedMenu={expandedMenu}
                  setExpandedMenu={setExpandedMenu}
                />
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center w-full p-2 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiChevronsLeft
                className={`text-xl transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="ml-2 text-sm font-medium whitespace-nowrap"
                  >
                    Collapse Sidebar
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className={`flex-grow transition-all duration-300 ${open ? "ml-64" : "ml-20"}`}>
        {/* Content */}
        <div className={`p-4 transition-all duration-300 ${open ? "pl-10" : "pl-4"}`}>
        <Outlet />
        </div>
      </div>
    </div>
  );
};

const MenuOption = ({
  item,
  selected,
  setSelected,
  open,
  expandedMenu,
  setExpandedMenu,
}) => {
  const { title, icon: Icon, submenus } = item;
  const isExpanded = expandedMenu === title;

  const handleClick = () => {
    if (submenus) {
      setExpandedMenu(isExpanded ? null : title);
    } else {
      setSelected(title);
    }
  };

  return (
    <div className="relative">
      <motion.div
        onClick={handleClick}
        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
          selected === title
            ? "bg-indigo-100 text-indigo-800"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center justify-center w-8 h-8">
          <Icon className="text-xl" />
        </div>
        <AnimatePresence>
          {open && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="ml-2 text-sm font-medium"
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
        {submenus && (
          <FiChevronDown
            className={`ml-auto transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </motion.div>
      {submenus && isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pl-8 overflow-hidden"
        >
          {submenus.map((submenu) => (
            <div
              key={submenu.title}
              className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 text-gray-600 hover:bg-gray-100`}
              onClick={() => setSelected(submenu.title)}
            >
              <AnimatePresence>
                {open && (
                  <Link to={submenu.link}>
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="ml-2 text-sm"
                  >
                    {submenu.title}
                  </motion.span>
                  </Link>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DashboardLayout;
