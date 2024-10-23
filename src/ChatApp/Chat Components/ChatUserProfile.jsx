import React, { useState, useEffect } from 'react';

const ChatUserProfile = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const [users, setUsers] = useState([]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-10 border border-gray-200">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <img
              src={auth.profilePicture}
              alt={auth.fullName}
              className="w-full h-full rounded-full object-cover shadow-md"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{auth.fullName}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
       
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <div className="grid grid-cols-2 gap-8 text-gray-700">
          <div>
            <p className="text-sm font-medium">Username</p>
            <p className="text-lg font-semibold">{auth.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Joined</p>
            <p className="text-lg font-semibold">{formatDate(auth.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-lg font-semibold">{auth.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Unique ID</p>
            <p className="text-lg font-semibold">{auth.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUserProfile;
