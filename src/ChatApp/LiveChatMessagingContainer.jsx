import React, { useState, useEffect } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { GrAttachment } from "react-icons/gr";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { storage } from "../Firebase/Firebase";
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating chat IDs

const LiveChatMessagingContainer = () => {
  const socket = io(`${import.meta.env.VITE_REACT_APP_API}`); 

  const [message, setMessage] = useState('');
  const [auth] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const [attachment, setAttachment] = useState("https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=");
  const [messages, setMessages] = useState([]);
  const [chatId] = useState(uuidv4()); 
  useEffect(() => {

    socket.on('receive_message', (data) => {
      if (data.chatId === chatId) { 
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });
    
    return () => {
      socket.off('receive_message');
    };
  }, [socket, chatId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        id: Date.now(),
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chatId 
      };
      socket.emit('send_message', messageData); 
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage(''); 
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg">
        <div className="flex justify-between items-center mx-auto">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={auth.profilePicture} 
                className="w-12 h-12 rounded-full border-2 border-white shadow-md" 
                alt={auth.fullName} 
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-white">{auth.fullName}</h2>
              <p className="text-sm text-purple-100">Active now</p>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200">
            <IoMdInformationCircleOutline className="text-2xl text-white" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${
                msg.sender === 'user' 
                  ? 'bg-purple-600 text-white rounded-l-xl rounded-br-xl' 
                  : 'bg-white text-gray-800 rounded-r-xl rounded-bl-xl shadow-md'
              } p-4 relative`}>
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs mt-1 block opacity-70">{msg.time}</span>
              </div>
              {
                attachment && msg.id === messages.length && (
                  <div className="flex justify-end">
                    <img 
                      src={attachment} 
                      alt="Attachment" 
                      className="w-40 h-40 object-cover rounded-xl shadow-md mt-2" 
                    />
                  </div>
                )
              }
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="mx-auto flex items-center space-x-4"> 
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <GrAttachment className="text-xl text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <MdOutlineAddPhotoAlternate className="text-xl text-gray-500" />
            </button>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200"
            />
          </div>
          <button 
            onClick={handleSendMessage} // Handle sending message on button click
            className="p-3 bg-purple-600 rounded-full text-white shadow-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
          >
            <IoSendSharp className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChatMessagingContainer;
