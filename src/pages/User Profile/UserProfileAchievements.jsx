import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserProfileAchievements = ({ achievements }) => {

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-8 mb-6 mt-8 mx-4"
      >
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Achievements</h2>
        <div className="flex justify-between items-center">
        {achievements.slice(0, 3).map((item, index) => (
          <div className="flex items-center space-x-3 mb-4 border-r-2 last:border-none"
          key={index}>
            <span >
              <img src={item.media || "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small_2x/no-image-available-icon-vector.jpg"} alt={item.title} className="w-24 h-24 rounded-lg" />
            </span>
            <div>
              <Link to={`/achievements/${item._id}` }>
              <h3 className="font-semibold text-gray-800 text-xl hover:text-purple-500">
                {item.title}
              </h3>
              </Link>
              <p className="text-sm text-gray-600 max-w-64">{item.description.substring(0,50 )}...</p>
            </div>
          </div>
        ))}
        </div>
      </motion.div>
    </>
  );
};

export default UserProfileAchievements;
