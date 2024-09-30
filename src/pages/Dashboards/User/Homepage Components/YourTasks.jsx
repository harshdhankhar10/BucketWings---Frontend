import React from 'react'

const YourTasks = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <ul className="mt-2">
            <li className="border-b py-2">Task: Write Blog Post</li>
            <li className="border-b py-2">Task: Review Code</li>
            <li className="border-b py-2">Task: Prepare Presentation</li>
        </ul>
    </div>
);
}

export default YourTasks