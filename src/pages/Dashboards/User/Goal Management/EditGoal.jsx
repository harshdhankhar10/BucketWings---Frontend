import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Calendar, Image as ImageIcon, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const EditGoal = () => {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/info/${id}`);
        setGoal(response.data.goal);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch goal. Please try again later.');
        setLoading(false);
      }
    };
    fetchGoal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal(prevState => ({
      ...prevState,
      [name]: value
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
        setGoal((prevState) => ({
          ...prevState,
          image: response.data.imageUrl,
        }));
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
     const response =  await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/update/${id}`, 
        goal
        
      )
        if (response.data.success) {
            Swal.fire({
                title: 'Goal updated successfully',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                navigate(`/dashboard/user/view-goal/${id}`);
            }, 2500);
            } else {
                Swal.fire({
                    title: 'An error occurred',
                    text: response.data.message,
                    icon: 'error',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }

    } catch (err) {
      setError('Failed to update goal. Please try again.');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  if (!goal) return <div className="flex justify-center items-center h-screen">Goal not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Goal</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={goal.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                rows="3"
                value={goal.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                value={goal.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={goal.deadline.split('T')[0]}
                  onChange={handleChange}
                  className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  {goal.image ? (
                    <img src={goal.image} alt="Goal" className="h-full w-full object-cover" />
                  ) : (
                    <ImageIcon className="h-full w-full text-gray-300" />
                  )}
                </span>
                <label
                  htmlFor="image-upload"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <span>Change</span>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progress</label>
              <input
                type="range"
                name="progress"
                id="progress"
                min="0"
                max="100"
                value={goal.progress}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
              <div className="text-center mt-2">{goal.progress}%</div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/dashboard/user/view-goal/${id}`)}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;
