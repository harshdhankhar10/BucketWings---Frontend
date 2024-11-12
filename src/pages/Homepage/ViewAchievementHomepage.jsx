import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Trophy, Star, Medal, Award } from 'lucide-react';
import NavBar from '../../components/Navbar';

const ViewAchievementHomepage = () => {
  const [achievement, setAchievement] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchAchievement = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/view/${id}`);
      if (response.data.success) {
        setAchievement(response.data.achievement);
      } else {
        console.log(response.data.message);
      }
    };

    fetchAchievement();
  }, [id]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  return (
    <>
      <Helmet>
        <title>{`${achievement.title} | BucketWings`}</title>
      </Helmet>
        <NavBar />

      <div className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen">
        <div className="relative overflow-hidden py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="w-full h-full bg-yellow-100 flex items-center justify-center p-12">
                   {achievement.media != '' ? (
                    <img src={achievement.media} alt={achievement.title} className="w-80 h-80 object-cover rounded-lg" />
                   ) : ( <Trophy className="w-20 h-20 text-yellow-600" />)}
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <h1 className="text-4xl font-bold mb-4">{achievement.title}</h1>
                  <p className="text-gray-600 mb-6">{achievement.description}</p>
                  <p className="text-gray-500 mb-4">
                    Awarded on: {formatDate(achievement.dateOfAchievement)}
                  </p>
                  <div className="flex justify-end gap-4">
                    <button onClick={() => navigator.share({ title: achievement.title, text: achievement.description })}
                     className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                      Share Achievement
                    </button>
                    <button className="px-6 py-2 bg-white text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-medium border border-yellow-200">
                      <Link to="/achievements">More Achievements</Link>
                      
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

export default ViewAchievementHomepage;