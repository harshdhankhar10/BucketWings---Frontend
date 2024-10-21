import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchSharp, IoSettingsOutline, IoLogOutOutline, IoPersonOutline, 
         IoChatboxOutline, IoMenuOutline, IoNotificationsOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import useUserConversation from "../zustand/userConversation";
import { useSocketContext } from '../context/SocketContext';

const ChatHomeSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth"))?.user);
  const { onlineUser, socket } = useSocketContext();
  const [unreadCounts, setUnreadCounts] = useState({});
  const navigate = useNavigate();

  const { selectedConversation, setSelectedConversation } = useUserConversation();


  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      setUnreadCounts(prev => ({
        ...prev,
        [newMessage.sender]: (prev[newMessage.sender] || 0) + 1
      }));
    });
    return () => socket?.off('newMessage');
  }, [socket]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  useEffect(() => {
    const fetchChatUsers = async () => {
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

    fetchChatUsers();
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
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

  const selectedUserHandler = (user) => {
    setSelectedConversation(user);
    setUnreadCounts(prev => ({ ...prev, [user._id]: 0 }));
    setIsSidebarOpen(false);
  };

  const UserCard = ({ user, isOnline, unreadCount }) => (
    <div className={`relative flex items-center px-4 py-3 rounded-xl hover:bg-white/90 
                    transition-all duration-300 group cursor-pointer
                    ${selectedConversation?._id === user._id ? 'bg-white shadow-md' : ''}`}>
      <div className="relative flex-shrink-0">
        <img
          src={user.profilePicture}
          alt={user.fullName}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-purple-200 
                   group-hover:ring-purple-400 transition-all duration-300"
        />
        {isOnline && (
          <div className="absolute -right-0.5 -bottom-0.5 w-3.5 h-3.5 bg-emerald-500 
                        rounded-full ring-2 ring-white animate-pulse" />
        )}
      </div>

      <div className="ml-3 flex-grow min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-800 truncate">{user.fullName}</p>
          {unreadCount > 0 && (
            <span className="ml-2 flex items-center justify-center bg-purple-500 text-white 
                           text-xs font-bold h-5 min-w-[20px] px-1.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">@{user.username}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed z-50 bottom-6 right-6 md:hidden bg-purple-600 text-white p-3.5 
                 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200"
      >
        <IoMenuOutline size={24} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 z-40 w-80 transform transition-transform 
                      duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                      bg-gradient-to-br from-white via-purple-50/50 to-white border-r border-gray-200 
                      flex flex-col`}>
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 
                      px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Link to="/live-chat" className="group">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 
                           text-transparent bg-clip-text group-hover:from-purple-500 
                           group-hover:to-indigo-500 transition-all duration-300">
                BucketTalk
              </h1>
            </Link>

            {/* Profile Dropdown Trigger */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative focus:outline-none group"
              >
                <img
                  src={auth.profilePicture}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-300/50 
                           group-hover:ring-purple-400 transition-all duration-300"
                />
                {unreadCounts['notifications'] > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full 
                                 flex items-center justify-center text-xs text-white font-bold">
                    {unreadCounts['notifications']}
                  </span>
                )}
              </button>

              {/* Enhanced Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.35 }}
                    className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white 
                             shadow-lg ring-1 ring-black/5 z-50"
                  >
                    <div className="p-3">
                      {/* Profile Header */}
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{auth.fullName}</p>
                        <p className="text-xs text-gray-500 truncate">{auth.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="mt-2 space-y-1">
                        {[
                          { icon: IoPersonOutline, text: "View Profile", color: "text-gray-700" },
                          { icon: IoSettingsOutline, text: "Settings", color: "text-gray-700" },
                          { icon: IoNotificationsOutline, text: "Notifications", color: "text-gray-700", 
                            badge: unreadCounts['notifications'] },
                          { icon: IoLogOutOutline, text: "Sign Out", color: "text-red-600", 
                            onClick: handleLogout }
                        ].map((item, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ x: 4 }}
                            onClick={item.onClick}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm 
                                    ${item.color} rounded-lg hover:bg-gray-50 transition-colors duration-200`}
                          >
                            <span className="flex items-center">
                              <item.icon size={18} className="mr-2" />
                              {item.text}
                            </span>
                            {item.badge > 0 && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 
                                           rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200/75 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/20 
                       focus:border-purple-500/30 text-sm transition-all duration-300 pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
            <IoSearchSharp 
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={16} 
            />
          </div>
        </div>

        {/* User Lists */}
        <div className="flex-1 overflow-y-auto space-y-4 p-3 scrollbar-thin 
                      scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 
                           border-t-transparent" />
            </div>
          )}

          {/* Search Results */}
          {!loading && searchQuery && users.length > 0 && (
            <div className="space-y-2">
              <h3 className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Search Results
              </h3>
              {users.map((user) => (
                <Link to={`/live-chat/messages/${user._id}`} key={user._id}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    onClick={() => selectedUserHandler(user)}
                  >
                    <UserCard 
                      user={user} 
                      isOnline={onlineUser.includes(user._id)}
                      unreadCount={unreadCounts[user._id] || 0}
                    />
                  </motion.div>
                </Link>
              ))}
            </div>
          )}

          {/* Recent Chats */}
          {chatUsers.length > 0 && (
            <div className="space-y-2">
              <h3 className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recent Conversations
              </h3>
              {chatUsers.map((user) => (
                <Link to={`/live-chat/messages/${user._id}`} key={user._id}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    onClick={() => selectedUserHandler(user)}
                  >
                    <UserCard 
                      user={user} 
                      isOnline={onlineUser.includes(user._id)}
                      unreadCount={unreadCounts[user._id] || 0}
                    />
                  </motion.div>
                </Link>
              ))}
              <div>

              </div>
            </div>
          )}

          {/* Empty States */}
          {!loading && searchQuery && users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="text-gray-400 mb-3">
                <IoSearchSharp size={40} />
              </div>
              <p className="text-gray-600 font-medium">No results found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try searching with a different username
              </p>
            </div>
          )}

          {!loading && chatUsers.length === 0 && !searchQuery && (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="text-gray-400 mb-3">
                <IoChatboxOutline size={40} />
              </div>
              <p className="text-gray-600 font-medium">No conversations yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Search for users to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatHomeSidebar;