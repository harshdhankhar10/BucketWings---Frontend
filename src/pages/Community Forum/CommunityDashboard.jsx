import React, { useEffect, useState } from 'react';
import {
  Home, FileText, MessageSquare, Settings, PlusCircle, Heart, MessageCircle, Share2, 
  Star, Zap, Filter, Award, BookOpen, Users, Bell, Search
} from 'lucide-react';
import NavBar from '../../components/Navbar';
import "../../App.css";
import { Link, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';

const ForumPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [contributors, setContributors] = useState([]);

  useEffect(()=>{
    const fetchContributors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/user-contributors`);
        setContributors(response.data.users);
      } catch (error) {
        console.error("Error fetching contributors", error);
      }
    };
    fetchContributors();

  },[])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };


  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const CategoryCard = ({ icon: Icon, title, bgColor, textColor }) => (
    <div className={`flex flex-col items-center p-3 ${bgColor} rounded-lg transition duration-300 hover:shadow-md cursor-pointer`}>
      <Icon size={24} className={`${textColor} mb-1`} />
      <span className={`text-sm font-medium ${textColor}`}>{title}</span>
    </div>
  );
  
  const Tag = ({ name, color }) => (
    <span className={`bg-${color}-100 text-${color}-800 text-xs font-medium px-2 py-1 rounded-full hover:bg-${color}-200 transition duration-300 cursor-pointer`}>
      #{name}
    </span>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-6">
          {/* Left Sidebar */}
          <aside className="w-64 space-y-6">
            {user ? (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img src={user.profilePicture} alt="User Avatar" className="rounded-full h-16 w-16" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.fullName}</h3>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Posts:</span><span className="font-semibold">1,234</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Reputation:</span><span className="font-semibold">4,567</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Joined:</span><span className="font-semibold">{formatDate(user?.createdAt)}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Login to participate in the forum</h3>
                <Link to="/login">
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300">
                  Sign In
                </button>
                </Link>
              </div>
            )}

           {user && (
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                <li><NavLink to="/community" className="flex items-center space-x-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-2 rounded-md transition duration-300"><Home size={18} /><span>Dashboard</span></NavLink></li>
                <li><NavLink to="/community/my-posts" className="flex items-center space-x-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-2 rounded-md transition duration-300"><FileText size={18} /><span>My Posts</span></NavLink></li>
                <li><NavLink to="/community/messages" className="flex items-center space-x-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-2 rounded-md transition duration-300"><MessageSquare size={18} /><span>Messages</span></NavLink></li>
                <li><NavLink to="/community/bookmarks" className="flex items-center space-x-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-2 rounded-md transition duration-300"><BookOpen size={18} /><span>Bookmarks</span></NavLink></li>
                <li><NavLink to="/community/my-network" className="flex items-center space-x-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-2 rounded-md transition duration-300"><Users size={18} /><span>My Network</span></NavLink></li>
                <li><NavLink to="/community/settings" className="flex items-center space-x-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 p-2 rounded-md transition duration-300"><Settings size={18} /><span>Settings</span></NavLink></li>
              </ul>
            </nav>
           )}
          </aside>

          {/* Main Content */}
          <main className="max-w-4xl flex-grow space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">            
              <Outlet />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Popular Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <CategoryCard icon={Star} title="Technology" bgColor="bg-blue-100" textColor="text-blue-800" />
                <CategoryCard icon={Zap} title="Programming" bgColor="bg-green-100" textColor="text-green-800" />
                <CategoryCard icon={Filter} title="AI" bgColor="bg-yellow-100" textColor="text-yellow-800" />
                <CategoryCard icon={Share2} title="Web Dev" bgColor="bg-red-100" textColor="text-red-800" />
                <CategoryCard icon={Award} title="Data Science" bgColor="bg-indigo-100" textColor="text-indigo-800" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-800">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Tag name="technology" color="blue" />
                <Tag name="programming" color="green" />
                <Tag name="ai" color="yellow" />
                <Tag name="webdev" color="red" />
                <Tag name="datascience" color="indigo" />
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-80 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Top Contributors</h3>
              <ul className="space-y-3">
                {contributors.map(({ name }, index) =>
                 (
                  <li key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition duration-300">
                    <Award size={18} className="text-yellow-500" />
                    <span className="font-medium text-gray-700">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Latest Topics</h3>
              <ul className="space-y-3">
                {[
                  'How to Improve Your Coding Skills in 2024',
                  'The Future of AI and Its Ethical Implications',
                  'Exploring the New JavaScript Frameworks'
                ].map((topic, index) => (
                  <li key={index} className="p-2 hover:bg-gray-50 rounded-md transition duration-300">
                    <a href="#" className="text-purple-600 hover:text-purple-800 transition duration-300">{topic}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Sponsored</h3>
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-500">
                Ad Space
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;