import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/Navbar';

const ViewStoryHomepage = () => {
  const [story, setStory] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchStories = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/view/${id}`);
      if (response.data.success) {
        setStory(response.data.story);
        setUserInfo(response.data.userInfo);
      } else {
        console.log(response.data.message);
      }
    };

    fetchStories();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
    };

  return (
    <>
      <Helmet>
        <title> {`${story.title} | BucketWings`}</title>
      </Helmet>
        <NavBar />


      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="relative overflow-hidden py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <p className="text-gray-600 mb-6">
                         { story.content }
                    </p>
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
                  <div className="flex justify-end gap-4">
                    <button onClick={() => navigator.share({ title: story.title, text: story.content })}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                      Share Your Story
                    </button>
                    <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium border border-indigo-200">
                      <Link to="/stories">More Stories</Link>
                    </button>
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

export default ViewStoryHomepage;