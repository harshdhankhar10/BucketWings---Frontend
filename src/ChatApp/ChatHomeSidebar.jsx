import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Settings, MessageCircle, LogOut } from 'lucide-react';
import axios from 'axios';
import { IoSearchSharp } from "react-icons/io5";

const ChatHomeSidebar = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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

  return (
    <div className="h-screen w-80 bg-gradient-to-b from-white to-purple-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="pt-5 pl-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center justify-between  space-x-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              BucketTalk
            </h1>
          <button>
           <img src="https://i.postimg.cc/Fs0J49Kz/pixelcut-export-2.png" alt="Profile"
            className=" relative left-16 h-10 w-10 rounded-full object-cover ring-2 ring-purple-300 ring-offset-2" />
          </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search using username"
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
        
        {!loading && users.length > 0 && (
          <div className="mt-2 px-2">
            {users.map((user) => (
              <Link 
                to={`/chat/messages/${user._id}`} 
                key={user._id}
                className="block"
              >
                <div className="flex items-center p-4 mb-2 rounded-xl hover:bg-white hover:shadow-md
                              transform transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={user.profilePicture}
                      alt={user.fullName}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-purple-200"
                    />
                    {user.isVerified && (
                      <div className="absolute -right-1 -bottom-1 bg-blue-500 p-1 rounded-full">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{user.fullName}</p>
                    {user.bio && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{user.bio}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && username && users.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Users size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm">No users found</p>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default ChatHomeSidebar;