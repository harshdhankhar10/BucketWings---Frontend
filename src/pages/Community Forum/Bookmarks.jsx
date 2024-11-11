import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PlusCircle, Filter, Heart, MessageCircle, Share2, Star, Zap } from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion'
import { toast } from 'react-toastify';
import { MdBookmarkAdded } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";


const Bookmarks = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth'))?.user);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('auth'))) {
      window.location.href = '/community';
    }
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/all-posts`);
        const updatedPosts = response.data.posts.filter(post => post.bookmarks.includes(user.id));
        setPosts(updatedPosts);
      } catch (error) {
        console.error('Error fetching bookmarks', error);
      }
      setLoading(false);
    };

    fetchBookmarks();
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
      toast.error(error.response.data.message);
    }
  };

  const handleUnBookmarkPost = async (postId) => {
    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/unbookmark-post/${postId}`);
      if (response.data.success) {
        toast.success('Post unbookmarked successfully');
        setPosts(posts.filter(post => post._id !== postId));
      }
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.error('Error bookmarking post', error);
      toast.error(error.response.data.message);    }
  }



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
      <span>{post.likes.length} {post.likes.length == 1 ? 'Like' : 'Likes'}</span>
    </motion.button>
  );

  return (
    <>
    <Helmet>
      <title>Bookmarks - Community Forum | BucketWing</title>
    </Helmet>

    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Bookmarks</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-xl">Loading bookmarks...</p>
        </div>
      ) : (
        <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div className="flex items-center space-x-4">
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
              </div>
              <div className="sm:ml-auto flex items-center space-x-2">
                {post.isActive && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
                <Star className={`${post.bookmarks.includes(user.id) ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-600 transition duration-300`} size={16} />

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

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-500">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <LikeButton post={post} onClick={handleLikePost(post._id, post.hasLiked)} />
                <button className="flex items-center space-x-2 hover:text-purple-600 transition duration-300">
                  <MessageCircle size={16} />
                  <span>{post.messages.length} Comments</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-600 transition duration-300" onClick={() => handleUnBookmarkPost(post._id)}>
                  {post?.bookmarks?.includes(user?.id) ? <MdBookmarkAdded size={20} className="text-purple-600" /> : <FaRegBookmark size={20} className="text-purple-600" />}
              <span>{loading ? "Saving..." : `${post?.bookmarks?.includes(user?.id) ? "Bookmarked" : "Bookmark"}`}</span>
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
      )}
    </div>


    </>
  )
}

export default Bookmarks