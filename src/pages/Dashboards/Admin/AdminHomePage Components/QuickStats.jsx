import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Clock, DollarSign, BarChart2, Briefcase, Archive, Star, TrendingUp, ChevronUp, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

const data = [
  { name: 'Jan', users: 5000, retention: 88.2, revenue: 50000, newSignups: 800 },
  { name: 'Feb', users: 5500, retention: 89.6, revenue: 55000, newSignups: 950 },
  { name: 'Mar', users: 6000, retention: 92.1, revenue: 60000, newSignups: 1100 },
  { name: 'Apr', users: 6500, retention: 90.3, revenue: 65000, newSignups: 1200 },
  { name: 'May', users: 7000, retention: 87.5, revenue: 70000, newSignups: 1300 },
  { name: 'Jun', users: 7500, retention: 85.4, revenue: 75000, newSignups: 1400 },
];

const UserRetentionDashboard = () => {
  return (
    <div className=" p-8 rounded-lg ">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Vibrant User Retention Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="font-medium">+8.2% YoY</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <ChevronUp className="h-5 w-5 text-green-500" />
            <span className="font-medium">+2.1% MoM</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard title="Total Users" value="75,000" icon={<Users className="h-8 w-8 text-blue-300" />} />
        <StatCard title="Monthly Active Users" value="55,000" icon={<Clock className="h-8 w-8 text-pink-400" />} />
        <StatCard title="Total Revenue" value="$650,000" icon={<DollarSign className="h-8 w-8 text-yellow-300" />} />
        <StatCard title="Avg. Retention Rate" value="89.1%" icon={<Star className="h-8 w-8 text-green-400" />} />
        <StatCard title="New Signups" value="1,250 / 5,000" icon={<Briefcase className="h-8 w-8 text-red-400" />} />
        <StatCard title="Total Content" value="25,000" icon={<Archive className="h-8 w-8 text-teal-400" />} />
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
        <div className=" p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#ccc' }} />
              <YAxis tickLine={false} axisLine={{ stroke: '#ccc' }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className=" p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Retention Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#ccc' }} />
              <YAxis domain={[80, 100]} tickLine={false} axisLine={{ stroke: '#ccc' }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="retention" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

     
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className=" p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="text-lg font-medium">{title}</div>
      {icon}
    </div>
    <div className="text-4xl font-bold">{value}</div>
  </div>
);

export default UserRetentionDashboard;