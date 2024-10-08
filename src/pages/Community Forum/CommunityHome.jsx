import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Filter, Heart, MessageCircle, Share2, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";

const CommunityHome = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/all-posts`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchAllPosts();
  }, []);

  const handleLikePost = (postId) => async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/like-post/${postId}`);
      if (response.data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, likes: [...post.likes, response.data.userId]}
            : post
          )
        );
      }
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

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
                src={`${post.author.profilePicture}`}
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
                <button
                  onClick={handleLikePost(post._id)}
                  className="flex items-center space-x-2 hover:text-purple-600 transition duration-300"
                >
                  <Heart size={16} />
                  <span>{post.likes} Likes</span>
                </button>
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
