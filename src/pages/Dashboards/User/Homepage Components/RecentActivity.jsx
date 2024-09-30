import React from 'react'

const RecentActivity = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <ul className="mt-2">
            <li className="border-b py-2">Completed Task: Design Mockup</li>
            <li className="border-b py-2">Achieved Goal: Launch Website</li>
            <li className="border-b py-2">Completed Milestone: First Release</li>
        </ul>
    </div>
);
}

export default RecentActivity