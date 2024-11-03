import React, { useEffect, useState } from 'react';
import { IoMdSettings, IoMdSearch, IoMdPeople } from "react-icons/io";
import axios from 'axios';

const LiveChatSidebar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const token = JSON.parse(localStorage.getItem('auth')).token;

    const handleUserSearch = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_REACT_APP_API}/api/v1/liveChat/search?search=${searchTerm}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        handleUserSearch();
    }, [searchTerm]);

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        BucketTalk
                    </h1>
                    <button
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        className="p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 rounded-full hover:bg-purple-50"
                    >
                        <IoMdSettings size={24} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none"
                    />
                    <button
                        onClick={handleUserSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                    >
                        <IoMdSearch size={24} />
                    </button>
                </div>
            </div>

            {/* Users List */}
            <div className="flex-grow overflow-y-auto">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 hover:bg-purple-50 transition-colors duration-200 cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img
                                        src={user.avatar}
                                        alt={user.fullName}
                                        className="w-12 h-12 rounded-full border-2 border-gray-100"
                                    />
                                    <span
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                            user.online ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-800">{user.fullName}</h2>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500">@{user.username}</span>
                                        <span className="text-xs text-gray-400">• {user.lastSeen}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Status Bar */}
            <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex items-center text-sm text-gray-600">
                    <IoMdPeople className="mr-2" />
                    <span>{users.filter((user) => user.online).length} online</span>
                </div>
            </div>
        </div>
    );
};

export default LiveChatSidebar;
