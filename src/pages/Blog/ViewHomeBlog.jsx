import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/Navbar';
import { Helmet } from 'react-helmet';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

const ViewHomeBlog = () => {
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        const blogResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/slug/${slug}`);
        setBlog(blogResponse.data.blog);
        setRelatedPosts(blogResponse.data.relatedBlogs);

              } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Blog post not found</h1>
        <Link to="/blogs" className="text-blue-500 hover:underline mt-4 inline-block">
          &larr; Back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title}</title>
      </Helmet>
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:w-2/3">
            <Link to="/blogs" className="text-blue-500 hover:underline mb-6 inline-block">
              &larr; Back to all blogs
            </Link>
            
            <article className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="w-full h-64 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={blog.author.profilePicture} 
                    alt={blog.author.fullName} 
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{blog.author.fullName}</p>
                    <p className="text-sm text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                <p className="text-gray-700 text-lg mb-4">{blog.shortDescription}</p>
                
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {blog.category}
                  </span>
                </div>

                <div className="prose max-w-none">
                  {blog.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                    <div className="flex flex-wrap">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Share this post:</h3>
                <div className="flex gap-4">
                    <FacebookShareButton url={window.location.href}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                        Share on Facebook
                    </button>
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href}>
                    <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300">
                        Share on Twitter
                    </button>
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                        Share on Whatsapp
                    </button>
                    </WhatsappShareButton>  
            </div>
          </div>
        </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
              {relatedPosts.map((post) => (
                <Link key={post._id} to={`/blog/${post.slug}`} className="block mb-4 hover:bg-gray-50 transition duration-300">
                  <div className="flex items-center">
                    <img src={post.imageUrl} alt={post.title} className="w-20 h-20 object-cover rounded mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                {/* Replace with actual categories */}
                <li><Link to="/blogs?category=technology" className="text-blue-500 hover:underline">Technology</Link></li>
                <li><Link to="/blogs?category=travel" className="text-blue-500 hover:underline">Travel</Link></li>
                <li><Link to="/blogs?category=food" className="text-blue-500 hover:underline">Food</Link></li>
                <li><Link to="/blogs?category=lifestyle" className="text-blue-500 hover:underline">Lifestyle</Link></li>
              </ul>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHomeBlog;