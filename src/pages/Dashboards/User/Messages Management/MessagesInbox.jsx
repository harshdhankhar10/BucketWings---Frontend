import React, { useState } from 'react';
import { Mail, Star, Trash2, Search, Filter, MoreVertical, Paperclip, Edit3 } from 'lucide-react';
import {Link} from 'react-router-dom';
const initialMessages = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Meeting Tomorrow",
    preview: "Hi, just a reminder about our meeting...",
    date: "2024-10-04",
    isRead: false,
    isStarred: true,
    hasAttachment: true,
    color: "#FF6B6B"
  },
  {
    id: 2,
    sender: "Jane Smith",
    subject: "Project Update",
    preview: "I've completed the first phase of...",
    date: "2024-10-03",
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    color: "#4ECDC4"
  },
  // Add more messages as needed...
];

const Inbox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const handleToggleStar = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, isStarred: !message.isStarred } : message
    ));
  };

  const filteredMessages = messages.filter(message => 
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-100 p-8">
      <div className="max-w-7xl h-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
            <h1 className="text-3xl font-bold mb-8">Inbox</h1>
          <Link to={`/dashboard/user/messages/send`}>
          <button className="bg-indigo-600 text-white rounded-full py-3 px-6 mb-8 hover:bg-indigo-700 transition duration-300 flex items-center justify-center shadow-lg">
              <Edit3 className="h-5 w-5 mr-2" />
              Compose
            </button>
          </Link>
            <nav className="flex-grow space-y-2">
              {['Inbox', 'Sent', 'Drafts', 'Starred', 'Trash'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="block py-2 px-4 rounded-lg text-gray-200 hover:bg-gray-800 transition duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full mr-3" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User avatar" />
                <div>
                  <p className="font-medium">Emma Watson</p>
                  <p className="text-sm text-gray-400">emma@example.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <div className="flex items-center space-x-4">
                  <Filter className="text-gray-500 hover:text-gray-700 cursor-pointer" size={20} />
                  <MoreVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" size={20} />
                </div>
              </div>
            </header>

            {/* Message List */}
            <div className="flex-grow overflow-y-auto p-6">
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition duration-300 flex items-center"
                  >
                    <div className="w-2 h-16 self-stretch" style={{ backgroundColor: message.color }}></div>
                    <div className="p-4 flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-lg truncate">{message.subject}</h3>
                        <span className="text-sm text-gray-500">{message.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{message.sender}</p>
                      <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                    </div>
                    <div className="p-4 flex items-center space-x-3 text-gray-400">
                      {message.hasAttachment && <Paperclip size={16} />}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(message.id);
                        }}
                        className={`${message.isStarred ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-500 transition duration-150`}
                      >
                        <Star size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(message.id);
                        }}
                        className="hover:text-red-500 transition duration-150"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Added some spacing to the bottom */}
            <footer className="bg-white p-6">
              <p className="text-sm text-gray-500 text-center">© 2024 BucketWings. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
