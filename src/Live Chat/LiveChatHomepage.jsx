import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import LiveChatSidebar from './LiveChatSidebar';
import LiveChatMessagingContainer from './LiveChatMessagingContainer';

const LiveChatHomepage = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth) {
      setError('You need to be logged in to access this page');
    }
  }, [auth]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle size={48} />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-center text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 ease-in-out"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <div className="flex-none w-80 bg-white border-r border-gray-200">
        <LiveChatSidebar />
      </div>
      
      <div className="flex-grow flex flex-col">
        
        <div className="flex-grow overflow-hidden">
          <LiveChatMessagingContainer />
        </div>
      </div>
    </div>
  );
};

export default LiveChatHomepage;