import React, { useEffect, useState } from 'react';
import { PlusCircle, Filter, Heart, MessageCircle, Share2, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const CommunityHome = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const userId = user?.id;

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/all-posts`);
        const updatedPosts = response.data.posts.map(post => ({
          ...post,
          hasLiked: post.likes.includes(userId) 
        }));
        setPosts(updatedPosts);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchAllPosts();
  }, []);

  const handleLikePost = (id, hasLiked) => async () => {
    try {
      if(!user) {
        return toast.error("Please login to like/unlike posts");
      }
      
      const endpoint = hasLiked 
        ? `${import.meta.env.VITE_REACT_APP_API}/api/v1/community/unlike/${id}`
        : `${import.meta.env.VITE_REACT_APP_API}/api/v1/community/like/${id}`;

      const response = await axios.put(endpoint);
  
      if (response.data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === id) {
              const updatedLikes = hasLiked
                ? post.likes.filter(userId => userId !== response.data.userId)
                : [...post.likes, response.data.userId];
              return { 
                ...post, 
                likes: updatedLikes, 
                likeCount: updatedLikes.length, 
                hasLiked: !hasLiked
              };
            }
            return post;
          })
        );
      }
    } catch (error) {
      console.error("Error liking/unliking post", error);
    }
  };

  const LikeButton = ({ post, onClick }) => (
    <motion.button
      onClick={onClick}
      className={`flex items-center space-x-2 transition duration-300 ${
        post.hasLiked ? 'text-red-600' : 'text-gray-500 hover:text-purple-600'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: post.hasLiked ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart size={16} fill={post.hasLiked ? "currentColor" : "none"} />
      </motion.div>
      <span>{post.likes.length} {post.likes.length == 1 ? 'Likes' : 'Likes'}
      </span>
    </motion.button>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Community Forum</h1>
        <Link to="/community/create-post">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition duration-300 shadow-md">
            <PlusCircle size={18} />
            <span>New Post</span>
          </button>
        </Link>
      </div>
      <div className="flex space-x-4 mb-6">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300">
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={post.author.profilePicture}
                alt="User Avatar"
                className="rounded-full h-10 w-10"
              />
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  <Link to={`/community/user/${post.author.username}`} className="hover:text-purple-600">
                    {post.author.fullName}
                  </Link>
                </h4>
                <p className="text-sm text-gray-500">
                  Posted in{' '}
                  <Link to={`/community/category/${post.category}`} className="text-purple-600 hover:underline">
                    {post.category}
                  </Link>
                </p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                {post.isActive && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
                <Star className="text-yellow-400" size={18} />
              </div>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800">
              <Link to={`/community/view-post/${post.slug}`} className="hover:text-purple-600">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 250)}...</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  <Link to={`/community/tag/${tag}`} className="hover:underline">
                    #{tag}
                  </Link>
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-6">
                <LikeButton post={post} onClick={handleLikePost(post._id, post.hasLiked)} /> 
                <button className="flex items-center space-x-2 hover:text-purple-600 transition duration-300">
                  <MessageCircle size={16} />
                  <span>{post.messages.length} Replies</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-purple-600 transition duration-300">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="text-yellow-500" size={16} />
                <span>{post.views} Views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition duration-300">
          Load More Discussions
        </button>
      </div>
    </div>
  );
};

export default CommunityHome;
