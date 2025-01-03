import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';

function AIChatbotHome() {
  const [chats, setChats] = useState([]);
  const [auth] = useAuth();
  const user = auth?.user;


  const fetchChats = async () => {
    try {
      const response= await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/ai-chat`);
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);



  return (
    <div className="min-h-full flex">
      <div className="w-64  shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Welcome, {user?.fullName}</h2>
         
          </div>
        </div>
        
        <div className="p-4">
          <Link
            to="/dashboard/user/chatbot/chat/new"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg transition-colors"
          >
            <FaPlus /> New Chat
          </Link>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {chats.map((chat) => (
            <Link
              key={chat._id}
              to={`/dashboard/user/chatbot/chat/${chat._id}`}
              className="block p-4 hover:bg-gray-50 border-b"
            >
              <h3 className="font-medium truncate">{chat.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(chat.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to AI Chat Assistant
          </h1>
          <p className="text-gray-600 mb-8">
            Start a new chat or select an existing conversation
          </p>
          <Link
            to="/dashboard/user/chatbot/chat/new"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-lg transition-colors"
          >
            <FaPlus /> Start New Chat
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AIChatbotHome;