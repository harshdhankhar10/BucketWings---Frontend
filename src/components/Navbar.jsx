import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Target, 
  PlusCircle, 
  Milestone, 
  List, 
  Bell, 
  User, 
  Settings, 
  Info, 
  HelpCircle, 
  LogIn, 
  Search, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { GiAchievement } from "react-icons/gi";
import { GrAchievement } from "react-icons/gr";

import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { MdAutoStories } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaBlog } from 'react-icons/fa';



import { toast } from 'react-toastify';
import { NavLink, Link } from 'react-router-dom';

const NavItem = ({ icon, text, path, isActive, onClick, isMobile = false }) => (
  <motion.li 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
      isActive 
        ? 'text-purple-600 font-semibold' 
        : 'text-gray-600 hover:text-purple-600'
    } ${isMobile ? 'py-3 px-4' : ''}`}
    onClick={onClick}
  >
    <NavLink to={path} className="flex items-center">
      <span className="relative">
        {icon}
        {isActive && !isMobile && (
          <motion.span
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </span>
      <span className={isMobile ? 'inline ml-2' : 'hidden md:inline ml-2'}>{text}</span>
    </NavLink>
  </motion.li>
);

const ProfileDropdown = ({ auth, setAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
    toast.success('You have been logged out successfully!');
  };

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 p-2 rounded-md text-purple-600 hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
      >
        <User size={20} />
        <Link to={`/user/${auth.username}`} className="hidden md:inline">{auth.fullName}</Link>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <Link to={`/user/${auth.username}`}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
              Your Profile
            </Link>
            <Link to={`dashboard/${auth.role}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState('Home');
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { 
      icon: <Home size={24} className="text-indigo-600" />, 
      text: 'Home', 
      path: '/', 
      className: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-100 transition-colors duration-300'
    },
    { 
      icon: auth ? <Target size={24} className="text-teal-600" /> : <PlusCircle size={24} className="text-cyan-600" />, 
      text: auth ? 'My Goals' : 'Create Goal', 
      path: auth ? `/dashboard/${auth.role}/myGoals` : '/goals',
      className: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-teal-100 transition-colors duration-300'
    },  
    { 
      icon: auth ? <MdAutoStories size={24} className="text-orange-600" /> : <MdAutoStories size={24} className="text-yellow-600" />, 
      text: auth ? 'My Stories' : 'Create Story', 
      path: auth ? `/dashboard/${auth.role}/myStories` : '/stories',
      className: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-100 transition-colors duration-300'
    },  
    {
      icon: auth ? <MdOutlineAddTask size={24} className="text-emerald-600" /> : <MdOutlineAddTask size={24} className="text-lime-600" />,
      text: auth ? 'My Tasks' : 'Create Task',
      path: auth ? `/dashboard/${auth.role}/task-dashboard` : '/tasks',
      className: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-100 transition-colors duration-300'
    },{
      icon: auth ? <GiAchievement size={24} className="text-blue-600" /> : <GrAchievement size={24} className="text-blue-600" />,
      text: auth ? 'My Achievements' : 'Achievements',
      path: auth ? `/dashboard/${auth.role}/achievement/all` : '/achievements',
      className: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 transition-colors duration-300'
    },
    {
      icon: <FaBlog size={24} className="text-blue-600" />,
      text: 'Blogs',
      path: '/blogs',
      className: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-100 transition-colors duration-300'

    },
    { 
      icon: <MdOutlineMarkUnreadChatAlt size={24} className="text-rose-600" />, 
      text: 'Community Forum', 
      path: '/community', 
      className: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-rose-100 transition-colors duration-300'
    },
      auth ? { 
      icon: <User size={24} className="text-purple-600" />, 
      text: (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 text-purple-600 hover:text-white bg-white hover:bg-purple-600 py-2 px-4 rounded-lg transition-all duration-300 shadow-md"
        >
          <span>Go To Dashboard</span>
        </motion.button>
      ), 
      path: `/user/${auth.username}` 
    } : { 
      icon: <User size={24} className="text-red-600" />, 
      text: 'Login', 
      path: '/login',
      className: 'flex items-center space-x-3 p-3 rounded-lg hover:bg-red-100 transition-colors duration-300'
    }
  ];
  
  return (
    <nav className="bg-white backdrop-blur-md bg-opacity-70 shadow-lg z-50">
      <div className=" mx-auto px-4 sm:px-6 ">
        <div className="flex items-center justify-between h-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 text-purple-600 font-bold text-3xl"
          >
            <Link to="/">BucketWings</Link>
          </motion.div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.slice(0, 7).map((item, index) => (
              <NavItem 
                key={index} 
                icon={item.icon} 
                text={item.text} 
                path={item.path}
                isActive={activeItem === item.text}
                onClick={() => setActiveItem(item.text)}
              />
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
          
            
            {auth ? (
              <ProfileDropdown auth={auth} setAuth={setAuth} />
            ) : (
              <NavLink to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 p-2 rounded-md text-purple-600 hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
              >
                <LogIn size={20} />
                <span className="hidden md:inline">Login</span>
              </motion.button>
              </NavLink>
            )}
          </div>
          
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg rounded-b-2xl"
          >
            <ul className="flex flex-col space-y-1 py-4">
              {navItems.map((item, index) => (
                <NavItem 
                  key={index} 
                  icon={item.icon} 
                  text={item.text} 
                  path={item.path}
                  isMobile={true}
                  isActive={activeItem === item.text}
                  onClick={() => { 
                    setIsOpen(false);
                    setActiveItem(item.text);
                  }}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
