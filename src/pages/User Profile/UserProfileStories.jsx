import React from 'react';
import { motion } from 'framer-motion';

const UserProfileStories = () => {
    const stories = [
        {
            title: "The Journey to Excellence",
            previewDescription: "Discover how a team of innovators transformed challenges into opportunities.",
            date: "2024-12-01",
        },
        {
            title: "A Day in the Life of a Developer",
            previewDescription: "An insightful look into the daily routine and challenges of a software engineer.",
            date: "2024-11-15",
        },
        {
            title: "Breaking Barriers in Technology",
            previewDescription: "Learn about groundbreaking innovations shaping the future of tech.",
            date: "2024-10-30",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 mx-4 mt-8 space-y-4"
        >
            <h2 className=" text-2xl font-bold text-gray-600 pl-2">User Stories</h2>
                <div className='flex'>
                {stories.map((story, index) => (
                <div
                    key={index}
                    className="border-r pl-4  last:border-none pb-4 flex items-start space-x-4"
                >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 text-xl mb-1">
                            {story.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                            {story.previewDescription}
                        </p>
                    </div>
                </div>
            ))}
                    </div>
        </motion.div>
    );
};

export default UserProfileStories;
