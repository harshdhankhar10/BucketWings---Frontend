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
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
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
            <Link to={`/dashboard/${auth.role}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
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
    { icon: <Home size={20} />, text: 'Home', path: '/' },
    { icon: <Target size={20} />, text: 'My Goals', path: '/goals' },
    { icon: <PlusCircle size={20} />, text: 'Create Goal', path: '/create-goal' },
    { icon: <Milestone size={20} />, text: 'Milestones', path: '/milestones' },
    { icon: <MdOutlineMarkUnreadChatAlt size={20} />, text: 'Community Forum', path: '/community' },
    { icon: <Bell size={20} />, text: 'Notifications', path: '/notifications' },
    { icon: <Settings size={20} />, text: 'Settings', path: '/settings' },
    { icon: <Info size={20} />, text: 'About Us', path: '/about' },
    { icon: <HelpCircle size={20} />, text: 'Help/Support', path: '/help' },
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
            {navItems.slice(0, 5).map((item, index) => (
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
            <motion.div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-64 lg:w-80 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </motion.div>
            
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
