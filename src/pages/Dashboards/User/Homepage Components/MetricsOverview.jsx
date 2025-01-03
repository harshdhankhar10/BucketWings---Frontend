import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const MetricsOverview = () => {
    const score = 78;
    const previousScore = 65;
    const improvement = ((score - previousScore) / previousScore * 100).toFixed(1);
    const focusData = [
        { time: '9AM', score: 85 },
        { time: '10AM', score: 92 },
        { time: '11AM', score: 78 },
        { time: '12PM', score: 65 },
        { time: '1PM', score: 70 },
        { time: '2PM', score: 88 },
        { time: '3PM', score: 82 },
      ];
      const timeData = [
        { name: 'Tasks', value: 35, color: '#9333EA' },
        { name: 'Meetings', value: 20, color: '#3B82F6' },
        { name: 'Learning', value: 25, color: '#10B981' },
        { name: 'Planning', value: 20, color: '#F59E0B' },
      ];
      
      
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 mt-8">
     <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Productivity Score</h3>
      <div className="flex items-center gap-8">
        <div className="w-32">
          <CircularProgressbar 
            value={score} 
            text={`${score}%`}
            styles={buildStyles({
              pathColor: '#9333EA',
              textColor: '#9333EA',
              trailColor: '#F3E8FF'
            })}
          />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Previous Score: {previousScore}%</p>
          <p className="text-sm text-green-600">+{improvement}% Improvement</p>
        </div>
      </div>
    </div>
    <div className="md:col-span-2">
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Focus Metrics</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={focusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#9333EA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Time Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={timeData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {timeData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
  )
}

export default MetricsOverview