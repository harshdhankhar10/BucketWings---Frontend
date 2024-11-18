import React, {useState, useEffect} from 'react';
import axios from 'axios';

const LatestUserRegistrations = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => { 
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/all-users`
      );
      setUsers(response.data.users);
    };
    fetchUsers();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Latest User Registrations</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-purple-500 text-white">
              <th className="px-4 py-3 text-left">Profile</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Registered At</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Full Name</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 5).map((user, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-200 transition-colors duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="px-4 py-3">
                  <img src={user.profilePicture} alt={user.fullName} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{user.username}</td>
                <td className="px-4 py-3 text-gray-700">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-gray-700">{user.fullName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestUserRegistrations;