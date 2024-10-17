import React from 'react';
import { BookOpen, Target, Calendar, Trophy, BarChart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Target,
    title: "Goal Setting & Tracking",
    description: "Set clear objectives and track your progress with intuitive visual tools. Our smart reminders keep you motivated and on track to achieve your dreams."
  },
  {
    icon: Calendar,
    title: "Intelligent Scheduling",
    description: "Optimize your time with AI-powered scheduling. Our system learns your preferences and productivity patterns to suggest the best times for tasks and meetings."
  },
  {
    icon: Trophy,
    title: "Achievement Showcase",
    description: "Celebrate your wins, big and small. Our achievement system gamifies your progress, making productivity feel rewarding and fun."
  },
  {
    icon: BarChart,
    title: "Insightful Analytics",
    description: "Gain deep insights into your productivity trends with beautiful, easy-to-understand charts and reports. Make data-driven decisions to continuously improve your performance."
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description: "Work effortlessly with your team. Share tasks, goals, and progress updates in real-time. Our collaboration tools make teamwork smooth and enjoyable."
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    description: "Access a curated library of productivity tips, courses, and expert advice. Continuously improve your skills and stay updated with the latest productivity techniques."
  }
];

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
    <div className="flex items-center mb-4">
      <div className="bg-indigo-100 rounded-full p-3 mr-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features to Boost Your Productivity
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover tools designed to help you achieve more and work smarter.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Get Started
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;