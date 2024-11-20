import React, { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import axios from 'axios';
import {Link} from "react-router-dom"


const SupportTicketHome = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

//   const tickets = [
//     {
//       id: '001',
//       subject: 'Payment not processing',
//       user: 'John Doe',
//       status: 'Open',
//       priority: 'High',
//       createdAt: '2024-11-18',
//     },
//     {
//       id: '002',
//       subject: 'Unable to reset password',
//       user: 'Jane Smith',
//       status: 'In Progress',
//       priority: 'Medium',
//       createdAt: '2024-11-17',
//     },
//     {
//       id: '003',
//       subject: 'Refund for order #1234',
//       user: 'Michael Lee',
//       status: 'Closed',
//       priority: 'Low',
//       createdAt: '2024-11-16',
//     },
//   ];

useEffect(()=>{
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/my-support-tickets`);
        setTickets(response.data.supportTickets);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    fetchTickets();
}, [])

const formDate = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.user.toLowerCase().includes(search.toLowerCase()) ||
        ticket.ticketId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">Support Tickets</h1>
          <p className="text-white text-opacity-80 mt-2">
            Manage your support tickets efficiently with our streamlined dashboard.
          </p>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 border-b">
          <div className="relative w-full md:w-2/5">
            <input
              type="text"
              placeholder="Search tickets by subject or user..."
              className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <HiSearch className="absolute top-1/2 left-4 text-gray-400 transform -translate-y-1/2" size={20} />
          </div>
          <select
            className="w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="p-6 max-h-96 overflow-y-scroll">
          <table className="w-full table-auto border-collapse bg-white rounded-lg shadow-lg ">
            <thead>
              <tr className="bg-blue-100 text-gray-800">
                <th className="py-4 px-6 text-left font-medium">Ticket ID</th>
                <th className="py-4 px-6 text-left font-medium">Subject</th>
                <th className="py-4 px-6 text-center font-medium">Status</th>
                <th className="py-4 px-6 text-center font-medium">Priority</th>
                <th className="py-4 px-6 text-center font-medium">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="py-4 px-6 border-b">{ticket.ticketId}</td>
                   <Link className='hover:text-purple-500' to={`/dashboard/user/support-ticket/view/${ticket._id}`} >
                   <td className="py-4 px-6 border-b">{ticket.subject.substring(0, 50)}{ticket.subject.length > 50 ? '...' : ''}</td>
                   </Link>
                    <td className="py-4 px-6 border-b text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          ticket.status === 'Open'
                            ? 'bg-green-100 text-green-600'
                            : ticket.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          ticket.priority === 'High'
                            ? 'bg-red-100 text-red-600'
                            : ticket.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b text-center">{formDate(ticket.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-4 px-6 border-b text-center text-gray-500"
                  >
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
      </div>
    </div>
  );
};

export default SupportTicketHome;
