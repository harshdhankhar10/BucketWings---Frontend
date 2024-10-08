import React, { useEffect, useState } from 'react';
import {
  User, Mail, Calendar, MapPin, Link as LinkIcon,
  Linkedin, Facebook, Book, MessageSquare, ThumbsUp, Award
} from 'lucide-react';
import { FaGithub as Github } from "react-icons/fa";
import { FaTwitter as Twitter } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CommunityForumUserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // Add state for posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/posts/${username}`);
        console.log(response.data.user);
        setUser(response.data.user);
        setPosts(response.data.posts); // Set posts from the response
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]); // Make sure to include username as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user profile: {error.message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="relative px-6 py-4">
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className="absolute -top-16 w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
          <div className="ml-36">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.username}</p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-600 max-w-xl">{user.bio}</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                Follow
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition duration-300">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          {user.stats && Object.entries(user.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-2xl font-bold text-blue-600">{value}</p>
              <p className="text-gray-600 capitalize">{key}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem icon={<Mail size={18} />} text={user.email} />
          <InfoItem icon={<Calendar size={18} />} text={`Joined ${user.joined}`} />
          <InfoItem icon={<MapPin size={18} />} text={user.location} />
          <InfoItem icon={<LinkIcon size={18} />} text={user.website} isLink />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Social Links</h2>
        <div className="flex space-x-4">
          <SocialLink href="#" icon={<Github size={24} />} />
          <SocialLink href="#" icon={<Twitter size={24} />} />
          <SocialLink href="#" icon={<Linkedin size={24} />} />
          <SocialLink href="#" icon={<Facebook size={24} />} />
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2">
          {/* {user?.badges.map((badge, index) => (
            <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center">
              <Award size={14} className="mr-1" /> {badge}
            </span>
          ))} */}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* {user.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p>
                <span className="font-medium">{user.name}</span> {activity.action} <span className="text-blue-500 hover:underline cursor-pointer">{activity.target}</span>
              </p>
            </div>
          ))} */}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">{post.title}</h3>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.date}</span>
                <div className="flex space-x-4">
                  <span className="flex items-center"><MessageSquare size={16} className="mr-1" /> {post.comments}</span>
                  <span className="flex items-center"><ThumbsUp size={16} className="mr-1" /> {post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, text, isLink = false }) => (
  <div className="flex items-center space-x-2 text-sm">
    {icon}
    {isLink ? (
      <a href={text} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        {text}
      </a>
    ) : (
      <span>{text}</span>
    )}
  </div>
);

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-gray-600 transition duration-300"
  >
    {icon}
  </a>
);

export default CommunityForumUserProfile;
