import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, Search, ArrowLeft, Clock, User } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const SentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSentMessages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/sent`);

        if (response.data.success) {
          const mappedMessages = response.data.messages.map(msg => ({
            id: msg._id,
            to: msg.receiverID.email,
            subject: msg.subject,
            preview: msg.content,
            date: new Date(msg.sentAt).toLocaleDateString(),
            time: new Date(msg.sentAt).toLocaleTimeString(),
            starred: msg.status === 'starred',
            category: 'All'
          }));
          setMessages(mappedMessages);
        }
      } catch (error) {
        console.error('Error fetching sent messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSentMessages();
  }, []);

  const deleteMessage = async (id) => {
    try {
      Swal.fire({
        title: 'Delete Message',
        text: 'This action cannot be undone. Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'rounded-xl',
          confirmButton: 'px-6 py-2 rounded-lg',
          cancelButton: 'px-6 py-2 rounded-lg'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/delete/${id}`);
          if (response.data.success) {
            setMessages(messages.filter((message) => message.id !== id));
            Swal.fire({
              icon: 'success',
              title: 'Message Deleted',
              text: 'Message has been successfully removed',
              customClass: {
                popup: 'rounded-xl'
              }
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text: 'Unable to delete the message. Please try again.',
        customClass: {
          popup: 'rounded-xl'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">Back</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Sent Messages</h1>
              <div className="relative w-96">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">Loading messages...</div>
              ) : messages
                .filter((message) => 
                  message.to.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  message.subject.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{message.to}</span>
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-purple-600 transition-colors">
                          <Link to={`/dashboard/user/messages/view/${message.id}`}>{message.subject}</Link>
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {message.preview}
                          </p>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{message.date} at {message.time}</span>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {message.category}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteMessage(message.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
            
            {!isLoading && messages.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No messages found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentMessages;