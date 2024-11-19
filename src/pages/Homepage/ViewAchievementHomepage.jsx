import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Trophy, Share2, Calendar, ChevronLeft } from 'lucide-react';
import NavBar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { BiLike, BiDislike } from 'react-icons/bi';

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

const ErrorAlert = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>
);

const Button = ({ children, variant = 'primary', disabled, onClick, className = '' }) => {
  const baseStyles = "inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-yellow-600 text-white hover:bg-yellow-700 disabled:bg-yellow-300",
    secondary: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 disabled:bg-yellow-50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-50"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ViewAchievementHomepage = () => {
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const { id } = useParams();

  const isLiked = achievement?.likes?.includes(auth?.user?._id);
  const likesCount = achievement?.likes?.length || 0;

  useEffect(() => {
    fetchAchievement();
  }, [id]);

  const fetchAchievement = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/view/${id}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch achievement');
      }

      if (data.success) {
        setAchievement(data.achievement);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!auth?.user) {
      toast.error('Please login to like achievements');
      return;
    }

    setLikeLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/like/${id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to like achievement');
      }

      if (data.success) {
        setAchievement(data.achievement);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (!auth?.user) {
      toast.error('Please login to unlike achievements');
      return;
    }

    setLikeLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/unlike/${id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to unlike achievement');
      }

      if (data.success) {
        setAchievement(data.achievement);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: achievement.title,
        text: achievement.description,
        url: window.location.href
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast.error('Failed to share achievement');
      }
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <LoadingSkeleton />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${achievement?.title || 'Achievement'} | BucketWings`}</title>
      </Helmet>
      <NavBar />

      <div className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {error && <ErrorAlert message={error} />}

          <Link 
            to="/achievements"
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Achievements
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="w-full h-full bg-yellow-100 flex items-center justify-center p-12">
                  {achievement?.media ? (
                    <img
                      src={achievement.media}
                      alt={achievement.title}
                      className="w-full h-full object-cover rounded-lg shadow-lg transition-transform hover:scale-105"
                    />
                  ) : (
                    <Trophy className="w-32 h-32 text-yellow-600 opacity-50" />
                  )}
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                  {achievement?.title}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  
                  <Button
                  variant='outline'
                  onClick={handleLike}
                  disabled={likeLoading} 
                  className="gap-2">
                      <BiLike className={`text-2xl ${isLiked ? 'text-blue-500' : 'text-gray-500'}`}/>
                      <span className='text-gray-500'>{likesCount}</span>
                  </Button>

                  <Button 
                  variant='outline'
                  onClick={handleUnlike}
                  disabled={likeLoading} >
                      <BiDislike className={`text-2xl`}/>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>

                <div className="prose max-w-none mb-6">
                  <p className="text-gray-800">{achievement?.description}</p>
                </div>
                  <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Posted on {formatDate(achievement?.createdAt)}</span>
                </p>
                <div className="flex items-center gap-2 mt-4">
                    <img src={achievement?.user?.profilePicture} alt={achievement?.user?.username} className="w-8 h-8 rounded-full" />
                    <span className='text-gray-800 hover:text-gray-600'><Link to={`/user/${achievement?.user?.username}`}>{achievement?.user?.username}</Link></span>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAchievementHomepage;
