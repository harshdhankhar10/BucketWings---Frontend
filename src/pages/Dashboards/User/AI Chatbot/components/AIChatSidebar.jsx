import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../../context/AuthContext';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

function AIChatSidebar() {
  const [chats, setChats] = useState([]);
  const [auth] = useAuth();
  const user = auth?.user;
  

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/ai-chat`);
      setChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };




  return (
    <div className="w-64  shadow-lg flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Welcome, {user?.fullName}</h2>
         
        </div>
      </div>

      <div className="p-4">
        <Link
          to="dashboard/user/chatbot/chat/new"
          className="flex items-center justify-center gap-2 w-full  py-2 px-4 rounded-lg transition-colors"
        >
          <FaPlus /> New Chat
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
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
  );
}

export default AIChatSidebar;