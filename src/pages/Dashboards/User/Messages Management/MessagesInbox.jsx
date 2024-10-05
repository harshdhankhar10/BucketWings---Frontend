import React, { useEffect, useState } from 'react';
import { Mail, Star, Trash2, Search, Filter, MoreVertical, Paperclip, Edit3, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('Inbox');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth'))?.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/inbox`);
        if (response.data.success) {
          const mappedMessages = response.data.messages.map(msg => ({
            id: msg._id,
            sender: msg.email,  // sender is now the email from response
            subject: msg.subject,
            preview: msg.content,
            date: new Date(msg.sentAt).toLocaleDateString(),
            attachment: msg.attachment ? true : false,  // Check if there is an attachment
            isStarred: msg.status === 'starred',
            isRead: msg.status === 'read',
          }));
          setMessages(mappedMessages);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Mail</h1>
        <Link to="/dashboard/user/messages/send" className="mb-6">
          <button className="bg-blue-600 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-700 transition duration-300 flex items-center justify-center">
            <Edit3 className="h-4 w-4 mr-2" />
            Compose
          </button>
        </Link>
        <nav className="flex-grow space-y-1">
          <Link to="/dashboard/user/messages/inbox" className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition duration-150`}>
            <div className="flex items-center">
              <Mail className="mr-2" />
              <span>Inbox</span>
            </div>
          </Link>
          <Link to="/dashboard/user/messages/sent" className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition duration-150`}>
            <div className="flex items-center">
              <Mail className="mr-2" />
              <span>Sent</span>
            </div>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <img className="h-10 w-10 rounded-full mr-3" src={user.profilePicture} alt={user.fullName} />
            <div>
              <p className="font-medium text-gray-800">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-grow max-w-xl">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Filter size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Message List */}
        <div className="flex-grow overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`border-b border-gray-200 hover:bg-gray-100 transition duration-150 cursor-pointer ${
                !message.isRead ? 'bg-white' : 'bg-gray-50'
              }`}
            >
            <Link to={`/dashboard/user/messages/view/${message.id}`}>
              <div className="flex items-center p-4">
                <img src={user.profilePicture} alt={user.fullName} className="w-10 h-10 rounded-full mr-4" />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center mb-1">
                    <h3 className="font-semibold text-gray-800 truncate mr-2">{message.sender}</h3>
                    <span className="text-sm text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-gray-800 font-medium ">{message.subject}</p>
                  <p className="text-sm text-gray-500">
                  {message.preview.length > 100 ? `${message.preview.substring(0, 120)}...` : message.preview}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {message.attachment && <Paperclip size={16} className="text-gray-400" />}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMessage(message.id);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Link>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <p className="text-sm text-gray-500 text-center">© 2024 BucketWings. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Inbox;
