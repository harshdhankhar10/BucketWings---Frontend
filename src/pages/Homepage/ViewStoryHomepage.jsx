import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/Navbar';
import { BiLike, BiDislike } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const ViewStoryHomepage = () => {
  const [story, setStory] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const { id } = useParams();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/view/${id}`
        );
        if (response.data.success) {
          setStory(response.data.story);
          setUserInfo(response.data.userInfo);
          setLikes(response.data.story.likes.length || 0);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        toast.error("Failed to fetch story.");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleLike = async () => {
    
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/like/${id}`);
      if (response.data.success) {
        setLikes((prev) => prev + 1);
        toast.success("Story liked successfully!");
      }
    } catch (error) {
      console.error("Error liking the story:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/unlike/${id}`);
      if (response.data.success) {
        setLikes((prev) => prev - 1);
        toast.success("Story unliked successfully!");
      }
    } catch (error) {
      console.error("Error unliking the story:", error);
      toast.error(error.response.data.message);
    }
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
        </div>
        <div className="md:w-1/2 p-8 space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );

  const Button = ({ children, variant = 'primary', onClick, className = '', disabled }) => {
    const baseStyles = "inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
      secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:bg-blue-50",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-50",
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <>
      <Helmet>
        <title>{story ? `${story.title} | BucketWings` : "Loading..."}</title>
      </Helmet>
      <NavBar />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="relative overflow-hidden py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
                    <p className="text-gray-600 mb-6">{story.content}</p>
                    <p className="text-gray-500 mb-4">
                      Submitted on: {formatDate(story.createdAt)}
                    </p>
                    <div className="flex items-center mb-6">
                      <img
                        src={userInfo.profilePicture}
                        alt={userInfo.fullName}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium">{userInfo.fullName}</h3>
                        <p className="text-gray-500">@{userInfo.username}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="primary"
                        onClick={handleLike}
                        className='gap-2'
                        
                      >
                        <BiLike className="text-xl" />
                        {likes}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleUnlike}
                        
                      >
                        <BiDislike className="text-xl" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigator.share({ title: story.title, text: story.content })}
                      >
                        Share Story
                      </Button>
                      <Button variant="secondary">
                        <Link to="/stories">More Stories</Link>
                      </Button>
                    </div>
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

export default ViewStoryHomepage;
