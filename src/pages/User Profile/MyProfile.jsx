import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Navbar from "../../components/Navbar";
import { IoShareSocialOutline } from "react-icons/io5";
import Modal from 'react-modal';
import Swal from 'sweetalert2';

// User Profile Components 
import UserProfileAchievements from './UserProfileAchievements';
import UserProfileStories from './UserProfileStories';
import UserProfileBlog from './UserProfileBlog';

const MyProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth"))?.user || null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('followers'); 

  // Achievements, Stories, Blogs
  const [achievements, setAchievements] = useState([]);
  const [ stories, setStories] = useState([])
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/users/${username}`);
        if (response.data.success) {
        setUser(response.data.user);
        setFollowers(response.data.user.followers);
        setFollowing(response.data.user.following);
        setIsFollowing(response.data.user.followers.some((follower) => follower._id === auth.id));
        setLoading(false);
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [username, auth?.id]);

  useEffect(()=>{
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/${username}`);
        setAchievements(response.data.achievements);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();

    const fetchStories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/public/${username}`);
        setStories(response.data.stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    }
    fetchStories();

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/${username}`);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, [username])

  const handleFollowToggle = async () => {
    if (!auth) {
      toast.error("Login Required to perform this action.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/users/${isFollowing ? 'unfollow' : 'follow'}/${user._id}`);
      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.message);
        setUser(response.data.user);
        setIsFollowing(!isFollowing);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error toggling follow status:", error);
    }
  };

  const handleShareProfile = async () => {
    try {
      await navigator.share({
        title: "Share Profile",
        text: `Check out ${user.fullName}'s profile on our platform.`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing profile:", error);
      toast.error("Error sharing profile. Please try again.");
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to logout from BucketWing!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth");
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success').then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    });
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-medium text-gray-600">Loading Profile...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{user ? `${user.fullName}'s Profile | BucketWing` : "User Profile"}</title>
        <meta name="description" content={user ? `View ${user.fullName}'s profile on BucketWing` : "User Profile"} />
      </Helmet>
      <Navbar />
        <main className="mx-auto px-4">
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" rounded-xl shadow-xl p-8 mb-6 mt-8 mx-4 border-t-4 border-b-4 border-purple-500 z-50"
      >
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <img
              src={user?.profilePicture}
              alt={user?.fullName || "User Profile"}
              className="w-32 h-32 p-1 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-purple-500"
            />
          </motion.div>

          <div className="mt-4 md:mt-0 text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user?.fullName}</h1>
                <p className="text-purple-600 font-medium mt-1">@{user?.username}</p>
                <p className="text-gray-600 mt-1">{user?.email}</p>
                <p className="mt-3 text-gray-700 border-l-4 pl-2 bg-gray-100 border-purple-500 py-2">
                  {user?.bio.length > 0 ? user.bio : "No bio provided."}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-2 justify-center ">
               {
                  auth && auth?.id !== user?._id && (
                    <button
                    onClick={handleFollowToggle}
                    className={`bg-purple-600 text-white font-medium px-10 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${isFollowing ? "bg-red-400 hover:bg-red-700" : ""}`}
                  >
                    {isFollowing ? `${loading ? "Unfollowing" : "Unfollow"}` : `${loading ? "Following" : "Follow"}`}
                  </button>
                  )
               }
                <button
                  onClick={handleShareProfile}
                  className="bg-purple-600 text-white font-medium px-4 py-2 rounded-md flex items-center hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <IoShareSocialOutline className="inline-block w-6 h-6 mr-2 hidden lg:block" />
                  Share Profile
                </button>
              </div>
            </div>

          <div className='flex justify-between items-center sm:flex-row flex-col md:space-x-8 space-x-8 mt-6'>
          <div className="flex justify-center items-center items-center  md:flex-row md:items-start md:space-x-8 space-x-8 mt-6">
              <div className="text-center cursor-pointer" onClick={() => openModal('followers')}>
                <span className="block text-2xl font-bold text-purple-600">{followers.length}</span>
                <span className="text-gray-600">Followers</span>
              </div>
              <div className="text-center cursor-pointer" onClick={() => openModal('following')}>
                <span className="block text-2xl font-bold text-purple-600">{following.length}</span>
                <span className="text-gray-600">Following</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-purple-600">{blogs.length}</span>
                <span className="text-gray-600">Posts</span>
              </div>
            </div>
            <div className=''>
             {
                auth && 
              <div className="flex justify-center space-x-4 mt-6">
                <button onClick={() => navigate(`/dashboard/${user.role}`)}
               className="bg-purple-600 text-white font-medium px-6 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Go to Dashboard
              </button>
              <button onClick={handleLogout}
              className='bg-red-600 text-white font-medium px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                Logout
              </button>  
            </div>
             }
            </div>
            </div>
          </div>
        </div>
        <UserProfileAchievements achievements={achievements} />
        <UserProfileStories stories={stories} />
        <UserProfileBlog  blogs={blogs} />

      </motion.div>

     
        </main>
        <br></br>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white p-6 rounded-xl w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-4">{modalType === 'followers' ? 'Followers' : 'Following'}</h2>
          <ul className="space-y-4">
            {(modalType === 'followers' ? followers : following).map((person) => (
              <a href={`/user/${person.username}`} key={person._id} className="flex items-center space-x-4 " target='_blank' >
                 <li key={person._id} className="flex items-center space-x-4 border-b pb-2 border-gray-200 w-full hover:bg-gray-100 cursor-pointer rounded-md">
                <img
                  src={person.profilePicture}
                  alt={person.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{person.fullName}</h3>
                  <p className="text-gray-600">@{person.username}</p>
                </div>
              </li>
              </a>              
            ))}
          </ul>
          <div className="mt-4 flex justify-center">
            <button onClick={closeModal} className="bg-purple-600 text-white font-medium px-6 py-2 rounded-md hover:bg-purple-700">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyProfile;
