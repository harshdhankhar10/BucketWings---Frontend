import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminTicketHomepage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/all-support-tickets`);
        if (response.data.success) {
          setTickets(response.data.supportTickets);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleViewTicket = (id) => {
    navigate(`/dashboard/admin/support-ticket/view/${id}`);
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.status === 'Open'  && 
        (filter.priority === '' || ticket.priority === filter.priority)

  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="text-center">
          <div className="loader"></div>
          <p className="text-lg font-semibold">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Latest Support Tickets</h1>
          <div className="flex space-x-4">
            <select
              className="border border-gray-300 rounded px-4 py-2"
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <p className="text-gray-500 text-center">No tickets match the selected filters.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <th className="text-left px-4 py-2">Subject</th>
                  <th className="text-left px-4 py-2">Priority</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Created At</th>
                  <th className="text-center px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{ticket.subject}</td>
                    <td className="px-4 py-2">{ticket.priority}</td>
                    <td className={`px-4 py-2 ${ticket.status === 'Resolved' ? 'text-green-500' : 'text-red-500'}`}>
                      {ticket.status}
                    </td>
                    <td className="px-4 py-2">{new Date(ticket.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleViewTicket(ticket._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTicketHomepage;
