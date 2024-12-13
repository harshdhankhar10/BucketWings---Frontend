import React from 'react';
import { motion } from 'framer-motion';
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";

const UserProfileBlog = () => {
    const blogs = [
        {
            image: "https://picsum.photos/300/300",
            date: "2024-12-01",
            readTime: "5 min read",
            title: "The Future of Web Development",
            preview: "Explore the latest trends and technologies shaping the future of the web.",
            likes: 120,
            comments: 45,
        },
        {
            image: "https://picsum.photos/300/300",
            date: "2024-11-20",
            readTime: "8 min read",
            title: "Understanding React Hooks",
            preview: "A comprehensive guide to mastering React Hooks for modern applications.",
            likes: 85,
            comments: 30,
        },
        {
            image: "https://picsum.photos/300/300",
            date: "2024-10-15",
            readTime: "6 min read",
            title: "CSS in the Modern Era",
            preview: "Discover the power of modern CSS techniques to create stunning web designs.",
            likes: 140,
            comments: 50,
        },
    ];

    return (
        <>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 mx-4 mt-8 space-y-4"
        >
            <h2 className=" text-2xl font-bold text-gray-600 pl-2">User Blogs</h2>
            <div className="space-y-6 flex justify-center items-center gap-8 ">
            {blogs.map((blog, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-purple-600">{blog.date}</span>
                            <span className="text-sm text-gray-500">{blog.readTime}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{blog.preview}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center text-gray-500">
                                    <BiLike className="h-5 w-5 mr-1" />
                                    <span>{blog.likes}</span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                    <FaRegCommentDots className="h-5 w-5 mr-1" />
                                    <span>{blog.comments}</span>
                                </div>
                            </div>
                            <button className="text-purple-600 hover:text-purple-700 font-medium">
                                Read More
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
        </motion.div>
        </>
    );
};

export default UserProfileBlog;
