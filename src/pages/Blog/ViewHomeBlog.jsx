import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { Heart, Share2, Calendar, Tag, User, Facebook, Twitter, MessageCircle, Eye, ThumbsUp, Bookmark } from 'lucide-react';
import { toast } from 'react-toastify';
import NavBar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

const ViewHomeBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const { slug } = useParams();
  const [auth, setAuth] = useAuth();  // eslint-disable-line no-unused-vars
  const navigate = useNavigate();
  const postType = "Blog";

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        const blogResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/slug/${slug}`);
        setBlog(blogResponse.data.blog);
        setRelatedPosts(blogResponse.data.relatedBlogs);
        setLiked(blogResponse.data.blog.likes.includes(localStorage.getItem('userId')));
        setLikeCount(blogResponse.data.blog.likes.length);
        } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [slug]);

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


  const handleLikePost = async () => {
    if (!localStorage.getItem('auth')) {
      toast.error("Please login to like/unlike posts");
      return;
    }
    
    try {
      const endpoint = liked 
        ? `${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/unlike/${blog._id}`
        : `${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/like/${blog._id}`;

      const response = await axios.put(endpoint);

      if (response.data.success) {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      }
    } catch (error) {
      console.error("Error liking/unliking post", error);
      toast.error(error.response?.data?.message || "Failed to like/unlike post");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.shortDescription,
        url: window.location.href
      });
    } else {
      toast.info('Web Share API not supported. Please use the social media buttons to share this post.');
    }
  }

  useEffect(()=>{
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/comment/${blog._id}/${postType}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [blog, postType]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentContent.trim()) {
      toast.error('Please write something to comment');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/comment/create/${blog._id}`,
        { content: commentContent, postType }
      );

      if (response.data.success) {
        toast.success('Comment posted successfully');
        setCommentContent('');
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post comment");
    }
  };


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
        <meta name="description" content={blog.metaDescription} />
        <meta name="keywords" content={blog.metaKeywords} />
      </Helmet>
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:w-2/3">
            <Link to="/blogs" className="text-blue-500 hover:underline mb-6 inline-block flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to all blogs
            </Link>
            
            <article className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="w-full h-96 object-cover"
              />
              
              <div className="p-8">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="flex items-center mb-4 lg:mb-0">
                    <img 
                      src={blog.author.profilePicture} 
                      alt={blog.author.fullName} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{blog.author.fullName}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handleLikePost}
                      className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors duration-200`}
                    >
                      <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                      <span className="ml-1">{likeCount}</span>
                    </button>
                    <button onClick={handleShare} className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200">
                      <Share2 className="w-6 h-6" />
                    </button>
                    <div className="flex items-center text-gray-500">
                      <Eye className="w-6 h-6 mr-1" />
                      <span>{blog.views}</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                <p className="text-gray-700 text-xl mb-6">{blog.shortDescription}</p>
                
                <div className="mb-6 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {blog.category}
                  </span>
                </div>

                <div className="prose max-w-none text-lg leading-relaxed">
                  {blog.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      <Tag className="w-5 h-5 mr-2" />
                      Tags:
                    </h3>
                    <div className="flex flex-wrap">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">
                         <Link to={`/blog/tag/${tag}`}>
                          {tag}
                          </Link>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
            
            {/* comment system */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-md">
  <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
    <MessageCircle className="w-6 h-6 mr-2 text-purple-600" />
    Comments
  </h3>
  <div className="flex items-center mb-6">
    <img 
      src={blog.author.profilePicture} 
      alt={blog.author.fullName} 
      className="w-12 h-12 rounded-full mr-4 border border-gray-200 shadow-sm"
    />
    <form className="flex items-center w-full" onSubmit={handleCommentSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
      />
      <button
        type={auth.user ? 'submit' : 'button'}
        className={`bg-purple-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-purple-600 transition duration-300
         ${auth.user ? '' : 'cursor-not-allowed opacity-50'}`}
      >
        {loading ? 'Posting...' : (auth.user ? 'Post' : 'Login Required')}
      </button>
    </form>
  </div>
  {comments.length === 0 ? (
    <p className="text-gray-600 text-center">No comments yet. Be the first to comment!</p>
  ) : (
    <div className="space-y-4 h-64 overflow-y-auto pr-2">
      {comments.map((comment) => (
        <div key={comment._id} className="flex space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <img 
            src={comment.author.profilePicture || '/default-avatar.png'} 
            alt={comment.author.username} 
            className="w-12 h-12 rounded-full border border-gray-200 shadow-sm"
          />
          <div className="flex-grow">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{comment.author.username}</h4>
                <div className="flex items-center space-x-3">
                  <button className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>





            <div className="mt-12 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Share2 className="w-6 h-6 mr-2" />
                Share this post:
              </h3>
              <div className="flex flex-wrap gap-4">
                <FacebookShareButton url={window.location.href}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center">
                    <Facebook className="w-5 h-5 mr-2" />
                    Share on Facebook
                  </button>
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href}>
                  <button className="bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 flex items-center">
                    <Twitter className="w-5 h-5 mr-2" />
                    Share on Twitter
                  </button>
                </TwitterShareButton>
                <WhatsappShareButton url={window.location.href}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Share on Whatsapp
                  </button>
                </WhatsappShareButton>  
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-500" />
                About the Author
              </h2>
              <div className="flex items-center mb-4">
                <img 
                  src={blog.author.profilePicture} 
                  alt={blog.author.fullName} 
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-lg text-gray-900">{blog.author.fullName}</p>
                  <p className="text-gray-600">Professional Blogger</p>
                </div>
              </div>
              <p className="text-gray-700">
                {blog.author.bio || "An experienced writer passionate about sharing knowledge and insights."}
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              {relatedPosts.map((post) => (
                <Link key={post._id} to={`/blog/${post.slug}`} className="block mb-6 hover:bg-gray-50 transition duration-300 rounded-lg overflow-hidden">
                  <div className="flex items-center">
                    <img src={post.imageUrl} alt={post.title} className="w-24 h-24 object-cover rounded-lg mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
               {blogs.map((blog) => (
                  <li key={blog._id} className="mb-2">
                    <Link to={`/blog/category/${blog.category}`}>
                     <span className="text-indigo-600 hover:text-indigo-800">
                      {blog.category}
                      </span>
                    </Link>
                  </li>
                ))}
  
                </ul>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org /2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewHomeBlog;