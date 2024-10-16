import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, Target, BookOpen, CheckSquare } from "lucide-react";

// Custom Card components
const Card = ({ className, children }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ className, children }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const QuickStats = () => {
  const [data, setData] = useState({
    achievements: {},
    goals: {},
    stories: {},
    tasks: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achievementsRes, goalsRes, storiesRes, tasksRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/analytics`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/analytics`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/analytics`),
          axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/analytics`)
        ]);

        setData({
          achievements: achievementsRes.data.achievements,
          goals: goalsRes.data.goal,
          stories: storiesRes.data.story,
          tasks: tasksRes.data.tasks
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, icon, items, color }) => (
    <Card className={`bg-${color}-100`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <span>{icon}</span>
      </CardHeader>
      <CardContent>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center mt-1">
            <span className="text-md font-medium text-gray-600">{item.name}</span>
            <span className={`text-2xl font-bold text-${color}-700`}>{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const achievementsData = [
    // { name: 'Featured', value: data.achievements.featuredAchievements },
    // { name: 'Non-Featured', value: data.achievements.nonFeaturedAchievements },
    // { name: 'Private', value: data.achievements.privateAchievements },
    // { name: 'Public', value: data.achievements.publicAchievements }
  ];

  const goalsData = [
    { name: 'Completed', value: data.goals.totalCompletedGoals },
    { name: 'Incomplete', value: data.goals.totalIncompleteGoals }
  ];

  const storiesData = [
    { name: 'Public', value: data.stories.publicStories },
    { name: 'Total', value: data.stories.totalStories },
    { name: 'Comments', value: data.stories.totalComments },
    { name: 'Likes', value: data.stories.totalLikes }
  ];

  const tasksData = [
    { name: 'Completed', value: data.tasks.completedTasks },
    { name: 'Pending', value: data.tasks.pendingTasks }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Achievements"
        icon={<Award className="h-4 w-4 text-blue-600" />}
        items={achievementsData}
        color="blue"
      />
      <StatCard
        title="Goals"
        icon={<Target className="h-4 w-4 text-green-600" />}
        items={goalsData}
        color="green"
      />
      <StatCard
        title="Stories"
        icon={<BookOpen className="h-4 w-4 text-yellow-600" />}
        items={storiesData}
        color="yellow"
      />
      <StatCard
        title="Tasks"
        icon={<CheckSquare className="h-4 w-4 text-red-600" />}
        items={tasksData}
        color="red"
      />
    </div>
  );
}

export default QuickStats;