import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/my-posts`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);

  const handleEdit = (postId) => {
    // Handle edit functionality here
    console.log(`Edit post with ID: ${postId}`);
  };

  const handleDelete = async (postId) => {
    // Handle delete functionality here
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/post/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      alert('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  return (
   <>
   <Helmet>
        <title>My Posts - Community Forum | BucketWings</title>
   </Helmet>
      <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">You have not created any posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 hover:text-purple-500"><Link to={`/community/view-post/${post.slug}`}>
              {post.title}</Link></h2>
              <p className="text-gray-600 mt-1">{post.content.slice(0, 150)}...</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-500 text-sm">{moment(post.createdAt).format('MMMM Do YYYY')}</span>
                <div className="flex space-x-2">
                
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    <Trash className="inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
   </>
  );
};

export default MyPosts;
