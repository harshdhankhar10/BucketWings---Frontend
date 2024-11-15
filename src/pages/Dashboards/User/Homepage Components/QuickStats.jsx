import React, { useState, useEffect } from 'react';
import { Award, Target, BookOpen, CheckSquare } from "lucide-react";
import {
  PieChart, Pie, Cell,
  ResponsiveContainer,
  Legend, Tooltip
} from 'recharts';

const COLORS = {
  blue: ['#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd'],
  green: ['#15803d', '#22c55e', '#4ade80', '#86efac'],
  yellow: ['#b45309', '#f59e0b', '#fbbf24', '#fde047'],
  red: ['#b91c1c', '#ef4444', '#f87171', '#fca5a5']
};

const GRADIENTS = {
  blue: 'from-blue-50 to-blue-100',
  green: 'from-green-50 to-green-100',
  yellow: 'from-yellow-50 to-yellow-100',
  red: 'from-red-50 to-red-100'
};

const Card = ({ children, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
    {children}
  </div>
);

const StatCard = ({ title, icon, data, colorSet, gradient }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card gradient={gradient}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-3">
          {React.cloneElement(icon, { className: "h-6 w-6" })}
          {title}
        </h3>
        <span className="text-sm font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
          Total: {total}
        </span>
      </div>
      
      <div className="h-72">
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
                <Cell 
                  key={`cell-${index}`} 
                  fill={colorSet[index % colorSet.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value, name) => [
                `${value} (${((value/total)*100).toFixed(1)}%)`,
                name
              ]}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => (
                <span className="text-sm font-medium">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-white bg-opacity-60 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
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
  const [achievements, setAchievements] = useState([]);
  const [goals, setGoals] = useState([]);
  const [stories, setStories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const token =  JSON.parse(localStorage.getItem('auth'))?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const achievementsRes = await fetch(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/analytics`, {
          headers: {
            Authorization: token
          }
        });
        const goalsRes = await fetch(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/analytics`,{
          headers : {
            Authorization : token
          }
        });
        const storiesRes = await fetch(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/analytics`, {
          headers: {
            Authorization: token
          }
        });
        const tasksRes = await fetch(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/analytics`, {
          headers: {
            Authorization: token
          }
        });

        const achievementsData = await achievementsRes.json();
        const goalsData = await goalsRes.json();
        const storiesData = await storiesRes.json();
        const tasksData = await tasksRes.json();

        setAchievements(achievementsData.analytics);
        setGoals(goalsData.goal);
        setStories(storiesData.story);
        setTasks(tasksData.task);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const achievementsData = [
    { name: 'Private', value: achievements?.privateAchievements || 0 },
    { name: 'Public', value: achievements?.publicAchievements || 0 }
  ];


  const goalsData = [
    { name: 'Completed', value: goals?.totalCompletedGoals || 0 },
    { name: 'Incomplete', value: goals?.totalIncompleteGoals || 0 }
  ];

  const storiesData = [
    { name: 'Public', value: stories?.publicStories || 0 },
    { name: 'Private', value: (stories?.totalStories || 0) - (stories?.publicStories || 0) },
    { name: 'Comments', value: stories?.totalComments || 0 },
    { name: 'Likes', value: stories?.totalLikes || 0 }
  ];

  const tasksData = [
    { name: 'Completed', value: tasks?.completedTasks || 0 },
    { name: 'Pending', value: tasks?.pendingTasks || 0 }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Achievements"
            icon={<Award />}
            data={achievementsData}
            colorSet={COLORS.blue}
            gradient={GRADIENTS.blue}
          />
          <StatCard
            title="Goals"
            icon={<Target />}
            data={goalsData}
            colorSet={COLORS.green}
            gradient={GRADIENTS.green}
          />
          <StatCard
            title="Stories"
            icon={<BookOpen />}
            data={storiesData}
            colorSet={COLORS.yellow}
            gradient={GRADIENTS.yellow}
          />
          <StatCard
            title="Tasks"
            icon={<CheckSquare />}
            data={tasksData}
            colorSet={COLORS.red}
            gradient={GRADIENTS.red}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickStats;