import React from 'react';

const LatestUserRegistrations = () => {
  const users = [
    {
      username: 'johnsmith',
      registeredAt: '2023-04-12',
      email: 'john.smith@example.com',
      fullName: 'John Smith',
      profilePicture: 'https://example.com/john-smith.jpg'
    },
    {
      username: 'janedoe',
      registeredAt: '2023-04-10',
      email: 'jane.doe@example.com',
      fullName: 'Jane Doe',
      profilePicture: 'https://example.com/jane-doe.jpg'
    },
    {
      username: 'bobwilliams',
      registeredAt: '2023-04-08',
      email: 'bob.williams@example.com',
      fullName: 'Bob Williams',
      profilePicture: 'https://example.com/bob-williams.jpg'
    },
    {
      username: 'sarahjohnson',
      registeredAt: '2023-04-06',
      email: 'sarah.johnson@example.com',
      fullName: 'Sarah Johnson',
      profilePicture: 'https://example.com/sarah-johnson.jpg'
    },
    {
      username: 'michaelbrown',
      registeredAt: '2023-04-04',
      email: 'michael.brown@example.com',
      fullName: 'Michael Brown',
      profilePicture: 'https://example.com/michael-brown.jpg'
    }
  ];

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Latest User Registrations</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-purple-500 text-white">
              <th className="px-4 py-3 text-left">Profile</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Registered At</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Full Name</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 5).map((user, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-200 transition-colors duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="px-4 py-3">
                  <img src={`https://img.freepik.com/free-photo/charming-long-haired-woman-blowing-kiss-looking-straight-holding-present_176420-8962.jpg?t=st=1731687485~exp=1731691085~hmac=b0f000760a6e8c6066cb78163646fd25f4abdce60e131ba345676d6d96bbf6a5&w=360`} alt={user.fullName} className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{user.username}</td>
                <td className="px-4 py-3 text-gray-700">{user.registeredAt}</td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-gray-700">{user.fullName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestUserRegistrations;