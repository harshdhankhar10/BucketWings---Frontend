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
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const NavItem = ({ icon, text, isActive, onClick, isMobile = false }) => (
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
    <span className={isMobile ? 'inline' : 'hidden md:inline'}>{text}</span>
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
        <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
          Your Profile
        </a>
        <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
          Settings
        </a>
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
    { icon: <Home size={20} />, text: 'Home' },
    { icon: <Target size={20} />, text: 'My Goals' },
    { icon: <PlusCircle size={20} />, text: 'Create Goal' },
    { icon: <Milestone size={20} />, text: 'Milestones' },
    { icon: <List size={20} />, text: 'Bucket List' },
    { icon: <Bell size={20} />, text: 'Notifications' },
    { icon: <Settings size={20} />, text: 'Settings' },
    { icon: <Info size={20} />, text: 'About Us' },
    { icon: <HelpCircle size={20} />, text: 'Help/Support' },
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
              <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 p-2 rounded-md text-purple-600 hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200"
              >
                <LogIn size={20} />
                <span className="hidden md:inline">Login</span>
              </motion.button>
              </Link>
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
            className="md:hidden bg-white shadow-lg rounded-b-2xl overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="py-2 px-2">
              {navItems.map((item, index) => (
                <NavItem 
                  key={index} 
                  icon={item.icon} 
                  text={item.text} 
                  isActive={activeItem === item.text}
                  onClick={() => {
                    setActiveItem(item.text);
                    setIsOpen(false);
                  }}
                  isMobile={true}
                />
              ))}
            </div>
            {auth ? (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
               <Link to={`/dashboard/${auth.role}`} className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md">
               <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${auth.fullName}&background=random`} alt={auth.fullName} />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{auth.fullName}</div>
                    <div className="text-sm font-medium text-gray-500">{auth.email}</div>
                  </div>
                </div>
               </Link>
                <div className="mt-3 space-y-1">
                  <a href="#profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md">Your Profile</a>
                  <a href="#settings" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md">Settings</a>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('auth');
                      setAuth(null);
                      setIsOpen(false);
                      toast.success('You have been logged out successfully!');
                    }} 
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <Link to="/login">
                <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  <LogIn size={20} className="mr-2" />
                  Login
                </button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;