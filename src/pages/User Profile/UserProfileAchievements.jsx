import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserProfileAchievements = ({ achievements }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-6 py-4 border-t-2 border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={
                  item.media ||
                  "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small_2x/no-image-available-icon-vector.jpg"
                }
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <Link to={`/achievements/${item._id}`}>
                  <h3 className="font-semibold text-lg text-gray-800 hover:text-purple-500 transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mt-2">
                  {item.description.substring(0, 50)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default UserProfileAchievements;
