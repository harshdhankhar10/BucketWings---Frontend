import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, Search } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getSentMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/sent`);

        if (response.data.success) {
          const mappedMessages = response.data.messages.map(msg => ({
            id: msg._id,
            to: msg.receiverID.email,
            subject: msg.subject,
            preview: msg.content,
            date: new Date(msg.sentAt).toLocaleDateString(),
            starred: msg.status === 'starred',
            category: 'All'
          }));
          setMessages(mappedMessages);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching sent messages:', error);
      }
    };

    getSentMessages();
  }, []);

  const deleteMessage = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this message!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/delete/${id}`);
                if (response.data.success) {
                    setMessages(messages.filter((message) => message.id !== id));
                    Swal.fire({
                        icon: 'success',
                        title: 'Message Deleted',
                        text: 'The message has been deleted successfully',
                    });
                } else {
                    console.error(response.data.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while deleting the message',
                    });
                }
            }
        });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the message',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-2xl">
      <h1 className="text-5xl font-bold mb-8 text-indigo-900">Sent Messages</h1>

      <div className="flex items-center space-x-4 mb-8">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-300 bg-white shadow-inner text-indigo-900 placeholder-indigo-400"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" size={22} />
        </div>
      </div>

      <AnimatePresence>
        {messages
          .filter((message) => 
            message.to.toLowerCase().includes(searchTerm.toLowerCase()) || 
            message.subject.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <Mail className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{message.to}</p>
                    <p className="text-indigo-600 font-medium">{message.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteMessage(message.id)}
                    className="p-2 rounded-full bg-red-100 text-red-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                {message.preview.length > 100 ? `${message.preview.substring(0, 100)}...` : message.preview}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">{message.date}</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">{message.category}</span>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default SentMessages;
