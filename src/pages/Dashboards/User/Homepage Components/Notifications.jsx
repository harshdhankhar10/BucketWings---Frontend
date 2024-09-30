import React from 'react'

const Notifications = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <ul className="mt-2">
            <li className="border-b py-2">New message from Team Lead</li>
            <li className="border-b py-2">Task deadline approaching</li>
        </ul>
    </div>
);

}

export default Notifications