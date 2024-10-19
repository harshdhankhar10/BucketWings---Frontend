import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, Outlet } from 'react-router-dom';
import ChatHomeSidebar from './ChatHomeSidebar';
import { MessageCircle, Plus, Search, Bell, Image, Settings } from 'lucide-react';

const ChatAppHomepage = () => {
  return (
    <>
      <Helmet>
        <title>BucketTalk - Live Chat Application</title>
        <meta name="description" content="BucketTalk - Connect and chat in real-time" />
      </Helmet>
      
      <div className="h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="flex-none">
          <ChatHomeSidebar />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Welcome Screen / Empty State */}
          {!Outlet ? (
            <div className="h-full flex items-center justify-center bg-white">
              <div className="text-center space-y-4 max-w-md mx-auto p-6">
                <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageCircle size={40} className="text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome to BucketTalk</h1>
                <p className="text-gray-500">
                  Select a conversation to start chatting or create a new one to connect with others.
                </p>
                <button className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus size={20} className="mr-2" />
                  Start New Chat
                </button>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>

        {/* Optional: Info Panel (can be toggled) */}
        {/* <div className="w-80 border-l border-gray-200 bg-white hidden lg:block">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Chat Info</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src="/api/placeholder/80/80"
                  alt="Chat"
                  className="w-20 h-20 rounded-full mx-auto"
                />
                <h3 className="mt-2 font-medium text-gray-900">Chat Name</h3>
                <p className="text-sm text-gray-500">2 participants</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Search className="text-gray-600 mb-1" size={20} />
                  <span className="text-sm text-gray-600">Search</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="text-gray-600 mb-1" size={20} />
                  <span className="text-sm text-gray-600">Notifications</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Image className="text-gray-600 mb-1" size={20} />
                  <span className="text-sm text-gray-600">Media</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="text-gray-600 mb-1" size={20} />
                  <span className="text-sm text-gray-600">Settings</span>
                </button>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Shared Media</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="aspect-square bg-gray-100 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ChatAppHomepage;