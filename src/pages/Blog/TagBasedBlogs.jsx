import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, User, Eye, Heart, ArrowLeft } from 'lucide-react';
import NavBar from '../../components/Navbar';

const TagBasedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tag } = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/all/tag/${tag}`);
        setBlogs(response.data.blogs || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [tag]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${tag} Blogs - BucketWings`}</title>
      </Helmet>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            <span className='text-purple-500'>#{tag}</span> Blogs
          </h1>
          <Link to="/blogs" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Blogs
          </Link>
        </div>
        
        {blogs.length === 0 ? (
          <p className="text-xl text-gray-600">No blogs found in this Tag.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <Link to={`/blog/${blog.slug}`}>
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-6">
                  <Link to={`/blog/${blog.slug}`}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                      {blog.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.shortDescription}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{blog.author.fullName}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {blog.views}
                      </span>
                      <span className="flex items-center text-gray-500">
                        <Heart className="w-4 h-4 mr-1" />
                        {blog.likes.length}
                      </span>
                    </div>
                    <Link 
                      to={`/blog/${blog.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      Read More
                    </Link>
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

export default TagBasedBlogs;