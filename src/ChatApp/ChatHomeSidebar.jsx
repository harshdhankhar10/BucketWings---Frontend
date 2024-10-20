import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import './chatStyle.css';
import useUserConversation from "../zustand/userConversation"; // Zustand store

const ChatHomeSidebar = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth"))?.user);

  // Zustand states
  const { selectedConversation, setSelectedConversation, message } = useUserConversation();

  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/chat/user/currentChatters`);
        if (response.data.success) {
          setChatUsers(response.data.users);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    chatUserHandler();
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length === 0) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/chat/user/search?username=${value}`);
      if (response.data.success && response.data.user) {
        setUsers([response.data.user]);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.4,
        damping: 20,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.closest('.profile-menu') === null) {
      setIsOpen(false);
    }
  };

  const selectedUserHandler = (user) => {
    setSelectedConversation(user); // Update Zustand state
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen w-80 bg-gradient-to-b from-white to-purple-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="pt-5 pl-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-5 relative">
         <Link to="/live-chat">
         <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            BucketTalk
          </h1>
         </Link>
          <div className="profile-menu relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <img
                src={auth.profilePicture}
                alt="Profile"
                className="relative h-10 w-10 right-6 rounded-full object-cover ring-2 ring-purple-300 ring-offset-2 transition-all duration-300 hover:ring-purple-400"
              />
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute right-6 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div className="py-1">
                    <motion.div
                      whileHover={{ backgroundColor: "#F3F4F6" }}
                      className="px-4 py-3 border-b border-gray-100"
                    >
                      <p className="text-sm font-medium text-gray-900">{auth.username}</p>
                      <p className="text-xs text-gray-500 truncate">{auth.email}</p>
                    </motion.div>
                    
                    <motion.a
                      whileHover={{ backgroundColor: "#F3F4F6" }}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile Settings
                    </motion.a>
                    
                    <motion.a
                      whileHover={{ backgroundColor: "#F3F4F6" }}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Chat Settings
                    </motion.a>
                    
                    <motion.a
                      whileHover={{ backgroundColor: "#F3F4F6" }}
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Sign Out
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search users by username"
            className="w-full px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     text-sm transition-all duration-300"
            value={username}
            onChange={handleSearch}
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 right-4 
                        text-gray-400 group-hover:text-purple-500 transition-colors duration-300">
            <IoSearchSharp size={20} />
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        )}

        {!loading && username && users.length > 0 && (
          <div className="mt-2 px-2">
            {users.map((user) => (
              <Link to={`/live-chat/messages/${user._id}`} key={user._id} className="block">
               <button onClick={() => selectedUserHandler(user)}>
               <div className="flex items-center p-4 mb-2 rounded-xl hover:bg-white hover:shadow-md transform transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={user.profilePicture}
                      alt={user.fullName}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-purple-200"
                    />
                    {user.isVerified && (
                      <div className="absolute -right-1 -bottom-1 bg-blue-500 p-1 rounded-full">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745A3.066 3.066 0 016.267 3.455zM8 8.933l-2.8 2.8L8.267 16 14 10.267l-1.4-1.4-4.6 4.6z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-xs text-gray-500">@{user.username}</p>
                  </div>
                </div>
               </button>
              </Link>
            ))}
          </div>
        )}

        {/* Chat User List */}
        <div className="px-2 mt-4">
          {chatUsers.map((user) => (
            <Link to={`/live-chat/messages/${user._id}`} key={user._id} className="block">
              <div
                onClick={() => selectedUserHandler(user)}
                className={`flex items-center p-4 mb-2 rounded-xl hover:bg-white hover:shadow-md transform transition-all duration-300 hover:-translate-y-1 ${selectedConversation && selectedConversation._id === user._id ? "bg-purple-100" : ""}`}
              >
                <div className="relative">
                  <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-purple-200"
                  />
                  {user.isVerified && (
                    <div className="absolute -right-1 -bottom-1 bg-blue-500 p-1 rounded-full">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745A3.066 3.066 0 016.267 3.455zM8 8.933l-2.8 2.8L8.267 16 14 10.267l-1.4-1.4-4.6 4.6z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHomeSidebar;
