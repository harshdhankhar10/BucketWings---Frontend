import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserCircle, Mail, Calendar, Shield, Clock, FileText, User, Home, Settings, Bell, LogOut } from 'lucide-react';
import NavBar from '../components/Navbar';


const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 mb-4">
    {icon}
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

const MyProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth'))?.user || false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/users/${username}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex">
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : user ? (
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-blue-500 p-8 text-white">
                  <div className="mb-8">
                    <img
                      src={user.profilePicture}
                      alt={user.fullName}
                      className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    <h1 className="text-3xl font-bold text-center mt-4">{user.fullName}</h1>
                    <p className="text-purple-200 text-center font-medium">@{user.username}</p>
                  </div>
                  <div className="space-y-2">
                    {auth && (
                     <div>
                    <Link to={`/dashboard/${auth.role}`} className="flex items-center space-x-2 mb-2 bg-white text-purple-700 px-4 rounded-lg hover:bg-purple-100 transition-colors">
                        <button className="w-full bg-white text-purple-600 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                        Go to Dashboard
                        </button>
                    </Link>
                     <Link to="/settings" className="flex items-center space-x-2 bg-white text-purple-700 px-4 rounded-lg hover:bg-purple-100 transition-colors">
                      <button className="w-full bg-white text-purple-600 py-2 rounded-lg hover:bg-purple-100 transition-colors">
                      Edit Profile
                    </button>
                      </Link>
                     </div>
                    )}
                    <button className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition-colors">
                      Share Profile
                    </button>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ProfileItem icon={<UserCircle className="text-purple-500" size={20} />} label="User ID" value={user._id} />
                    <ProfileItem icon={<Mail className="text-purple-500" size={20} />} label="Email" value={user.email} />
                    <ProfileItem icon={<Calendar className="text-purple-500" size={20} />} label="Date of Birth" value={new Date(user.dateOfBirth).toLocaleDateString()} />
                    <ProfileItem icon={<Shield className="text-purple-500" size={20} />} label="Verification" value={user.isVerified ? "Verified User" : "Not Verified"} />
                    <ProfileItem icon={<Clock className="text-purple-500" size={20} />} label="Member since" value={new Date(user.createdAt).toLocaleDateString()} />
                    <ProfileItem icon={<User className="text-purple-500" size={20} />} label="User Status" value={user.status} />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Bio</h3>
                    <p className="text-gray-600">{user.bio || "No bio provided"}</p>
                  </div>
                  <div className="mt-8 flex space-x-4">
                    <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                      Message
                    </button>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">User not found</div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MyProfile;