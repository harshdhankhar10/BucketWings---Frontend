import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Search, Settings, MessageCircle, Bell, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { RiAccountCircleLine } from 'react-icons/ri';
import { MdOutlineSettings } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';
import ChatUserProfile from './Chat Components/ChatUserProfile';

const ChatHomePage = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isOutlet, setIsOutlet] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/all-users`);
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          Swal.fire({
            title: 'Error',
            text: response.data.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (auth) {
      fetchUsers();
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'You need to login to access this page',
        icon: 'error',
        confirmButtonText: 'Login'
      }).then(() => {
        window.location.href = '/login';
      });
    }
  }, [auth]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    Swal.fire({
      title: 'Enter Username to Logout',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Logout',
      showLoaderOnConfirm: true,
      preConfirm: (username) => {
        if (username !== auth.username) {
          Swal.showValidationMessage('Username is incorrect');
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logged Out',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          localStorage.removeItem('auth');
          window.location.href = '/login';
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>BucketTalk - Live Chat</title>
      </Helmet>
      {auth && (
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <Link to="/live-chat" onClick={() => setIsOutlet(true)}>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    BucketTalk
                  </h1>
                </Link>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => setIsSettingDialogOpen(!isSettingDialogOpen)}
                  >
                    <Settings className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>             

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Recent Chats</h2>
                {filteredUsers.map(user => (
                  <Link 
                    to={`/live-chat/messages/${user._id}`} 
                    key={user._id}
                    onClick={() => {
                      setIsOutlet(false);
                      setSelectedChat(user._id);
                    }}
                  >
                    <div className={`flex items-center p-3 rounded-lg mb-2 transition-colors ${
                      selectedChat === user._id ? 'bg-purple-50' : 'hover:bg-gray-50'
                    }`}>
                      <div className="relative">
                        <img
                          src={user.profilePicture || "https://via.placeholder.com/48"}
                          alt={user.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                        {user.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="font-semibold text-gray-900">
                              {user.fullName}
                            </h2>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                          </div>
                          <span className="text-xs text-gray-500">{user.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                          {user.lastMessage}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {isOutlet ? (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="text-center p-8 rounded-2xl bg-white shadow-lg max-w-md mx-auto">
                  <MessageCircle className="w-16 h-16 mx-auto text-purple-500 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to BucketTalk</h3>
                  <p className="text-gray-600 mb-6">Connect and chat with your friends and colleagues in real-time.</p>
                  <div className="flex justify-center space-x-4">
                    <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Start New Chat
                    </button>
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      View Contacts
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>

          {/* Settings Dialog */}
          <AnimatePresence>
            {isSettingDialogOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute top-4 left-24 mt-12 w-56 p-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10"
              >
                <button
                  onClick={() => setIsUserProfileOpen(true)}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <RiAccountCircleLine className="w-5 h-5 text-purple-600" />
                  <span className="ml-3 text-sm font-medium text-gray-700">Profile</span>
                </button>
                <button className="flex items-center w-full p-3 rounded-lg hover:bg-purple-50 transition-colors">
                  <MdOutlineSettings className="w-5 h-5 text-purple-600" />
                  <span className="ml-3 text-sm font-medium text-gray-700">Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <PiSignOutBold className="w-5 h-5 text-red-600" />
                  <span className="ml-3 text-sm font-medium text-red-600">Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* User Profile Modal */}
          {isUserProfileOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="relative inline-block max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <button
                    onClick={() => setIsUserProfileOpen(false)}
                    className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <ChatUserProfile />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatHomePage;