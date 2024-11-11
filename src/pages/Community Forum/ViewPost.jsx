import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { FaRegBookmark } from "react-icons/fa";
import { toast } from 'react-toastify';
import { MdBookmarkAdded } from "react-icons/md";



const ViewPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const { slug } = useParams();
  const postType = 'CommunityForum';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/post/${slug}`);
        setPost(response.data.post);
      } catch (error) {
        console.error('Error fetching the post', error);
      }
    };
    fetchPost();
  }, [slug]);


  useEffect(()=>{
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/comment/${post._id}/${postType}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [post, postType]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log(postType);
    if (!commentContent.trim()) {
      toast.error('Please write something to comment');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/comment/create/${post._id}`,
        { content: commentContent, postType : "CommunityForum" }
      );

      if (response.data.success) {
        toast.success('Comment posted successfully');
        setCommentContent('');
        setComments([...comments, response.data.comment]);
        setLoading(false);

        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post comment");
    }
    finally{
      setLoading(false);
    }
  };





  const handleBookmarkPost = async (postId) => {
    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/bookmark-post/${postId}`);
      if (response.data.success) {
        toast.success('Post bookmarked successfully');
      }
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.error('Error bookmarking post', error);
      toast.error('Error bookmarking post. Please try again.');
    }
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading post...</p>
      </div>
    );
  }

  return (
    <>
    <Helmet>
      <title>{post.title} - Community Forum | BucketWings</title>
    </Helmet>
       <div className="max-w-6xl mx-auto my-8 p-6 bg-gray-50 rounded-lg shadow-lg">

      <header className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-600">By {post.author.fullName}</p>
          <p className="text-gray-500 text-sm">{moment(post.createdAt).format('MMMM Do YYYY')}</p>
        </div>
      </header>

      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{post.content.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 text-sm text-gray-500">
          <button className="flex items-center space-x-1 hover:text-blue-600 transition duration-300">
            <Heart size={18} className="text-red-500" />
            <span>{post.likes.length} Likes</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600 transition duration-300">
            <MessageCircle size={18} />
            <span>{post.messages.length} Comments</span>
          </button>
          <button onClick = {() => navigator.share({ title: post.title, text: post.content, url: window.location.href })}
          className="flex items-center space-x-1 hover:text-blue-600 transition duration-300">
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600 transition duration-300" onClick={() => handleBookmarkPost(post._id)}>
           
            <FaRegBookmark size={18} /> 
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="flex gap-4">
          <input
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
          <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-purple-600 transition duration-300">
            {loading ? 'Posting...' : 'Post '}
            </button>
        </form>
        {
          comments.length  > 0 ?  (
            comments.map((comment) => (
              <div key={comment._id} className="mt-6 border-t pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img src={comment.author.profilePicture} alt="User Avatar" className="w-10 h-10 rounded-full" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">{comment.author.username}</p>
                    <p className="text-gray-500 text-sm">{moment(comment.createdAt).fromNow()}</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2 ml-14 leading-relaxed">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No comments yet. Be the first one to comment!</p>
          )
        }
      </div>
    </div>
    </>
  );
};

export default ViewPost;
