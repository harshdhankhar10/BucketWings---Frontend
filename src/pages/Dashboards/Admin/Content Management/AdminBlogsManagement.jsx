import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, Newspaper, Eye, Heart, Star, Globe, Lock, Tag, Layout } from 'lucide-react';

const AdminBlogsManagement = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/admin/analytics`
                );
                if (response.data.success) {
                    setAnalytics(response.data.analytics);
                } else {
                    setError("Failed to fetch analytics.");
                }
            } catch (error) {
                setError("An error occurred while fetching analytics.");
                console.error("Error fetching analytics:", error);
            }
            setLoading(false);
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
            </div>
          </div>          
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-red-800 font-medium">Error</h3>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!analytics) return null;

    const StatCard = ({ icon: Icon, title, value, className }) => (
        <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
            <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-blue-50">
                    <Icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Analytics Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={Newspaper} title="Total Blogs" value={analytics.totalBlogs} />
                    <StatCard icon={Eye} title="Total Views" value={analytics.totalViews} />
                    <StatCard icon={Heart} title="Total Likes" value={analytics.totalLikes} />
                    <StatCard icon={Star} title="Featured Blogs" value={analytics.FeaturedBlogs} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Blog Status</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <Globe className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-gray-500 text-sm">Public</p>
                                    <p className="text-xl font-semibold">{analytics.publicBlogs}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Lock className="h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="text-gray-500 text-sm">Private</p>
                                    <p className="text-xl font-semibold">{analytics.privateBlogs}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Content Organization</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <Layout className="h-5 w-5 text-purple-500" />
                                <div>
                                    <p className="text-gray-500 text-sm">Categories</p>
                                    <p className="text-xl font-semibold">{analytics.categories.length}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Tag className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="text-gray-500 text-sm">Tags</p>
                                    <p className="text-xl font-semibold">{analytics.tags.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-6">Blogs Published per Month</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics.blogsPerMonth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="month" 
                                    label={{ value: 'Month', position: 'bottom', offset: 0 }}
                                />
                                <YAxis
                                    label={{ value: 'Number of Blogs', angle: -90, position: 'insideLeft' }}
                                />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3B82F6" name="Blogs Published" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 max-h-56 overflow-scroll">
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                        <div className="flex flex-wrap gap-2">
                            {analytics.categories.map((category) => (
                               <a href={`/blog/category/${category}`} target="_blank" >
                               <span key={category} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                 {category}
                             </span>
                             </a>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 max-h-56 overflow-scroll">
                        <h2 className="text-xl font-semibold mb-4">Some Popular Tags </h2>
                        <div className="flex flex-wrap gap-2">
                            {analytics.tags.map((tag) => (
                                <a href={`/blog/tag/${tag}`} target="_blank" >
                                  <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                    {tag}
                                </span>
                                </a>
                            ))}
                        </div>
                    </div>

                  </div>
                  
            </div>
        </div>

    );
}

export default AdminBlogsManagement;
