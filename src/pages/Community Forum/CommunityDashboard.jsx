import React,{useState} from 'react';
import {
  Home, FileText, MessageSquare, Settings, PlusCircle, Heart, MessageCircle, Share2, Star, Zap, Filter, Award, BookOpen, Users,
} from 'lucide-react';
import NavBar from '../../components/Navbar';
import "../../App.css"
import { Link, NavLink, Outlet } from 'react-router-dom';


const ForumPage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex space-x-8">
            {/* Left Sidebar */}
            <aside className="w-96 space-y-6 h-screen sticky top-0 overflow-y-auto">
              {
                user ? (
                    <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img src={user.profilePicture} alt="User Avatar" className="rounded-full h-20 w-20" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.fullName}</h3>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Posts:</span><span className="font-semibold">1,234</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Reputation:</span><span className="font-semibold">4,567</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Joined:</span><span className="font-semibold">Jan 2022</span>
                  </p>
                </div>
              </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-3 mb-4">
                    <div>
                    <h3 className="font-semibold text-gray-800">Login to participate in the forum </h3>
                    </div>
                </div>
                </div>
                
                )

              }

              <nav className="bg-white rounded-lg shadow-md p-4">
                <ul className="space-y-2">
                  <li><NavLink to="/community" className="flex items-center space-x-3 text-purple-600 font-medium p-2 rounded-md bg-purple-50"><Home size={18} /><span>Dashboard</span></NavLink></li>
                  <li><NavLink to="/community/my-posts" className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md"><FileText size={18} /><span>My Posts</span></NavLink></li>
                  <li><NavLink to="/community/messages" className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md"><MessageSquare size={18} /><span>Messages</span></NavLink></li>
                  <li><NavLink to="/community/bookmarks" className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md"><BookOpen size={18} /><span>Bookmarks</span></NavLink></li>
                  <li><NavLink to="/community/my-network" className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md"><Users size={18} /><span>My Network</span></NavLink></li>
                  <li><NavLink to="/community/settings" className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md"><Settings size={18} /><span>Settings</span></NavLink></li>
                </ul>
              </nav>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">#technology</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">#programming</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">#ai</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">#webdev</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">#datascience</span>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="main-content w-full flex-grow space-y-6 h-screen overflow-y-auto">
              <Outlet />
            </main>

            {/* Right Sidebar */}
            <aside className="w-96 space-y-6 h-screen sticky top-0 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Top Contributors</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <Award size={18} className="text-yellow-500" />
                    <span className="font-medium text-gray-700">Alice Johnson</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Award size={18} className="text-yellow-500" />
                    <span className="font-medium text-gray-700">Bob Smith</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Award size={18} className="text-yellow-500" />
                    <span className="font-medium text-gray-700">Charlie Brown</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Latest Topics</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-purple-600 hover:underline">How to Improve Your Coding Skills in 2024</a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 hover:underline">The Future of AI and Its Ethical Implications</a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 hover:underline">Exploring the New JavaScript Frameworks</a>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">Sponsored</h3>
                <div className="bg-gray-200 rounded-lg h-32"></div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumPage;
