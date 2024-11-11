import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import SendMessage from './SendMessage';
import { 
  Mail, 
  Trash2, 
  Search, 
  Filter, 
  MoreVertical, 
  Paperclip, 
  Edit3, 
  Star, 
  Send, 
  Archive, 
  Clock, 
  Bell,
  Settings,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { RxCross2 } from "react-icons/rx";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const [showModel, setShowModel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/inbox`);
        if (response.data.success) {
          const mappedMessages = response.data.messages
            .filter((msg) => !msg.isDeleted)
            .map((msg) => ({
              id: msg._id,
              sender : msg.senderID,
              subject: msg.subject,
              preview: msg.content,
              date: new Date(msg.sentAt).toLocaleDateString(),
              time: new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              attachment: !!msg.attachment,
              isStarred: msg.status === 'starred',
              isRead: msg.status === 'read',
            }));
          setMessages(mappedMessages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to fetch messages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/search-inbox?query=${e.target.value}`);
        if (response.data.success) {
          setIsLoading(false);
          const mappedMessages = response.data.messages
            .filter((msg) => !msg.isDeleted)
            .map((msg) => ({
              id: msg._id,
              sender : msg.senderID,
              subject: msg.subject,
              preview: msg.content,
              date: new Date(msg.sentAt).toLocaleDateString(),
              time: new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              attachment: !!msg.attachment,
              isStarred: msg.status === 'starred',
              isRead: msg.status === 'read',
            }));
          setMessages(mappedMessages);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Error searching messages:', error);
        
      }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/delete-from-inbox/${id}`);
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const sidebarItems = [
    { icon: <Mail size={20} />, label: 'Inbox', count: messages.length, link: '/dashboard/user/messages/inbox' },
    { icon: <Send size={20} />, label: 'Sent', link: '/dashboard/user/messages/sent' },
    { icon: <Star size={20} />, label: 'Starred', count: messages.filter(m => m.isStarred).length },
    { icon: <Archive size={20} />, label: 'Archive' },
  ];

  const bottomSidebarItems = [
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support' },
    { icon: <LogOut size={20} />, label: 'Logout' },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg flex flex-col border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg">
                 <img src={user.profilePicture} alt="profile" className="w-10 h-10 rounded-full" />
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{user.fullName}</h1>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModel(true)}
            className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center shadow-md"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Compose New Mail
          </motion.button>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link || '#'}
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <div className="flex items-center text-gray-700 group-hover:text-blue-600">
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full text-xs font-medium">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </nav>

       
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative flex-grow max-w-2xl">
              <input
                type="text"
                placeholder="Search in mail..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex items-center space-x-3 ml-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={20} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Message List */}
        <div className="flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Mail size={48} className="mb-4" />
                <p className="text-lg font-medium">No messages found</p>
                <p className="text-sm">Your inbox is empty</p>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !message.isRead ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center px-6 py-4">
                      <Link 
                        to={`/dashboard/user/messages/view/${message.id}`} 
                        className="flex-grow flex items-center min-w-0 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                          <span className="text-blue-600 font-semibold">
                           <img src={message.sender?.profilePicture} alt="profile" className="w-10 h-10 rounded-full" />
                          </span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold text-gray-900 truncate mr-2 group-hover:text-blue-600">
                              {message.sender?.fullName}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock size={14} />
                              <span>{message.time}</span>
                              <span>•</span>
                              <span>{message.date}</span>
                            </div>
                          </div>
                          <p className="text-gray-900 font-medium mb-1">{message.subject}</p>
                          <p className="text-sm text-gray-600 truncate">
                            {message.preview.toString().slice(0, 100)} {message.preview.length > 100 && '...'}
                          </p>
                        </div>
                      </Link>
                      <div className="flex items-center space-x-3 ml-4">
                        {message.attachment && (
                          <Paperclip size={16} className="text-gray-400" />
                        )}
                        <button 
                          className="p-1 hover:bg-yellow-50 rounded-full transition-colors group"
                        >
                          <Star 
                            size={16} 
                            className={`${message.isStarred ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'}`} 
                          />
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message.id);
                          }}
                          className="p-1 hover:bg-red-50 rounded-full transition-colors group"
                        >
                          <Trash2 size={16} className="text-gray-400 group-hover:text-red-500" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {showModel && (
          <div className="fixed inset-0 z-40 overflow-hidden bg-black bg-opacity-50">
              <button 
                onClick={() => setShowModel(false)}
                className="absolute top-24 right-6 p-2 rounded-full bg-gray-800 hover:bg-gray-900 transition-colors"
              >
                <RxCross2 size={24} className="text-white" />
              </button>
            <SendMessage setShowModel={setShowModel} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Inbox;