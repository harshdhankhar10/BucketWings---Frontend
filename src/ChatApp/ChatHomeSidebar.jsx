import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Settings, MessageCircle, LogOut } from 'lucide-react';

const ChatHomeSidebar = () => {
  const users = [
    {
      id: 1,
      name: "Sarah Wilson",
      avatar: "https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_158538-4914.jpg?t=st=1729319200~exp=1729322800~hmac=51b931b8a8a9aa8db8b066d115cebe31944f6ed27ce2b047833b84fce7fe92d0&w=740",
      status: "online",
      lastMessage: "Hey, how are you?",
      time: "2m ago"
    },
    {
      id: 2,
      name: "James Miller",
      avatar: "https://t3.ftcdn.net/jpg/02/58/89/90/240_F_258899001_68CalsKTRk6PZQgWH9JhR4heBlncCko9.jpg",
      status: "offline",
      lastMessage: "The project looks great!",
      time: "1h ago"
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://img.freepik.com/free-photo/young-couple-love-love-story-autumn-forest-park_1328-1983.jpg?t=st=1729319418~exp=1729323018~hmac=8bb724b8d146fe5b9a72f12655313cb6566acfbdba249f6abe49eae52bb8d75c&w=360",
      status: "online",
      lastMessage: "Can we meet tomorrow?",
      time: "3h ago"
    }
  ];

  return (
    <div className="h-screen w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-600">BucketTalk</h1>
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <MessageCircle size={20} className="text-purple-600" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <img
            src="https://i.postimg.cc/Fs0J49Kz/pixelcut-export-2.png"
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-800">Harsh</h2>
            <p className="text-sm text-gray-500">Available</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                    <Link to={`/chat/messages/132`}>
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                    {user.name}
                  </h3>
                    </Link>
                  <span className="text-xs text-gray-500">{user.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-around">
          <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
            <Users size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHomeSidebar;