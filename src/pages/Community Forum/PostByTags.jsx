import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API;

const PostByTags = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const { tag } = useParams();

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/community/posts/tag/${tag}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts by category', error);
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByCategory();
  }, [tag]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-600">Posts in <span className='text-purple-500'>#{tag}</span></h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">No posts found</p>
          <p>There are no posts available in this Tag.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentPosts.map(post => (
              <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2"><Link to={`/community/view-post/${post.slug}`} className="hover:text-purple-600" >{post.title}</Link></h2>
                  <p className="text-gray-600">{post.content.slice(0, 150)}...</p>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center"><Eye size={16} className="mr-1" /> {post.views || 0}</span>
                    <span className="flex items-center"><ThumbsUp size={16} className="mr-1" /> {post.likes}</span>
                    <span className="flex items-center"><MessageSquare size={16} className="mr-1" /> {post.comments?.length || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2 inline" /> Previous
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastPost >= posts.length}
            >
              Next <ChevronRight className="h-4 w-4 ml-2 inline" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostByTags;