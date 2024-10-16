import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const UpdateAchieveMent = () => {
  const { id } = useParams();
  const location = useLocation();
  const achievements = location.state.achievement;
  const navigate = useNavigate();
  const [title, setTitle] = useState(achievements.title || '');
  const [description, setDescription] = useState(achievements.description || '');
  const [category, setCategory] = useState(achievements.category || '');
  const [tags, setTags] = useState(achievements.tags || []);
  const [currentTag, setCurrentTag] = useState('');
  const [dateOfAchievement, setDateOfAchievement] = useState(achievements.dateOfAchievement || '');
  const [status, setStatus] = useState(achievements.status || 'public');
  const [media, setMedia] = useState(null);
  const [imagePreview, setImagePreview] = useState(achievements.media || null);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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
        setMedia(response.data.imageUrl);
        setImagePreview(URL.createObjectURL(file)); 
        toast.success('Media uploaded successfully');
      } else {
        toast.error('Media upload failed');
      }
    } catch (error) {
      console.error('Error uploading Media:', error);
      toast.error('An error occurred during the upload');
    }
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/update/${id}`, {
        title,
        description,
        category,
        tags,
        dateOfAchievement,
        status,
        media,
      })
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Achievement Updated successfully!',
        });
        navigate('/dashboard/user/achievement/all');
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
        });
      }
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Showcase Your Achievement</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex items-center">
              <input
                type="text"
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 text-blue-500 hover:bg-blue-300 focus:outline-none transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="dateOfAchievement" className="block text-sm font-medium text-gray-700 mb-1">Date of Achievement</label>
            <input
              type="date"
              id="dateOfAchievement"
              value={dateOfAchievement}
              onChange={(e) => setDateOfAchievement(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="media" className="block text-sm font-medium text-gray-700 mb-1">Media (Images only)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="media" className=" relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span >Upload a file</span>
                    <input
                      id="media"
                      name="media"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e) }
                      className="sr-only"
                    />
                  </label>
                  <span className="pl-1 text-gray-500">or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Media Preview" className="w-full h-48 object-cover rounded-md" />
            </div>
          )}

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Create Achievement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAchieveMent;