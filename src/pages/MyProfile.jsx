import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserCircle, Mail, Calendar, Shield, Clock, User, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Navbar from "../components/Navbar"

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 mb-6">
    {icon}
    <div>
      <h3 className="text-gray-600 font-medium">{label}</h3>
      <p className="text-gray-800 text-lg">{value}</p>
    </div>
  </div>
);

const MyProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user || false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/users/${username}`);
        setUser(response.data.user);
        setIsFollowing(response.data.user.followers.includes(auth.id));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [username, auth.id]);

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

  const handleFollowToggle = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/users/${isFollowing ? 'unfollow' : 'follow'}/${user._id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setIsFollowing(!isFollowing);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{user ? `${user.fullName}'s Profile | BucketWing` : "User Profile"}</title>
        <meta name="description" content={user ? `View ${user.fullName}'s profile on BucketWing` : "User Profile"} />
      </Helmet>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex flex-col">
       

        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : user ? (
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-r from-purple-600 to-blue-500 p-8 text-white">
                  <div className="mb-8 relative">
                    <img
                      src={user.profilePicture}
                      alt={user.fullName}
                      className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    <h1 className="text-3xl font-bold text-center mt-4">{user.fullName}</h1>
                    <p className="text-purple-200 text-center font-medium">@{user.username}</p>
                    {auth && auth.id !== user._id && (
                      <button 
                        onClick={handleFollowToggle} 
                        className={`absolute top-0 right-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          isFollowing 
                            ? 'bg-white text-purple-600 hover:bg-red-100 hover:text-red-600' 
                            : 'bg-[#9333EA] text-white hover:bg-purple-800'
                        }`}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    )}
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="text-white" size={24} />
                      <span className="text-2xl font-bold">{user.followers?.length || 0}</span>
                    </div>
                    <p className="text-center text-sm mt-1">Followers</p>
                  </div>
                  <button
                    onClick={handleShareProfile}
                    className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition-colors flex items-center justify-center space-x-2">
                    <span>Share Profile</span>
                    <UserCircle className="text-white" size={20} />
                  </button>
                 {
                    auth && auth.id === user._id && (
                      <Link
                      to={`/dashboard/${user.role}`}
                      className="w-full mt-6 bg-gradient-to-r from-gray-200 to-gray-100 text-gray-700 py-3 rounded-lg shadow-md hover:from-white hover:to-gray-200 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span className="font-semibold tracking-wide">Go to Dashboard</span>
                      <UserCircle className="text-gray-700" size={20} />
                    </Link>
                    
                    )
                 }
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile Information</h2>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    <ProfileItem icon={<UserCircle className="text-purple-500" size={24} />} label="User ID" value={user._id} />
                    <ProfileItem icon={<Mail className="text-purple-500" size={24} />} label="Email" value={user.email} />
                    <ProfileItem icon={<Calendar className="text-purple-500" size={24} />} label="Date of Birth" value={new Date(user.dateOfBirth).toLocaleDateString()} />
                    <ProfileItem icon={<Shield className="text-purple-500" size={24} />} label="Verification" value={user.isVerified ? "Verified User" : "Not Verified"} />
                    <ProfileItem icon={<Clock className="text-purple-500" size={24} />} label="Member since" value={new Date(user.createdAt).toLocaleDateString()} />
                    <ProfileItem icon={<User className="text-purple-500" size={24} />} label="User Status" value={user.status} />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Bio</h3>
                    <p className="text-gray-600">{user.bio || "No bio provided"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">User not found</div>
            )}
          </motion.div>
        </main>

        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            &copy; {new Date().getFullYear()} BucketWing. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default MyProfile;