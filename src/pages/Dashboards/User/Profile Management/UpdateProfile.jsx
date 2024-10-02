import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')).user);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Utility function to format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Utility function to format date for server submission
  const formatDateForServer = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString();
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/users/${auth.username}`);
        setUser(response.data.user);
        setFullName(response.data.user.fullName);
        setUsername(response.data.user.username);
        setBio(response.data.user.bio);
        setDateOfBirth(formatDateForInput(response.data.user.dateOfBirth));
        setImagePreview(response.data.user.profilePicture);
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };
    fetchUserInfo();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    const formDataImage = new FormData();
    formDataImage.append('image', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/upload`, formDataImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      if (response.data.success) {
        setProfilePicture(response.data.imageUrl);
        setSuccess('Image uploaded successfully');
        setTimeout(() => setUploadProgress(0), 1000);
      }
    } catch (error) {
      setError('Failed to upload image');
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/users/update`, {
        fullName,
        username,
        bio,
        profilePicture,
        dateOfBirth: formatDateForServer(dateOfBirth)
      });
      if (response.data.success) {
        setSuccess('Profile updated successfully');
      }
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
          <h1 className="text-4xl font-bold">Update Your Profile</h1>
          <p className="mt-2 text-purple-100">Customize your information and make your profile stand out</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea 
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input 
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 mb-4 ring-4 ring-purple-500 ring-opacity-50">
                    <img 
                      src={imagePreview || '/placeholder-avatar.png'} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label htmlFor="profilePicture" className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300">
                    Upload New Picture
                    <input 
                      id="profilePicture"
                      type="file"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  {uploadProgress > 0 && (
                    <div className="w-full mt-4">
                      <div className="bg-purple-200 rounded-full h-2.5">
                        <div 
                          className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 text-center">{uploadProgress}% uploaded</p>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2 text-sm text-gray-600">
                  <p><span className="font-semibold">Email:</span> {user.email}</p>
                  <p><span className="font-semibold">Status:</span> {user.status}</p>
                  <p><span className="font-semibold">Verified:</span> {user.isVerified ? 'Yes' : 'No'}</p>
                  <p><span className="font-semibold">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Last Updated:</span> {new Date(user.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                <p className="text-green-700">{success}</p>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;