import React from 'react'

const QuickStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Goals</h2>
            <p className="text-2xl">5</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <p className="text-2xl">8</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Milestones</h2>
            <p className="text-2xl">2</p>
        </div>
    </div>
);
}

export default QuickStats