import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillLike, AiFillEye, AiFillTag, AiFillCalendar, AiFillFolder } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import Swal from 'sweetalert2';

const ViewAchievement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/view/${id}`);
        setAchievement(response.data.achievement);
        setLikes(response.data.achievement.likes.length);
      } catch (error) {
        console.error('Error fetching achievement:', error);
      }
    };

    fetchAchievement();
  }, [id]);

  const handleEdit = () => {
    Swal.fire({
      title: 'Edit Achievement',
      text: 'Are you sure you want to edit this achievement?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/user/achievement/update/${id}`,
          { state: { achievement } }
        );
      }
    });
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this achievement!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/delete/${id}`);
          Swal.fire('Deleted!', 'Your achievement has been deleted.', 'success');
          navigate('/dashboard/user/achievement/all');
          setIsDeleting(false);
        } catch (error) {
          console.error('Error deleting the achievement:', error);
          Swal.fire('Error!', 'An error occurred while deleting the achievement.', 'error');
          setIsDeleting(false);
        }
      } else {
        setIsDeleting(false);
      }
    });
  };

  const handleLike = async () => {
    if (liked) return;
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/achievements/like/${id}`);
      setLikes(response.data.likes.length);
      setLiked(true);
    } catch (error) {
      console.error('Error liking the achievement:', error);
    }
  };

  if (!achievement) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            {achievement.media && (
              <img
                src={achievement.media}
                alt={achievement.title}
                className="w-full h-80 object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center px-4">
                {achievement.title}
              </h1>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="flex items-center">
                  <AiFillCalendar className="mr-2" />
                  {new Date(achievement.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <AiFillFolder className="mr-2" />
                  {achievement.category}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  className={`flex items-center px-4 py-2 rounded-full ${
                    liked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  } transition duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  disabled={liked}
                >
                  <AiFillLike className="mr-2" />
                  <span className="font-semibold">{likes}</span>
                </motion.button>
                <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-600">
                  <AiFillEye className="mr-2" />
                  <span className="font-semibold">{achievement.views}</span>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {achievement.description}
            </p>

            {achievement.tags && achievement.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {achievement.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    <AiFillTag className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <Link
                to="/dashboard/user/achievement/all"
                className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                <BiArrowBack className="mr-2" />
                Back to All Achievements
              </Link>
             <div className="flex items-center space-x-4">
            <motion.button
            onClick={handleEdit}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            
            Edit
              
            </motion.button>

             <motion.button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </motion.button>
             </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewAchievement;