import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const EnhancedUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/all-users`);
        if (response.data.success) {
          setUsers(response.data.users);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString().split(',')[0];
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/delete-user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="px-4 py-3 text-center">Profile Picture</th>
              <th className="px-4 py-3 text-center">User Name</th>
              <th className="px-4 py-3 text-center">Email</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">User Status</th>
              <th className="px-4 py-3 text-center">Joined At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-3">Loading...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-3">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-3 flex justify-center">
                      <img className="h-10 w-10 rounded-full " src={user.profilePicture} alt="" />
                  </td>
                  <td className="px-4 py-3 text-gray-800 text-center">{user.username}</td>
                  <td className="px-4 py-3 text-gray-800 text-center">{user.email}</td>
                  <td className="px-4 py-3 text-gray-800 text-center">{user.role}</td>
                  <td className="px-4 py-3 text-gray-800 text-center">{user.status}</td>
                  <td className="px-4 py-3 text-gray-800 text-center">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3 text-center flex items-center gap-4">
                    <Link to={`/dashboard/admin/user/user-management/${user.username}`}  className="text-purple-500 hover:text-purple-600 ">
                      <IoEyeOutline className="h-6 w-6" />
                    </Link>
                    <Link to={`/dashboard/admin/user/user-management/update/${user._id}`} className="text-purple-500 hover:text-purple-600 ">
                      <MdEdit className="h-6 w-6" />
                    </Link>
                    
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnhancedUserManagement;