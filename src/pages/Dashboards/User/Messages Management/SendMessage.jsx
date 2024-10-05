import React, { useState } from 'react';
import { Paperclip, Send, X, Check, Mail, Calendar, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

const SendMessage = () => {
    const navigate = useNavigate();
    const location = useLocation();
  const { state } = location;
  const [receiverEmail, setReceiverEmail] = useState(state?.receiverEmail || '');
  const [subject, setSubject] = useState(state?.subject || '');
  const [message, setMessage] = useState(state?.content || '');
  const [attachment, setAttachment] = useState(state?.attachment || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth'))?.user);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/send`, {
        receiverEmail,
        subject,
        content : message,
        attachment,
    });
    if (response.data.success) {
        Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'Your message has been sent successfully',
            button: false,
        });
        setReceiverEmail('');
        setSubject('');
        setMessage('');
        setAttachment(null);
        navigate('/dashboard/user/messages/sent');
    }else{
        Swal.fire({
            icon: 'error',
            title: response.data.message,
            text: 'An error occurred while sending the message',
        });
    }

        
    } catch (error) {
        console.error(error);
        toast.error('An error occurred while sending the message');
    }
  };

  const handleAttachment = async (e) => {
    try {
      const file = e.target.files[0]; 
      const formDataImage = new FormData();
      formDataImage.append('image', file);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/upload`, formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setAttachment(response.data.imageUrl);
        toast.success('Attachement uploaded successfully');
      } else {
        toast.error('Attachement upload failed');
      }
    } catch (error) {
      console.error('Error uploading Attachement:', error);
      toast.error('An error occurred during the upload');
    }
  };
  const removeAttachment = () => {
    setAttachment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar with user info */}
          <div className="w-full md:w-1/3 bg-indigo-600 p-8 text-white">
            <div className="flex items-center mb-6">
              <img src={user.profilePicture} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
              <div className="ml-4">
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-indigo-200">@{user.username}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2" size={18} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" size={18} />
                <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2" size={18} />
                <span>Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
              </div>
             
            </div>
          </div>

          {/* Right side with message form */}
          <div className="w-full md:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Send Message</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="email"
                  id="recipient"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="recipient@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Message subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <input type="file" id="attachment" className="hidden" onChange={handleAttachment}
                    accept='image/*'
                   />
                  <label htmlFor="attachment" className="cursor-pointer text-indigo-600 hover:text-indigo-500 transition duration-200 flex items-center px-4 py-2 bg-indigo-100 rounded-md hover:bg-indigo-200">
                    <Paperclip className="mr-2" size={18} /> Attach file
                  </label>
                  {attachment && (
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-sm text-gray-600 mr-2"></span>
                      <button onClick={removeAttachment} className="text-red-500 hover:text-red-700">
                        <span className='flex items-center'>Attachement Uploaded <X className="ml-2" size={16} /></span>
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-md py-2 px-6 hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                >
                  <Send className="mr-2" size={18} /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;