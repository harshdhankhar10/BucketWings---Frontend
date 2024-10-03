import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Paperclip, Flag, CheckSquare } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    dueDate: '',
    attachment: null,
    assignedTo: ''
  });
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/task/${id}`);
        if (response.data.success) {
          setFormData(response.data.task);
          if (response.data.task.attachment) {
            setImagePreview(response.data.task.attachment);
          }
        }
      } catch (error) {
        setError('Failed to fetch task');
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

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
        setFormData(prevData => ({
          ...prevData,
          attachment: response.data.imageUrl
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
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/update/${id}`, formData);
      if (response.data.success) {
        Swal.fire({
          title: 'Task Updated',
          text: 'Task has been updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      setError('Failed to update task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold mb-1">Update Task</div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assigned To</label>
                <input
                  type="text"
                  name="assignedTo"
                  id="assignedTo"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.assignedTo}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CheckSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="status"
                    id="status"
                    required
                    className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Flag className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="priority"
                    id="priority"
                    required
                    className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    required
                    className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">Attachment</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    name="attachment"
                    id="attachment"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept='image/*'
                  />
                  <label
                    htmlFor="attachment"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                  >
                    <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Paperclip className="h-5 w-5 mr-2 text-gray-400" />
                      Upload Image
                    </span>
                  </label>
                </div>
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="Preview" className="h-24 w-24 object-cover rounded-md" />
                  </div>
                )}
                {uploadProgress > 0 && (
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-purple-500 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-600">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;