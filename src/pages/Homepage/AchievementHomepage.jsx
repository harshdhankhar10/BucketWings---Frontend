import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar';
import { Helmet } from 'react-helmet';
import { Trophy, Star, Medal, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AchievementHomepage = () => {
  const [achievements, setAchievements] = useState([]);
  const [shownAchievements, setShownAchievements] = useState(6);

  useEffect(() => {
    const fetchAchievements = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/public`);
      if (response.data.success) {
        setAchievements(response.data.achievements);
      } else {
        console.log(response.data.message);
      }
    };

    fetchAchievements();
  }, []);

  const handleLoadMoreAchievements = () => {
    setShownAchievements(shownAchievements + 6);
  };

  return (
    <>
      <Helmet>
        <title>Showcase Your Achievements | BucketWings</title>
      </Helmet>
      <NavBar />

      <div className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen">
        <div className="relative overflow-hidden py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Celebrate Your <span className="text-yellow-600">Achievements</span> and Track Progress
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Showcase your accomplishments, track your progress, and inspire others to reach their goals.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/register">
                  <button className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                    Get Started
                  </button>
                </Link>
                <Link to="/about">
                  <button className="px-8 py-3 bg-white text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-medium border border-yellow-200">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Showcase Your Achievements?</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Highlighting your achievements motivates you to accomplish even more and inspires others to follow your lead.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Trophy className="w-12 h-12 mx-auto text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900 mt-4">Celebrate Milestones</h3>
              <p className="text-gray-600">Recognize and celebrate key moments in your journey to success.</p>
            </div>
            <div>
              <Star className="w-12 h-12 mx-auto text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900 mt-4">Track Progress</h3>
              <p className="text-gray-600">Keep a record of your progress, setting benchmarks and goals along the way.</p>
            </div>
            <div>
              <Medal className="w-12 h-12 mx-auto text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900 mt-4">Inspire Others</h3>
              <p className="text-gray-600">Showcase your achievements and encourage others to strive for success.</p>
            </div>
          </div>
        </div>

        {/* Achievements Lists */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore Public Achievements
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover achievements shared by others and get inspired by their success stories.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.slice(0, shownAchievements).map((achievement, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-orange-600 mb-4 hover:underline">
                    <Link to={`/achievements/${achievement._id}`} >
                      {achievement.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600">
                    {achievement.description.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
            {achievements.length > shownAchievements && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMoreAchievements}
                  className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                >
                  Load More Achievements
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Platform Features</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Our platform helps you document, organize, and share your achievements with ease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Achievement Log",
                description: "Keep a detailed log of your awards, milestones, and accomplishments."
              },
              {
                icon: Star,
                title: "Share with Peers",
                description: "Showcase your achievements on your profile and share them with others."
              },
              {
                icon: Medal,
                title: "Track Goals",
                description: "Monitor your progress towards achieving your personal and professional goals."
              },
              {
                icon: Award,
                title: "Earn Badges",
                description: "Earn badges for reaching milestones and completing important tasks."
              },
              {
                icon: Star,
                title: "Collaborate & Compete",
                description: "Work with teammates or engage in friendly competition to stay motivated."
              },
              {
                icon: Medal,
                title: "Customizable Profiles",
                description: "Design your profile to reflect your journey and achievements in a personalized way."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Showcasing Your Achievements?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Begin tracking and celebrating your achievements today. Inspire yourself and others to aim higher!
              </p>
              <Link to="/register">
                <button className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                  Start Showcasing
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementHomepage;