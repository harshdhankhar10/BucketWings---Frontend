import React from 'react'
import { PlusCircle } from 'lucide-react'
import { Filter, Heart, MessageCircle, Share2, Star, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'



const CommunityHome = () => {
  return (
    <>
          <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">Community Forum</h1>
                  <Link to="/community/create-post">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition duration-300 shadow-md">
                    <PlusCircle size={18} />
                    <span>New Post</span>
                  </button>
                  </Link>
                </div>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-grow">
                    <input type="text" placeholder="Search discussions..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300">
                    <Filter size={18} />
                    <span>Filters</span>
                  </button>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <img src={`/api/placeholder/48/48`} alt="User Avatar" className="rounded-full" />
                        <div>
                          <h4 className="font-semibold text-lg text-gray-800">Alice Johnson</h4>
                          <p className="text-sm text-gray-500">Posted 2 hours ago in <a href="#" className="text-purple-600 hover:underline">Technology</a></p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">Hot Topic</span>
                          <Star className="text-yellow-400" size={18} />
                        </div>
                      </div>
                      <h3 className="font-semibold text-xl mb-2 text-gray-800">Exciting New Technology Trends in 2024</h3>
                      <p className="text-gray-600 mb-4">Let's discuss the most promising tech trends that are shaping our future. From AI advancements to sustainable tech, what are your thoughts on the innovations that will define the coming year?</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">#AI</span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">#SustainableTech</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">#FutureTrends</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 hover:text-purple-600 transition duration-300"><Heart size={16} /><span>42 Likes</span></button>
                          <button className="flex items-center space-x-2 hover:text-purple-600 transition duration-300"><MessageCircle size={16} /><span>23 Replies</span></button>
                          <button className="flex items-center space-x-2 hover:text-purple-600 transition duration-300"><Share2 size={16} /><span>Share</span></button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="text-yellow-500" size={16} />
                          <span>1.2k Views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition duration-300">
                    Load More Discussions
                  </button>
                </div>
              </div>
    </>
  )
}

export default CommunityHome