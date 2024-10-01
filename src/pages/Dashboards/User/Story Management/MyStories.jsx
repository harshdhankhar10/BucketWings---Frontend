import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/myAllStories`);
        setStories(response.data.stories);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stories. Please try again later.');
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this story!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      });
  
      if (result.isConfirmed) {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/delete/${id}`);
        
        // Ensure the response structure is correct
        if (response.data?.success) {
          await Swal.fire('Deleted!', 'Your story has been deleted.', 'success');
          window.location.reload();
        } else {
          Swal.fire('Error', 'Failed to delete the story.', 'error');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your story is safe :)', 'error');
        
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while deleting the story',
      });
    }
  };
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-8">My Stories</h1>
        
        {stories.length === 0 ? (
          <div className="text-center text-gray-600">
            <Book className="mx-auto h-16 w-16 text-purple-400 mb-4" />
            <p>You haven't created any stories yet. Start writing your first story!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src={story.image || "/api/placeholder/400/200"} alt={story.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{story.title}</h2>
                  <p className="text-gray-600 mb-4">{story.content.substring(0, 100).replace(/<[^>]*>/g, '')}...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(story.dateSubmitted).toLocaleDateString()}</span>
                    <div className="flex space-x-2">
                      <Link 
                        to={`/dashboard/user/view-story/${story._id}`}
                        className="p-1 rounded-full hover:bg-gray-100"
                        title="View Story"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <button 
                        onClick={() => {/* Add edit functionality */}}
                        className="p-1 rounded-full hover:bg-gray-100"
                        title="Edit Story"
                      >
                        <Link to={`/dashboard/user/edit-story/${story._id}`}>
                          <Edit className="h-5 w-5" />
                        </Link>
                      </button>
                      <button 
                        onClick={() => handleDelete(story._id)}
                        className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                        title="Delete Story"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStories;