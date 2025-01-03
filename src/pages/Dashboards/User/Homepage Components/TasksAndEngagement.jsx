import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';



const TasksAndEngagement = () => {

    const taskData = [
        { category: 'Work', completed: 45, pending: 15 },
        { category: 'Personal', completed: 30, pending: 10 },
        { category: 'Learning', completed: 25, pending: 20 },
        { category: 'Health', completed: 35, pending: 8 },
      ];
      

    const engagementData = [
        { week: 'W1', views: 1200, likes: 450, shares: 200 },
        { week: 'W2', views: 1800, likes: 620, shares: 280 },
        { week: 'W3', views: 1400, likes: 580, shares: 250 },
        { week: 'W4', views: 2200, likes: 780, shares: 320 },
      ];
      

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-8">
     <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Tasks by Category</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={taskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" name="Completed" fill="#9333EA" />
            <Bar dataKey="pending" name="Pending" fill="#C084FC" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Content Engagement</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#9333EA" strokeWidth={2} />
            <Line type="monotone" dataKey="likes" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="shares" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
  )
}

export default TasksAndEngagement;