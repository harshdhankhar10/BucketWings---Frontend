import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Clock, User, Eye, Heart, Share2 } from 'lucide-react';

const ViewStory = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/view/${id}`);
        setStory(response.data.story);
        setUser(response.data.userInfo);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch the story. Please try again later.');
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

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

  if (!story) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-xl text-gray-700 bg-white p-6 rounded-lg shadow-lg">Story not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="relative">
          <img 
            src={story.image || "/api/placeholder/1200/600"} 
            alt={story.title} 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white leading-tight">{story.title}</h1>
        </div>
        
        <div className="px-6 py-4 bg-gray-100 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {user.fullName}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(story.dateSubmitted).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {story.views || 0} views
            </span>
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {story.likes || 0} likes
            </span>
          </div>
        </div>
        
        <div className="px-6 py-8">
          <div className="prose prose-lg max-w-none">
            {story.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.replace(/<[^>]*>/g, '')}
              </p>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-100 flex justify-between items-center">
        
          <a href="/stories" className="text-purple-600 hover:text-purple-800 transition duration-300">
            Back to Stories
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViewStory;