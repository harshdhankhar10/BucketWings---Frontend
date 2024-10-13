import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaUser, FaClock, FaCalendar, FaTags, FaFacebook, FaTwitter, FaLinkedin, FaBookmark } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const ViewBlog = () => {
  const [blog, setBlog] = useState(null);
    const { slug } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/slug/${slug}`);
      setBlog(response.data.blog);
    };
    fetchBlog();
  }, [slug]);



  if (!blog) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
   <>
     <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-64 md:h-96">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                {blog.isFeatured && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                <h2 className="text-xl text-gray-600 mb-6 font-light italic">{blog.shortDescription}</h2>

                {/* Metadata */}
                <div className="flex flex-wrap items-center text-gray-500 mb-8 gap-4">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{blog.authorName}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{blog.minutesRead} min read</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBookmark className="mr-2" />
                    <span>{blog.category}</span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.description }} />

                {/* Tags */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <FaTags className="text-gray-400" />
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share buttons */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex space-x-4">
                    <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                      <FaFacebook />
                    </button>
                    <button className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-300">
                      <FaTwitter />
                    </button>
                    <button className="p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors duration-300">
                      <FaLinkedin />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

        
        </div>
        </div>
        </div>
   </>
  );
};

export default ViewBlog;