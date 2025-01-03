import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AIChatMessage from './components/AIChatMessage';
import AIChatInput from './components/AIChatInput';
import AIChatSidebar from './components/AIChatSidebar';
import { FaArrowLeft } from 'react-icons/fa';

function AIChatbotChats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (id !== 'new') {
      fetchChat();
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const fetchChat = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/ai-chat/${id}`);
      setChat(data.chat);
    } catch (error) {
      console.error('Error fetching chat:', error);
      navigate('/dashboard/user/chatbot');
    }
  };

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    try {
      if (id === 'new') {
        const { data } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/ai-chat/`,
          { message } );
        navigate(`/dashboard/user/chatbot/chat/${data.chat._id}`);
      } else {
        const { data } = await axios.put(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/ai-chat/${id}`,
          {
            headers: { 'Content-Type': 'application/json'}
          },
          { message });
          console.log(data);
        setChat(data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AIChatSidebar />
      
      <div className="flex-1 flex flex-col">
        <div  onClick={() => window.history.back()} 
        className="bg-white shadow-sm p-4 flex items-center cursor-pointer">
          <button
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-xl font-semibold">
            {id === 'new' ? 'New Chat' : chat?.title}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chat?.messages.map((message, index) => (
            <AIChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-white">
          <AIChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AIChatbotChats;