import React from 'react';
import {
  RiBookmarkLine,
  RiTrophyLine,
  RiFileTextLine,
  RiBarChartLine,
  RiPieChartLine,
} from 'react-icons/ri';

import { FaTasks } from "react-icons/fa";

import { motion } from 'framer-motion';

const QuickStats = ({tasks, goals,stories,achievements,blogs}) => {


  const engagementRate = 
  goals?.totalCompletedGoals && blogs?.totalViews
    ? `${((blogs.totalViews / goals.totalCompletedGoals) * 100).toFixed(2)}%`
    : 'N/A';




  const stats = [
    { title: 'Total Tasks', value: tasks.totalTasks, icon: FaTasks, color: 'bg-purple-500' },
    { title: 'Goals Achieved', value: goals.totalCompletedGoals, icon: RiBookmarkLine, color: 'bg-green-500' },
    { title: 'Published Stories', value: stories.publicStories, icon: RiFileTextLine, color: 'bg-blue-500' },
    { title: 'Achievements', value: achievements.totalAchievements, icon: RiTrophyLine, color: 'bg-yellow-500' },
    { title: 'Blog Views', value: blogs.totalViews, icon: RiBarChartLine, color: 'bg-red-500' },
    { title: 'Engagement Rate', value: engagementRate, icon: RiPieChartLine, color: 'bg-indigo-500' },
  ];
  // Calculate engagement rate Dynamically

  return (
    <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className=" bg-white flex items-center gap-4 p-4 rounded-lg shadow-sm"
        >
          <div className={`p-3 rounded-lg ${stat.color}`}>
            <stat.icon className="text-2xl text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;
