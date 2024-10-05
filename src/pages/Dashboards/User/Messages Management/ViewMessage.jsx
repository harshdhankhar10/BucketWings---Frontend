import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Paperclip, Reply, Forward, Star, Trash2 } from 'lucide-react';

const ViewMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/messages/message/${id}`
        );
        if (response.data.success) {
          setMessage(response.data.message);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('Error fetching message');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  const handleForward = () => {
    navigate('/dashboard/user/messages/send', {
      state: {
        subject: `Fwd: ${message.subject}`,
        content: `\n\n-------- Forwarded Message --------\nFrom: ${message.senderID.fullName}\nDate: ${new Date(message.sentAt).toLocaleString()}\nSubject: ${message.subject}\n\n${message.content}`
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <Link to="/dashboard/user/messages/inbox" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Return to Inbox
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              to="/dashboard/user/messages/inbox"
              className="text-blue-500 flex items-center hover:underline"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Inbox
            </Link>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-yellow-500 transition duration-300">
                <Star size={20} />
              </button>
              <button className="text-gray-600 hover:text-red-500 transition duration-300">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className="p-6">
            {/* Sender's Details and Avatar */}
            <div className="flex items-center mb-6">
              <img
                src={message.senderID.profilePicture}
                alt="Sender Avatar"
                className="w-16 h-16 rounded-full mr-4 border-2 border-gray-200"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {message.senderID.fullName || 'Unknown Sender'}
                </h2>
                <p className="text-gray-600">{message.senderID.email}</p>
                <p className="text-sm text-gray-500">
                  User ID: {message.senderID._id || 'N/A'}
                </p>
              </div>
            </div>

            {/* Message Subject */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{message.subject}</h1>

            {/* Message Info */}
            <div className="flex items-center justify-between text-gray-600 text-sm mb-6">
              <p>
                Sent on: {new Date(message.sentAt).toLocaleDateString()} at{' '}
                {new Date(message.sentAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Message Content */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-inner">
              <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
            </div>

            {/* Attachments (if any) */}
            {message.attachment && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Attachments:</h2>
                <a
                  href={message.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  <Paperclip className="mr-2" size={18} />
                  View Attachment
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
            
              <button
                onClick={handleForward}
                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                <Forward className="mr-2" size={18} />
                Forward
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMessage;