import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import NavBar from '../../components/Navbar';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
    };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/all`);
        setBlogs(response.data.blogs);
        setFilteredBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(value) ||
      blog.category.toLowerCase().includes(value)
    );
    setFilteredBlogs(filtered);
  };

  const getFeaturedPost = () => {
    return filteredBlogs[0] || null;
  };

  const getCategories = () => {
    const categories = new Set(blogs.map(blog => blog.category));
    return Array.from(categories);
  };

  return (
    <>
      <Helmet>
        <title>Blogs - BucketWings</title>
      </Helmet>
    <NavBar />

      <div className="min-h-screen bg-gray-100">

        {/* Main Content */}
        <div className="max-w-full mx-auto sm:px-6 lg:px-6">
          <div className="px-4 py-6 sm:px-0">

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No blogs found.</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content area */}
                <div className="lg:col-span-2">
                  {/* Featured Post */}
                  {getFeaturedPost() && (
                    <div className="mb-8">
                      
                        <div className="relative pb-60 overflow-hidden rounded-lg shadow-lg">
                          <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src={getFeaturedPost().imageUrl}
                            alt={getFeaturedPost().title}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                          <div className="absolute bottom-0 left-0 p-6">
                            <span className="inline-block px-3 py-1 leading-none bg-indigo-500 text-white rounded-full font-semibold uppercase tracking-wide text-xs">
                              Featured
                            </span>
                            <Link to={`/blog/${getFeaturedPost().slug}`}>
                            <h2 className="text-3xl font-bold text-white mt-2 hover:text-purple-300">{getFeaturedPost().title}</h2>
                            </Link>
                            <p className="text-gray-200 mt-2">{getFeaturedPost().description.substring(0, 150)}...</p>
                            <div className="mt-4 flex items-center">
                              <img
                                className="h-10 w-10 object-cover rounded-full mr-2"
                                src={getFeaturedPost().author.profilePicture}
                                alt={getFeaturedPost().author.fullName}
                              />
                              <div>
                                <p className="font-semibold text-white">{getFeaturedPost().author.fullName}</p>
                                <p className="text-sm text-gray-300">{formatDate(getFeaturedPost().createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  )}

                  {/* Other Posts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBlogs.slice(1).map((blog) => (
                        <div>
                        <div className="relative pb-48 overflow-hidden">
                          <Link to={`/blog/${blog.slug}`}>
                          <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src={blog.imageUrl}
                            alt={blog.title}
                          />
                          </Link>
                        </div>
                        <div className="p-4">
                          <span className="inline-block px-2 py-1 leading-none bg-indigo-200 text-indigo-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                            {blog.category}
                          </span>
                          <Link to={`/blog/${blog.slug}`}>
                          <h2 className="mt-2 mb-2 font-bold hover:text-purple-500">{blog.title}</h2> </Link>
                          <p className="text-sm text-gray-600">{blog.description.substring(0, 100)}...</p>
                          <div className="mt-3 flex items-center">
                            <img
                              className="h-8 w-8 object-cover rounded-full mr-2"
                              src={blog.author.profilePicture}
                              alt={blog.author.fullName}
                            />
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{blog.author.fullName}</p>
                              <p className="text-xs text-gray-600">{formatDate(blog.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="font-bold text-xl mb-4">Categories</h3>
                    <ul>
                      {getCategories().map((category, index) => (
                        <li key={index} className="mb-2">
                          <button
                            onClick={() => handleSearch({ target: { value: category } })}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-xl mb-4">Latest Posts</h3>
                    <ul>
                      {filteredBlogs.slice(0, 5).map((blog) => (
                        <li key={blog._id} className="mb-4">
                          <Link to={`/blog/${blog.slug}`} className="flex items-center">
                            <img
                              className="h-12 w-12 object-cover rounded mr-3"
                              src={blog.imageUrl}
                              alt={blog.title}
                            />
                            <div>
                              <h4 className="font-semibold text-sm">{blog.title}</h4>
                              <p className="text-xs text-gray-600">{formatDate(blog.createdAt)}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;