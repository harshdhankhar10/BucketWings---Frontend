import React from 'react';
import NavBar from '../../components/Navbar';
import { Helmet } from 'react-helmet';
import { BookOpen, PenTool, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const StoriesHomepage = () => {
  return (
    <>
      <Helmet>
        <title>Stories | BucketWings</title>
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="relative overflow-hidden py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Share Your <span className="text-indigo-600">Story</span> and Inspire Others
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Everyone has a story worth telling. Share yours with the world, inspire others, and explore the journeys of like-minded individuals.
              </p>
              <div className="flex justify-center gap-4">
               <Link to="/register">
               <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Share Your Story
                </button>
                </Link>
                <Link to="/about">
                <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium border border-indigo-200">
                  Explore Stories
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>

        {/* Featured Stories Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Stories</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Read inspiring stories from people who have overcome challenges, achieved their goals, and made a difference.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example stories */}
            {[
              {
                title: "From Zero to Hero: My Coding Journey",
                author: "Jane Doe",
                excerpt: "How I transformed my career and life through coding...",
                image: "https://via.placeholder.com/150"
              },
              {
                title: "Overcoming Fear: A Personal Growth Story",
                author: "John Smith",
                excerpt: "My journey of conquering my biggest fears and finding strength...",
                image: "https://via.placeholder.com/150"
              },
              {
                title: "Building My Dream Startup",
                author: "Alice Johnson",
                excerpt: "The highs and lows of starting my own company from scratch...",
                image: "https://via.placeholder.com/150"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <img className="w-full h-40 object-cover rounded-lg mb-4" src={story.image} alt={story.title} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-2">{story.excerpt}</p>
                <p className="text-sm text-gray-500">By {story.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Categories Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Explore by Category</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you're interested in personal growth, career success, or overcoming adversity, there's a story for everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: BookOpen, title: "Personal Growth" },
              { icon: PenTool, title: "Creative Journeys" },
              { icon: Globe, title: "Cultural Experiences" },
              { icon: Users, title: "Career Success" }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <category.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Share Your Story?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Everyone’s story is unique. Share yours today and let the world be inspired by your journey!
              </p>
             <Link to="/register">
             <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Start Sharing
              </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoriesHomepage;
