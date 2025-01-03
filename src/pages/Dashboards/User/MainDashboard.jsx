import React, {useState, useEffect} from "react";
import MetricsOverview from "./Homepage Components/MetricsOverview";
import ManagementSection from "./Homepage Components/ManagementSection";
import QuickStats from "./Homepage Components/QuickStats";
import MotivationalQuote from "./Homepage Components/MotivationalQuote";
import InsightsSection from "./Homepage Components/InsightsSection";
import ResourceHighlights from "./Homepage Components/ResourceHighlights";
import TasksAndEngagement from "./Homepage Components/TasksAndEngagement";
import { Helmet } from "react-helmet";
import axios from "axios";
const MainDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [stories, setStories] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/tasks/analytics`);
      if(response.data.success){
        setTasks(response.data.task);
        setLoading(false);
      }
    };

    const fetchGoals = async () => {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/analytics`);
      if(response.data.success){
        setGoals(response.data.goal);
        setLoading(false);
      }
    };

    const fetchStories = async () => {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/analytics`);
      if(response.data.success){
        setStories(response.data.story);
        setLoading(false);
      }
    };

    const fetchAchievements = async () => {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/my-achievements`);
      if(response.data.success){
        setAchievements(response.data.analytics);
        setLoading(false);
      }
    };

    const fetchBlogs = async () => {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/user/analytics`);
      if(response.data.success){
        setBlogs(response.data.analytics);
        setLoading(false);
      }
    };

    const fetchTickets = async () => {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/support-tickets/my-support-tickets`);
      if(response.data.success){
        setTickets(response.data.supportTickets);
        setLoading(false);
      }
    };

    fetchTasks();
    fetchGoals();
    fetchStories();
    fetchAchievements();
    fetchBlogs();
    fetchTickets();
  }, []);



  return (
    <>
      <Helmet>
        <title>Dashboard - BucketWing</title>
      </Helmet>
      <main className="p-2 py-4" >
      <QuickStats tasks={tasks} goals={goals} stories={stories} achievements={achievements} blogs={blogs}/>
      {/* <MetricsOverview/> */}
      <InsightsSection tasks={tasks} goals={goals} stories={stories} achievements={achievements} blogs={blogs}/>
      {/* <TasksAndEngagement/> */}
      <ManagementSection tasks={tasks} goals={goals} tickets={tickets}/>
      <ResourceHighlights/>
      <MotivationalQuote/>
      </main>
    </>
  );
};

export default MainDashboard;
