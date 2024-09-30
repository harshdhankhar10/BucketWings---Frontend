import React from 'react'

const RecentMessages = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Recent Messages</h2>
        <ul className="mt-2">
            <li className="border-b py-2">Message from John: "Hey, how's the project?"</li>
            <li className="border-b py-2">Message from Sarah: "Don't forget the meeting tomorrow!"</li>
        </ul>
    </div>
);

}

export default RecentMessages