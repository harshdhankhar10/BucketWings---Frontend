import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState({
    title: '',
    content: '',
    image: '',
    isPublic: false
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/view/${id}`);
        setStory(response.data.story);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch the story. Please try again later.');
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStory(prevStory => ({
      ...prevStory,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formDataImage = new FormData();
      formDataImage.append('image', file);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/upload`, formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setStory((prevState) => ({
          ...prevState,
          image: response.data.imageUrl,
        }));
        setImagePreview(response.data.imageUrl);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('An error occurred during the upload');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/update/${id}`, story);
      if(response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        setTimeout(() => {
          navigate(`/dashboard/user/myStories`);
        }, 1000);
      }
    } catch (err) {
      setError('Failed to update the story. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-2xl font-semibold text-purple-700">Loading story...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-xl text-red-500 bg-white p-6 rounded-lg shadow-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Edit Your Story</h2>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={story.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={story.content.replace(/<[^>]*>/g, '')}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <label className="cursor-pointer bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <ImageIcon className="h-5 w-5 mr-2 inline-block" />
                Choose Image
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Story"
                  className="h-12 w-12 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={story.isPublic}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
              Make this story public
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/stories/${id}`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <X className="h-5 w-5 mr-2" /> Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Save className="h-5 w-5 mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStory;
