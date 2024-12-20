import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { Users, TrendingUp, Calendar, UserCheck, Activity } from 'lucide-react';
import { CiExport } from "react-icons/ci";
import * as XLSX from 'xlsx';

const VisitorsAnalyticsHomepage = () => {
  const [visitorStats, setVisitorStats] = useState({
    dailyVisitors: 0,
    weeklyVisitors: 0,
    monthlyVisitors: 0,
    totalVisitors: 0,
  });

  const [graphData, setGraphData] = useState([]);
  const [visitorInfo, setVisitorInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/visitor/admin/analytics`
        );
        if (response.data.success) {
          const { dailyVisitors, weeklyVisitors, monthlyVisitors, totalVisitors } =
            response.data.analytics;

          setVisitorStats({ dailyVisitors, weeklyVisitors, monthlyVisitors, totalVisitors });

          setGraphData([
            { name: 'Daily', visitors: dailyVisitors },
            { name: 'Weekly', visitors: weeklyVisitors },
            { name: 'Monthly', visitors: monthlyVisitors },
            { name: 'Total', visitors: totalVisitors },
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchVisitorInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/visitor/admin/all-visitors`);
        if (response.data.success) {
          setVisitorInfo(response.data.visitorTracking);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchVisitorInfo();
  }, []);

  const stats = [
    {
      title: "Daily Visitors",
      value: visitorStats.dailyVisitors,
      icon: <Users size={24} className="text-blue-500" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-500"
    },
    {
      title: "Weekly Visitors",
      value: visitorStats.weeklyVisitors,
      icon: <TrendingUp size={24} className="text-green-500" />,
      bgColor: "bg-green-50",
      textColor: "text-green-500"
    },
    {
      title: "Monthly Visitors",
      value: visitorStats.monthlyVisitors,
      icon: <Calendar size={24} className="text-yellow-500" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-500"
    },
    {
      title: "Total Visitors",
      value: visitorStats.totalVisitors,
      icon: <UserCheck size={24} className="text-purple-500" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-500"
    }
  ];

  const handleExportData = () => {
    const ws = XLSX.utils.json_to_sheet(visitorInfo);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors Analytics");
    XLSX.writeFile(wb, `visitors-analytics-${new Date().toLocaleDateString()}.xlsx`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = visitorInfo.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center gap-3 mb-8 justify-between">
        <div className="flex items-center gap-2">
          <Activity className="text-indigo-600 w-8 h-8" />
          <h1 className="text-4xl font-bold text-gray-800">Visitors Analytics</h1>
        </div>
        <div>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200">
            <CiExport className="w-6 h-6" /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-sm border border-gray-100 bg-white hover:shadow-md transition-shadow duration-200`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value.toLocaleString()}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-indigo-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">Visitors Overview</h2>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
            <YAxis tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ fill: '#4F46E5', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Visitors Info</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">IP Address</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Country</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Operating System</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Browser</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Visited At</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((visitor, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 text-purple-500 hover:text-purple-600">
                    <a href={`https://ipinfo.io/${visitor.ipAddress}?token=279457d25253b7`}  target='_blank' >
                      {visitor.ipAddress}</a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{visitor.country}</td>
                  <td className="border border-gray-300 px-4 py-2">{visitor.operatingSystem}</td>
                  <td className="border border-gray-300 px-4 py-2">{visitor.browser}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(visitor.visitedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md border border-gray-200 ${
                currentPage === 1 ? 'text-gray-400' : 'text-gray-800'
              }`}>
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(visitorInfo.length / itemsPerPage)}
              className={`px-4 py-2 rounded-md border border-gray-200 ${
                currentPage === Math.ceil(visitorInfo.length / itemsPerPage) ? 'text-gray-400' : 'text-gray-800'
              }`}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorsAnalyticsHomepage;