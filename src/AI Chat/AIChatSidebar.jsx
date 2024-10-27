import React, { useState, useEffect } from 'react';
import { Search, Plus, Settings, LogOut } from 'lucide-react'; // Ensure you're importing MdDelete
import Swal from 'sweetalert2';
import { chatData } from '../context/AIChatContext';
import { MdDelete } from 'react-icons/md';

const ElegantAIChatSidebar = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("auth"))?.user);
  const [searchQuery, setSearchQuery] = useState('');
  const { chats, createChat, setSelected, deleteChat, loading } = chatData(); // Assuming loading is managed in your context

   const clickEvent = (id) => {
    setSelected(id);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth");
        window.location.href = "/login";
      }
    });
  }

  const deleteChatHandler = (id) => {
    deleteChat(id); 
  };

  return (
    <div className="h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Profile Section */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
            <img src={user?.profilePicture} alt="avatar" className="w-10 h-10 rounded-full" />
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 font-medium">{user?.fullName}</h2>
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
              <span className="text-gray-500 text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 text-sm rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-4 mt-4">
        <button onClick={createChat}
         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 flex items-center justify-center space-x-2 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Conversation</span>
        </button>
      </div>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto mt-6">
        <div className="px-4 mb-2 flex items-center justify-between">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Chats</h3>
        </div>

        <div className="space-y-0.5">
          {loading ? ( // Loading state check
            <p className="text-gray-500 text-center">Loading chats...</p>
          ) : chats && chats.length > 0 ? (
            chats.map((chat) => (
              <div key={chat._id} className="w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-between items-center">
                <button className="flex-grow text-left" onClick={() => clickEvent(chat._id)}>
                  <span>{chat.latestMessage.slice(0, 38)}...</span>
                </button>
                <button className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700" onClick={(e) => {
                  e.stopPropagation();
                  deleteChatHandler(chat._id);
                }}>
                  <MdDelete />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No chats yet</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElegantAIChatSidebar;
