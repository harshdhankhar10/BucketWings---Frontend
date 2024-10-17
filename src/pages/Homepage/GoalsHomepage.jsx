import React from 'react'; 
import { Target, ArrowRight, Star, Bell, Users, ClipboardCheck } from 'lucide-react';
import { Helmet } from 'react-helmet';
import NavBar from '../../components/Navbar';
import { Link } from 'react-router-dom';

const GoalsHomepage = () => {
  return (
    <>
    <Helmet>
        <title>Set and Achieve Goals | BucketWings</title>
    </Helmet>
    <NavBar />
    
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your Dreams into
              <span className="text-purple-600"> Achievable Goals</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Set, track, and accomplish your goals with our intuitive platform. 
              Break down big dreams into manageable steps.
            </p>
            <div className="flex justify-center gap-4">
             <Link to="/register">
             <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
             </Link>
             <Link to="/about">
             <button className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium border border-purple-200">
                Learn More
              </button>
             </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Set Goals?</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Setting goals helps give your life direction and purpose. With clear goals, you stay motivated, productive, and focused on what truly matters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Target className="w-12 h-12 mx-auto text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Clarity & Focus</h3>
            <p className="text-gray-600">Goals give you a clear direction and focus for your future.</p>
          </div>
          <div>
            <Star className="w-12 h-12 mx-auto text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Increased Motivation</h3>
            <p className="text-gray-600">Stay inspired with progress milestones and goal tracking.</p>
          </div>
          <div>
            <ClipboardCheck className="w-12 h-12 mx-auto text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Better Productivity</h3>
            <p className="text-gray-600">Goals help you stay organized and productive.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What You Get</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          BucketWings offers a range of tools to help you set, track, and achieve your goals. Our platform is designed to keep you on track, motivated, and connected with a supportive community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Set Clear Goals",
              description: "Define your objectives with clarity and purpose. Break down complex goals into achievable milestones."
            },
            {
              icon: Star,
              title: "Track Progress",
              description: "Monitor your journey with intuitive tracking tools. Celebrate small wins and stay motivated."
            },
            {
              icon: Bell,
              title: "Personalized Reminders",
              description: "Receive reminders to stay on track and never miss a goal deadline."
            },
            {
              icon: Users,
              title: "Join the Community",
              description: "Be a part of a thriving community of goal-setters and achievers."
            },
            {
              icon: ClipboardCheck,
              title: "Goal Templates",
              description: "Get started with pre-built templates for common goals, such as fitness, financial goals, and productivity."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-purple-600" />
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

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Achieving Your Goals?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of others who are turning their dreams into reality. 
              Start your journey today.
            </p>
           <Link to="/register">
           <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Get Started Now
            </button>
           </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default GoalsHomepage;
