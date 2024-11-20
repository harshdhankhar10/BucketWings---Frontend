import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ClockIcon, TagIcon, InfoIcon } from 'lucide-react';
import { LuPaperclip as PaperClipIcon } from "react-icons/lu";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const StatusBadge = ({ status }) => {
  const statusColors = {
    'Open': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Pending': 'bg-blue-100 text-blue-800',
    'Closed': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const ViewSupportTicket = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/ticket/${id}`);
        if (response.data.success) {
          setTicket(response.data.supportTicket);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.response?.data?.message || 'An error occurred while fetching the ticket details.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl text-red-500 font-semibold mb-4">Ticket Not Found</p>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Ticket #{ticket.ticketId}</h1>
            <p className="text-blue-100 mt-1">Details of your support request</p>
          </div>
          <StatusBadge status={ticket.status} />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <TagIcon className="mr-2 text-blue-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Subject</h2>
              </div>
              <p className="text-gray-600">{ticket.subject}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <ClockIcon className="mr-2 text-blue-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Priority</h2>
              </div>
              <p className="text-gray-600">{ticket.priority}</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <InfoIcon className="mr-2 text-blue-500" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Message</h2>
            </div>
            <p className="text-gray-600">{ticket.message}</p>
          </div>

          {ticket.attachment && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <PaperClipIcon className="mr-2 text-blue-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Attachment</h2>
              </div>
              <a 
                href={ticket.attachment} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                View Attachment
              </a>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Created At</h3>
              <p className="text-gray-700">{new Date(ticket.createdAt).toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Last Updated</h3>
              <p className="text-gray-700">{new Date(ticket.updatedAt).toLocaleString()}</p>
            </div>
          </div>

          {ticket.response && (
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Admin Response</h2>
              <p className="text-gray-600">{ticket.response}</p>
              <p className="text-sm text-gray-500 mt-2">
                Responded on {new Date(ticket.responseDate).toLocaleString()}
              </p>
            </div>
          )}

          {!ticket.response && (
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 text-center">
              <p className="text-yellow-700">Awaiting admin response</p>
            </div>
          )}
        </div>

        <div className="bg-gray-100 p-6 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeftIcon className="mr-2" size={20} />
            Back to Ticket List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSupportTicket;