import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useLocation, useNavigate} from 'react-router-dom';
import { FaSearch, FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/user/blogs`);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredBlogs = currentBlogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? blog.category === filterCategory : true)
    );
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (blog) => {
    navigate(`/dashboard/user/blog/update-blog/${blog._id}`, {
      state: { blog },
    });
  };
  
  const handleDelete = (blogId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this blog!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/delete/${blogId}`);
          setBlogs(blogs.filter((blog) => blog._id !== blogId));
          Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting blog:', error);
          Swal.fire('Error!', 'An error occurred while deleting the blog.', 'error');
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">My Blogs</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>

          <select
            className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {blogs.map((blog) => (
              <option key={blog._id} value={blog.category}>
                {blog.category}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <BiLoaderAlt className="animate-spin w-16 h-16 text-purple-600" />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                 
                  <img
                    src={blog.imageUrl || '/api/placeholder/400/200'}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                    {blog.isFeatured && (
                    <div className="absolute top-4 left-4 bg-purple-600 text-white font-medium px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-purple-800">
                      <Link to={`/dashboard/user/blog/view-blog/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                    <p className="text-gray-600 mb-4">{blog.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold`}
                      >
                        {blog.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-purple-600">{blog.category}</span>
                      <div className="flex space-x-2">
                      <button onClick={()=> handleEdit(blog)}
                          className="text-indigo-600 hover:text-indigo-800"
                          title="Edit">
                          <FaEdit />
                      </button>
                       <button>
                       <Link
                          to={`/dashboard/user/blog/view-blog/${blog.slug}`}
                          className="text-green-600 hover:text-green-800"
                          title="View"
                        >
                          <FaEye />
                        </Link>
                       </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {filteredBlogs.length === 0 && !loading && (
          <motion.p
            className="text-center text-gray-600 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No blogs found.
          </motion.p>
        )}

        <motion.div
          className="flex justify-center items-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-purple-200'
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyBlogs;