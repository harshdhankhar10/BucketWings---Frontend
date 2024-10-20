import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Image, FileText, Phone, Video, 
  UserPlus, X, Paperclip, Download,
  MoreVertical, Search
} from 'lucide-react';
import userConversation from "../zustand/userConversation";
import axios from 'axios';
import { storage } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const LiveChatMessaging = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [attachmentType, setAttachmentType] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const { messages, selectedConversation, setMessage } = userConversation();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("auth"))?.user);
  const lastMessageRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/message/get/${selectedConversation._id}`);
        if (response.data.success) {
          setMessage(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (selectedConversation) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation, setMessage]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !attachmentUrl) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/message/send/${selectedConversation._id}`, {
        message: inputMessage,
        attachment: attachmentUrl,
        attachmentType,
        attachmentName
      });
      
      if (response.data.success) {
        setInputMessage('');
        setAttachmentType(null);
        setAttachmentPreview(null);
        setAttachmentUrl('');
        setAttachmentName('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `chatFiles/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setIsUploading(false);
        toast.error('Failed to upload file');
        console.error('File upload error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAttachmentType(type);
          setAttachmentUrl(downloadURL);
          setAttachmentName(file.name);
          setIsUploading(false);
          toast.success('File uploaded successfully');
        });
      }
    );

    if (type === 'image') {
      const attachUrl = URL.createObjectURL(file);
      setAttachmentPreview(attachUrl);
    }
  };


  const renderMessage = (msg) => {
    const isOwnMessage = msg.senderId === userInfo.id;
    
    return (
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[70%] group`}>
          {!isOwnMessage && (
            <div className="flex flex-col items-center space-y-1 mx-2">
              <img
                src={selectedConversation.profilePicture || '/api/placeholder/32/32'}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          )}
          
          <div className={`space-y-1 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
            <div className={`relative flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 rounded-xl ${
                isOwnMessage 
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white' 
                  : 'bg-white text-gray-900 shadow-sm'
              }`}>
                {msg.message && (
                  <p className="mb-2 leading-relaxed">{msg.message}</p>
                )}
                
                {msg.attachment && msg.attachmentType === 'image' ? (
                  <div className="rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setSelectedImage(msg.attachment)}
                      className="block w-full relative group"
                    >
                      <img
                        src={msg.attachment}
                        alt="attachment"
                        className="w-full max-w-sm rounded-lg cursor-zoom-in transform transition-transform duration-200 hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-black bg-opacity-40 px-4 py-2 rounded-full">
                          <span className="text-white text-sm">View full size</span>
                        </div>
                      </div>
                    </button>
                  </div>
                ) : msg.attachment && (
                  <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isOwnMessage ? 'bg-indigo-800 bg-opacity-50' : 'bg-gray-50'
                  }`}>
                    <FileText className={`w-8 h-8 ${isOwnMessage ? 'text-white' : 'text-indigo-600'}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        isOwnMessage ? 'text-white' : 'text-gray-900'
                      }`}>
                        {msg.attachmentName || 'Attachment'}
                      </p>
                      <a
                        href={msg.attachment}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center space-x-1 text-xs ${
                          isOwnMessage ? 'text-indigo-200 hover:text-white' : 'text-indigo-600 hover:text-indigo-700'
                        } transition-colors duration-200`}
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {isOwnMessage && (
                <span className="text-xs text-gray-400 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {!selectedConversation ? (
        <div className="flex flex-col items-center justify-center h-full bg-white">
          <UserPlus className="w-24 h-24 text-indigo-300" />
          <p className="mt-6 text-2xl font-semibold text-gray-700">Select a conversation to start messaging</p>
        </div>
      ) : (
        <>
          {/* Enhanced Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={selectedConversation.profilePicture || '/api/placeholder/48/48'}
                    alt={selectedConversation.username}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedConversation.fullName}</h2>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors duration-200">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors duration-200">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors duration-200">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area with enhanced scrollbar */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div ref={index === messages.length - 1 ? lastMessageRef : null} key={msg._id || index}>
                {renderMessage(msg)}
              </div>
            ))}
          </div>

          {/* Enhanced Attachment Preview */}
          {(attachmentPreview || isUploading) && (
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="relative inline-block">
                {attachmentPreview && (
                  <div className="relative group">
                    <img 
                      src={attachmentPreview} 
                      alt="preview" 
                      className="max-h-32 rounded-lg shadow-sm"
                    />
                    <button
                      onClick={() => {
                        setAttachmentPreview(null);
                        setAttachmentUrl('');
                        setAttachmentType(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-1 bg-gray-200 rounded-full mb-2">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm font-medium">
                        {uploadProgress.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Message Input */}
          <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => imageInputRef.current.click()}
                  className="p-2.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors duration-200"
                  title="Send Image"
                >
                  <Image className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="p-2.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors duration-200"
                  title="Send File"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              
              <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                onChange={(e) => handleFileUpload(e, 'file')}
              />
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="w-full bg-gray-100 rounded-2xl px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-200"
                  placeholder="Type your message..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isUploading}
                className={`p-3.5 rounded-xl text-white shadow-sm transition-all duration-200 ${
                  isUploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </>
      )}

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Full size" 
                className="w-full h-auto max-h-[85vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChatMessaging;