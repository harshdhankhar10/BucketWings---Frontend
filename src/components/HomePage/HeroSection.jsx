import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket, Target, Notebook, 
  Star, Zap, Clock, Globe,
  TrendingUp, Heart, Book,
  Link,
} from 'lucide-react';
import { GrAchievement } from "react-icons/gr";
import {Link as RouterLink} from 'react-router-dom';


const HeroSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      icon: Target,
      title: 'Goal Tracking',
      color: 'text-green-500',
      description: 'Break down complex goals into actionable steps with our intelligent tracking system.',
    },
    {
      icon: Notebook,
      title: 'Task Management',
      color: 'text-blue-500',
      description: 'Organize, prioritize, and complete tasks with intuitive workflow tools.',
    },
    {
      icon: Rocket,
      title: 'Personal Storytelling',
      color: 'text-purple-500',
      description: 'Capture your journey, reflect on progress, and share your unique narrative.',
    },
    {
      icon: GrAchievement,
      title: 'Showcase Achievements',
      color: 'text-orange-500',
      description: 'Celebrate milestones, share accomplishments, and inspire others with your success.',
    },
  ];

  const additionalFeatures = [
    { icon: Star, title: 'Goal Management' },
    { icon: Zap, title: 'Quick Actions' },
    { icon: Clock, title: 'Time Management' },
    { icon: Globe, title: 'Collaboration' },
    { icon: TrendingUp, title: 'Progress Insights' },
    { icon: Heart, title: 'Wellness Focus' },
    { icon: Book, title: 'Learning Paths' },
  ];


  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 px-6 py-16 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
              Transform Your <span className="text-purple-500">Goals</span>, Unleash Your Potential
            </h1>
            <p className="mt-6 text-xl text-gray-600">
            BucketWings is your all-in-one platform for personal and professional growth.
             Effortlessly track your goals, stay on top of tasks, and craft your unique life story—empowering you to achieve more every day.
              </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex space-x-4"
          >
            <button className="bg-purple-500 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-600 shadow-lg transition">
              <RouterLink to="/register">Start Your Journey</RouterLink>
            </button>
            <button className="border border-gray-300 px-8 py-4 rounded-full text-gray-700 hover:bg-gray-50 transition">
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center space-x-4 text-gray-600 flex-wrap justify-center "
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://via.placeholder.com/40?text=${i}`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white "
                />
              ))}
            </div>
            <div>
              <p className="font-semibold">100K+ Users Trust BucketWings</p>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
                <span className="text-gray-600 ml-2">(4.9/5)</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6  sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setActiveFeature(feature)}
              onHoverEnd={() => setActiveFeature(null)}
              className={`bg-white border rounded-xl p-6 text-center shadow-lg transition-all ${
                activeFeature === feature ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <feature.icon className={`mx-auto mb-4 ${feature.color}`} size={48} />
              <h3 className="text-lg font-bold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-6 py-12 hidden lg:block">
        <div className="flex flex-wrap gap-4 justify-between">
          {additionalFeatures.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
            >
              <Icon className="text-purple-500" size={24} />
              <span className="text-gray-800 font-medium">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
