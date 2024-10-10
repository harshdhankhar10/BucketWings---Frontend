import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import moment from 'moment';

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/post/${slug}`);
        setPost(response.data.post);
      } catch (error) {
        console.error('Error fetching the post', error);
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Post Header */}
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-600">By {post.author.fullName}</p>
          <p className="text-gray-500 text-sm">{moment(post.createdAt).format('MMMM Do YYYY')}</p>
        </div>
      </header>

      {/* Post Content */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 text-sm text-gray-500">
          <button className="flex items-center space-x-1 hover:text-blue-600 transition duration-300">
            <Heart size={18} className="text-red-500" />
            <span>{post.likes.length}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600 transition duration-300">
            <MessageCircle size={18} />
            <span>{post.messages.length} Comments</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600 transition duration-300">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
        {post.messages.length > 0 ? (
          post.messages.map((message, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700">{message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
