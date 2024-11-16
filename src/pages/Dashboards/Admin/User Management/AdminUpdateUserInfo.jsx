import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Save, 
  ArrowLeft, 
  Trash2, 
  AlertCircle,
  Loader2,
  CheckCircle2,
  X
} from 'lucide-react';
import Swal from 'sweetalert2';

const AdminUpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    bio: '',
    role: '',
    status: '',
    phoneNumber: '',
    location: '',
    website: '',
    dateOfBirth: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      instagram: ''
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/users/complete-user-info/${id}`
        );
        if (response.data.success) {
          const userData = response.data.user;
          setFormData({
            ...userData,
            dateOfBirth: userData.dateOfBirth ? 
              new Date(userData.dateOfBirth).toISOString().split('T')[0] : '',
            socialLinks: {
              twitter: userData.socialLinks?.twitter || '',
              linkedin: userData.socialLinks?.linkedin || '',
              github: userData.socialLinks?.github || '',
              instagram: userData.socialLinks?.instagram || ''
            }
          });
          
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/users/update-complete-profile/${id}`,
        formData
      );
      
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'User Updated',
          text: 'User information has been updated successfully',
          showConfirmButton: true,
          confirmButtonText: 'Close'
        });
      }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.message,
            showConfirmButton: true,
            confirmButtonText: 'Close'
            });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const platform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const FormField = ({ label, name, type = 'text', error, ...props }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
          ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Update User Profile</h1>
        </div>

    
     

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
              <FormField 
                label="Full Name"
                name="fullName"
                placeholder="Enter full name"
                error={errors.fullName}
                required
              />
              <FormField 
                label="Username"
                name="username"
                placeholder="Enter username"
                error={errors.username}
                required
              />
              <FormField 
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
                error={errors.email}
                required
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter bio"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h2>
              <FormField 
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter phone number"
              />
              <FormField 
                label="Location"
                name="location"
                placeholder="Enter location"
              />
              <FormField 
                label="Website"
                name="website"
                placeholder="Enter website URL"
                error={errors.website}
              />
              <FormField 
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
              />
            </div>

            {/* Account Status */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Status</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Links</h2>
              {Object.keys(formData.socialLinks).map((platform) => (
                <FormField 
                  key={platform}
                  label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  name={`socialLinks.${platform}`}
                  value={formData.socialLinks[platform]}
                  placeholder={`Enter ${platform} URL`}
                  error={errors[`socialLinks.${platform}`]}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateUser;