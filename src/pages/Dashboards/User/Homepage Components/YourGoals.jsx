import React from 'react'

const YourGoals = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Your Goals</h2>
        <div className="mt-2">
            <div className="flex justify-between items-center">
                <span>Learn React</span>
                <div className="w-full bg-gray-200 rounded h-2 mx-2">
                    <div className="bg-blue-500 h-2 rounded w-3/4"></div>
                </div>
                <span>75%</span>
            </div>
            <div className="flex justify-between items-center mt-2">
                <span>Complete Dashboard</span>
                <div className="w-full bg-gray-200 rounded h-2 mx-2">
                    <div className="bg-blue-500 h-2 rounded w-50%"></div>
                </div>
                <span>50%</span>
            </div>
        </div>
    </div>
);
}

export default YourGoals