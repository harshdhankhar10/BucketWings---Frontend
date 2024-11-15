import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdArrowBackIosNew } from "react-icons/md";


const AdminViewUserInfo = () => {
  const params = useParams();
  const username = params.username;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/users/${username}`
        );
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
      <div className=" w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
         <div className='flex justify-between items-center' >
         <h2 className="text-2xl font-bold text-gray-800 mb-6">User Information</h2>   
         <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -mt-8 flex items-center gap-1' onClick={() => window.history.back()}>
          <MdArrowBackIosNew />  Go Back
        </button>
         </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-200 mr-6"
              />
              <div>
                <p className="text-lg font-medium text-gray-800">{user.fullName || 'N/A'}</p>
                <p className="text-gray-600">{user.username || 'N/A'}</p>
                <p className="text-gray-600">{user.email || 'N/A'}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Bio:</span> {user.bio || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Date of Birth:</span>{' '}
                {new Date(user.dateOfBirth).toLocaleDateString() || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Status:</span> {user.status || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Role:</span> {user.role || 'N/A'}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Social Links</h3>
            <ul className="list-disc list-inside text-gray-600">
              {Object.entries(user.socialLinks || {}).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium capitalize">{key}:</span>{' '}
                  {value ? (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Information</h3>
            <p className="text-gray-600">
              <span className="font-medium">Phone Number:</span> {user.phoneNumber || 'N/A'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Location:</span> {user.location || 'N/A'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Website:</span>{' '}
              {user.website ? (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {user.website}
                </a>
              ) : (
                'N/A'
              )}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Followers</h3>
            <ul className="list-disc list-inside text-gray-600">
              {user.followers && user.followers.length > 0
                ?  user.followers.map((follower, index) => (
                    <li key={index}><span className='text-gray-700 font-semibold'>User Id : </span>{follower}</li>
                  ))
                : 'No followers'}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Account Details</h3>
            <p className="text-gray-600">
              <span className="font-medium">Created At:</span>{' '}
              {new Date(user.createdAt).toLocaleString() || 'N/A'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Last Login:</span>{' '}
              {new Date(user.lastLogin).toLocaleString() || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewUserInfo;