import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateProfile = () => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user || {});
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: '',
    email: '',
    phoneNumber: '',
    location: '',
    website: '',
    occupation: '',
    dateOfBirth: '',
    profilePicture: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      instagram: ''
    }
  });
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/users/${auth.username}`);
      const userData = response.data.user;
      setUser(userData);
      setFormData({
        ...formData,
        ...userData,
        dateOfBirth: formatDateForInput(userData.dateOfBirth)
      });
      setImagePreview(userData.profilePicture);
    } catch (error) {
      setError('Failed to fetch user data');
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    const formDataImage = new FormData();
    formDataImage.append('image', file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/upload`,
        formDataImage,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );
      
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          profilePicture: response.data.imageUrl
        }));
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
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/users/update`,
        formData
      );
      if (response.data.success) {
        setSuccess('Profile updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/mail/sendVerificationEmail`,
        { email: formData.email }
      );
      if (response.data.success) {
        setShowModal(true);
        Swal.fire({
          icon: 'success',
          title: 'Verification Code Sent Successfully',
          text: 'Please check your email for the verification code'
        });
      }
    } catch (error) {
      setError('Failed to send verification email');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/mail/verifyEmail`,
        { otp, email: formData.email }
      );
      if (response.data.success) {
        setShowModal(false);
        setSuccess('Email verified successfully');
        Swal.fire({
          icon: 'success',
          title: 'Email Verified Successfully',
          text: 'Your email has been verified successfully'
        });
        fetchUserInfo();
        window.location.reload();
      }
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
        activeTab === tab
          ? 'bg-purple-600 text-white'
          : 'text-gray-600 hover:bg-purple-100'
      }`}
    >
      {label}
    </button>
  );

  const renderBasicInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled
        />
        <Input
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-4">
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <Input
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
        />
        <Input
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  const renderSocialLinks = () => (
    <div className="space-y-4">
      <Input
        label="Twitter Profile"
        name="socialLinks.twitter"
        value={formData.socialLinks?.twitter}
        onChange={handleInputChange}
        icon={
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        }
      />
      <Input
        label="LinkedIn Profile"
        name="socialLinks.linkedin"
        value={formData.socialLinks?.linkedin}
        onChange={handleInputChange}
        icon={
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        }
      />
      <Input
        label="GitHub Profile"
        name="socialLinks.github"
        value={formData.socialLinks?.github}
        onChange={handleInputChange}
        icon={
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        }
      />
      <Input
        label="Instagram Profile"
        name="socialLinks.instagram"
        value={formData.socialLinks?.instagram}
        onChange={handleInputChange}
        icon={
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.266.07-1.646.07-4.85s-.015-3.585-.074-4.85c-.061-1.17-.256-1.805-.421-2.227-.224-.562-.479-.96-.899-1.382-.419-.419-.824-.679-1.38-.896-.42-.164-1.065-.36-2.235-.413-1.274-.057-1.649-.07-4.859-.07-3.211 0-3.586.015-4.859.074-1.171.061-1.816.256-2.236.421-.569.224-.96.479-1.379.899-.421.419-.69.824-.9 1.38-.165.42-.359 1.065-.42 2.235-.045 1.27-.06 1.646-.06 4.859s.016 3.589.061 4.861c.061 1.17.255 1.814.42 2.234.21.57.479.96.9 1.381.419.419.81.689 1.379.898.42.166 1.051.361 2.221.421 1.275.045 1.65.06 4.859.06l.045-.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
          </svg>
        }
      />
    </div>
  );

  const renderBioSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  );

  const Input = ({ label, name, value, onChange, type = "text", icon, disabled = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-lg shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-3 py-2 
            ${icon ? 'pl-10' : ''}
            border border-gray-300 rounded-lg shadow-sm
            focus:ring-2 focus:ring-purple-500 focus:border-transparent
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/30 group-hover:ring-white/50 transition-all duration-300">
                  <img
                    src={imagePreview || '/default-avatar.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">
                  {formData.fullName || 'Update Your Profile'}
                </h1>
                <p className="mt-2 text-purple-100">
                  {user.isVerified ? (
                    <span className="flex items-center justify-center md:justify-start">
                      <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified Account
                    </span>
                  ) : (
                    <button
                      onClick={handleVerifyEmail}
                      className="text-sm bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full transition-colors duration-300"
                    >
                      Verify Email
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="px-8 flex space-x-4 py-2">
              <TabButton tab="basic" label="Basic Info" />
              <TabButton tab="social" label="Social Links" />
              <TabButton tab="bio" label="Bio" />
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {activeTab === 'basic' && renderBasicInfo()}
              {activeTab === 'social' && renderSocialLinks()}
              {activeTab === 'bio' && renderBioSection()}

              {/* Status Messages */}
              {(error || success) && (
                <div className={`p-4 rounded-lg ${error ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {error || success}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    px-6 py-3 bg-purple-600 text-white rounded-lg
                    transform transition-all duration-300
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 hover:scale-105'}
                  `}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Member Since"
            value={new Date(user.createdAt).toLocaleDateString()}
            icon={
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          <StatsCard
            title="Status"
            value={user.status || 'Active'}
            icon={
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Last Updated"
            value={new Date(user.updatedAt).toLocaleDateString()}
            icon={
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Profile Completion"
            value={calculateProfileCompletion(formData) + '%'}
            icon={
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Enter Verification Code</h3>
            <p className="text-gray-600 mb-6">
              Please enter the verification code sent to your email
            </p>
            <div className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter OTP"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleOtpSubmit}
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Verify
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatsCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-gray-50 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const calculateProfileCompletion = (formData) => {
  const fields = Object.keys(formData).filter(key => {
    if (typeof formData[key] === '') {
      return Object.keys(formData[key]).some(k => !!formData[key][k]);
    }
    return !!formData[key];
  });
  return ((fields.length / 100) * 100).toFixed(2);
}

export default UpdateProfile;
