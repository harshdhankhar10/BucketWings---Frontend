import React, { useState, useEffect } from 'react';
import { Award, Target, BookOpen, CheckSquare } from "lucide-react";
import {
  PieChart, Pie, Cell,
  RadialBarChart, RadialBar,
  ResponsiveContainer,
  Legend, Tooltip
} from 'recharts';
import axios from 'axios';

const COLORS = {
  blue: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
  green: ['#16a34a', '#22c55e', '#4ade80', '#86efac'],
  yellow: ['#ca8a04', '#eab308', '#facc15', '#fde047'],
  red: ['#dc2626', '#ef4444', '#f87171', '#fca5a5']
};

const Card = ({ children, className }) => (

  <div className={`bg-gray-50 rounded-xl shadow-lg p-4 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, icon, data, colorSet }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h3>

      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorSet[index % colorSet.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value} (${((value/total)*100).toFixed(1)}%)`, name]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colorSet[index % colorSet.length] }}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <span className="font-semibold">{item.value || 0}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const QuickStats = () => {

  const [data, setData] = useState({
    achievements: {
      featuredAchievements: 15,
      nonFeaturedAchievements: 25,
      privateAchievements: 8,
      publicAchievements: 30
    },
    goals: {
      totalCompletedGoals: 15,
      totalIncompleteGoals: 7
    },
    stories: {
      publicStories: 42,
      totalStories: 50,
      totalComments: 128,
      totalLikes: 256
    },
    tasks: {
      completedTasks: 75,
      pendingTasks: 25
    }
  });

  const achievementsData = [
    { name: 'Featured', value: data.achievements.featuredAchievements },
    { name: 'Non-Featured', value: data.achievements.nonFeaturedAchievements },
    { name: 'Private', value: data.achievements.privateAchievements },
    { name: 'Public', value: data.achievements.publicAchievements }
  ];

  const goalsData = [
    { name: 'Completed', value: data.goals.totalCompletedGoals },
    { name: 'Incomplete', value: data.goals.totalIncompleteGoals }
  ];

  const storiesData = [
    { name: 'Public', value: data.stories.publicStories },
    { name: 'Private', value: data.stories.totalStories - data.stories.publicStories },
    { name: 'Comments', value: data.stories.totalComments },
    { name: 'Likes', value: data.stories.totalLikes }
  ];

  const tasksData = [
    { name: 'Completed', value: data.tasks.completedTasks },
    { name: 'Pending', value: data.tasks.pendingTasks }
  ];

  return (
    <div className="p-2 ">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold mb-6">Glimpse of your activities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4  ">
          <StatCard
            title="Achievements"
            icon={<Award className="h-5 w-5 text-blue-600 " />}
            data={achievementsData}
            colorSet={COLORS.blue}
          />
          <StatCard
            title="Goals"
            icon={<Target className="h-5 w-5 text-green-600" />}
            data={goalsData}
            colorSet={COLORS.green}
          />
          <StatCard
            title="Stories"
            icon={<BookOpen className="h-5 w-5 text-yellow-600" />}
            data={storiesData}
            colorSet={COLORS.yellow}
          />
          <StatCard
            title="Tasks"
            icon={<CheckSquare className="h-5 w-5 text-red-600" />}
            data={tasksData}
            colorSet={COLORS.red}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickStats;