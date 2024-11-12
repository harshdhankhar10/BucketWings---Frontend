import React, {useEffect, useState} from 'react';
import NavBar from '../../components/Navbar';
import { Helmet } from 'react-helmet';
import { BookOpen, PenTool, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdAutoStories } from "react-icons/md";


const StoriesHomepage = () => {
  const [stories, setStories] = useState([]);
  const [shownStories, setShownStories] = useState(3);

  useEffect(() => {
    const fetchStories = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/allPublic`);
      if (response.data.success) {
        setStories(response.data.stories);
      } else {
        console.log(response.data.message);
      }
    };

    fetchStories();
  }, []);

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

       {/* Stories Lists */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Stories</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore the stories of individuals who have overcome challenges, achieved success, and inspired others.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.slice(0, shownStories).map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-md transition-all">
                 <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center mb-6">
                <MdAutoStories className="w-6 h-6 text-[#4F46E5]" />
              </div>
              <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 hover:underline">
                <Link to={`/stories/${story._id}`} >
                {story.title}
                </Link>
              </h3>
              <p className="text-gray-600">
                {story.content.substring(0, 100).replace(/<[^>]*>?/gm, '')}...
              </p>
            </div>
            ))}
          </div>
          {shownStories < stories.length && (
            <div className="text-center mt-8">
              <button onClick={() => setShownStories(shownStories + 3)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Load More
              </button>
            </div>
          )}
        </div>

       

        {/* Story Categories Section */}
       

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
