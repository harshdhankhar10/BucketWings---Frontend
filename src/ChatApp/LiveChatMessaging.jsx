import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, Video, MoreVertical, Send, Smile, Paperclip, 
  Image, Mic, Link as LinkIcon, ThumbsUp, Edit, Trash,
  Search, Clock, Pin, Star, FileText, ArrowDown,
  UserPlus, Share2
} from 'lucide-react';
import { TiTick } from "react-icons/ti";


const LiveChatMessaging = () => {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef(null);
  
  const messages = [
    {
      id: 1,
      sender: 'Sarah Wilson',
      avatar: 'https://t3.ftcdn.net/jpg/02/58/89/90/240_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg',
      content: 'Hi there! I just reviewed the latest design mockups 🎨',
      time: '10:30 AM',
      isSender: false,
      status: 'read',
      reactions: ['👍', '❤️']
    },
    {
      id: 2,
      sender: 'You',
      content: "That's great! What do you think about the new color palette we chose?",
      time: '10:32 AM',
      isSender: true,
      status: 'read'
    },
    {
      id: 3,
      sender: 'Sarah Wilson',
      avatar: 'https://t3.ftcdn.net/jpg/02/58/89/90/240_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg',
      content: 'I love it! The contrast is perfect and it aligns well with our brand guidelines.',
      time: '10:33 AM',
      isSender: false,
      status: 'read'
    },
    {
      id: 4,
      sender: 'You',
      content: 'Here are some additional mockups for the mobile version:',
      time: '10:34 AM',
      isSender: true,
      status: 'sent',
      attachments: [
        { type: 'image', url: '/api/placeholder/400/300' }
      ]
    },
    {
      id: 5,
      sender: 'Sarah Wilson',
      avatar: 'https://t3.ftcdn.net/jpg/02/58/89/90/240_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg',
      content: "The mobile layout looks fantastic! Especially love how you've handled the navigation 🚀",
      time: '10:36 AM',
      isSender: false,
      status: 'delivered',
      isPinned: true
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex flex-col border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 bg-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://t3.ftcdn.net/jpg/02/58/89/90/240_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg"
                alt="Sarah Wilson"
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-gray-900">Sarah Wilson</h2>
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {isTyping && (
                  <span className="flex items-center text-purple-600">
                    <span className="mx-2"></span>
                    typing...
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
           
            <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-purple-600">
              <Phone size={20} />
            </button>
            <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-purple-600">
              <Video size={20} />
            </button>
            <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors text-purple-600">
              <UserPlus size={20} />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        
      
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-gray-50">
        {/* Date Separator */}
        <div className="flex items-center justify-center">
          <div className="bg-white px-4 py-1 rounded-full text-sm text-gray-500 shadow-sm">
            Today
          </div>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`relative ${msg.isPinned ? 'bg-purple-50/50 px-4 py-3 rounded-lg -mx-4' : ''}`}>
           
            <div className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex ${msg.isSender ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[70%] group`}>
                {!msg.isSender && (
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full object-cover mx-2"
                  />
                )}
                <div className={`space-y-1 ${msg.isSender ? 'mr-2' : 'ml-2'}`}>
                  <div
                    className={`relative inline-block rounded-2xl px-4 py-2.5 ${
                      msg.isSender
                        ? 'bg-purple-600 text-white'
                        : 'bg-white shadow-sm'
                    }`}
                  >
                    {msg.content}
                    {/* {msg.attachments?.map((attachment, index) => (
                      <div key={index} className="mt-2 rounded-lg overflow-hidden">
                        <img
                          src={attachment.url}
                          alt="attachment"
                          className="w-full"
                        />
                      </div>
                    ))} */}
                    {msg.reactions && (
                      <div className="absolute -bottom-3 right-2 bg-white rounded-full px-2 py-0.5 shadow-sm flex space-x-1">
                        {msg.reactions.map((reaction, index) => (
                          <span key={index} className="text-sm">{reaction}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center text-xs text-gray-500 ${
                    msg.isSender ? 'justify-end' : 'justify-start'
                  }`}>
                    <Clock size={12} className="mr-1" />
                    {msg.time}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />

      
      </div>

      {/* Enhanced Input Area */}
      <div className="border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="px-6 py-4">
          <div className="flex items-end space-x-4 ">
            <div className="flex-1 relative">
              <div className="absolute bottom-2 left-2 mb-3 flex items-center space-x-3 px-3">
                <button type="button" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Smile size={20} onClick={() => setShowEmoji(!showEmoji)} />
                </button>
                <button type="button" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Paperclip size={20} />
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full border border-gray-200 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-lg pl-24 pr-16 py-3 resize-none"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className="absolute bottom-2 right-2 mb-3 mr-3 flex items-center space-x-3">
                <button type="button" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Image size={20} />
                </button>
                <button type="button" className="text-gray-500 hover:text-purple-600 transition-colors">
                  <Mic size={20} />
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className={`p-3 rounded-full relative bottom-2 ${
                message.trim()
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                  : 'bg-gray-100 text-gray-400'
              } transition-all duration-200 transform hover:scale-105`}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveChatMessaging;