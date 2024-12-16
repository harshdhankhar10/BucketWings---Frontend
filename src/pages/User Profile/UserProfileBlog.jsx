import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { BiLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const UserProfileBlog = ({ blogs }) => {
    const [loadMoreBlogs, setLoadMoreBlogs]  = useState(3);
    const blogsToLoad = blogs.slice(0, loadMoreBlogs);

    
    


  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6 py-8 border-t-2 border-gray-100"
    >
      <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800 ">User Blogs</h2>
      {blogs.length > 3 && (
        <button onClick={() => setLoadMoreBlogs((prev) => prev + 3)}
         className="text-purple-600 hover:text-purple-700 font-medium bg-purple-100 px-4 py-2 rounded-md hover:bg-purple-200 transition-colors">
            Load More
        </button>
      )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsToLoad.map((blog, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
             
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
                <span className="text-sm text-purple-600 font-medium bg-purple-100 px-4 py-1 rounded-full hover:bg-purple-200 transition-colors">
                    <Link to={`/blog/category/${blog.category}`}>{blog.category}</Link>
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-5 text-sm">{blog.shortDescription}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-500">
                  <BiLike className="h-5 w-5 mr-1" />
                  <span>{blog.likes.length}</span>
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  <Link to={`/blog/${blog.slug}`}>Read More</Link>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserProfileBlog;
