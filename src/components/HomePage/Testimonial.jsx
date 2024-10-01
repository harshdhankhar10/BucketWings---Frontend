import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    image: "https://img.freepik.com/free-photo/cute-student-girl-desk_144627-18531.jpg?t=st=1727771536~exp=1727775136~hmac=712fa526a9cc89f1c32aa0546f52c9cf80babc0435dd2b32793d677526858a7b&w=360",
    role: "Aspiring Entrepreneur",
    quote: "BucketWings turned my startup dream into reality. The goal-setting and progress tracking kept me accountable!",
    rating: 5,
    achievement: "Launched successful startup"
  },
  {
    name: "Rajesh Patel",
    image: "https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?t=st=1727771415~exp=1727775015~hmac=39b4cde6e41bb77b8cd15e16e15f14146959c306726521a106ec8db22cf0ecc0&w=360",
    role: "Fitness Enthusiast",
    quote: "Thanks to BucketWings, I finally ran my first marathon! The milestone tracking was a game-changer.",
    rating: 5,
    achievement: "Completed first marathon"
  },
  {
    name: "Ananya Desai",
    image: "https://img.freepik.com/free-photo/portrait-cute-smiley-woman_23-2148728645.jpg?t=st=1727771476~exp=1727775076~hmac=c5a93ce53f7fc5c403ce91de3958d9002ad20b74e4632e9b93c37009e6f351d4&w=740",
    role: "Travel Blogger",
    quote: "BucketWings revolutionized my adventure planning. I've visited 10 countries in just a year!",
    rating: 4,
    achievement: "Visited 10 countries in a year"
  },
  {
    name: "Vikram Malhotra",
    image: "https://img.freepik.com/free-photo/guy-plaid-shirt_158595-125.jpg?t=st=1727771441~exp=1727775041~hmac=23eff2bc310c99bd2eff1cf20aaf0e1a0cc752dce5a1de6f320a7f7894c4e96c&w=360",
    role: "Software Developer",
    quote: "BucketWings helped our team crush project deadlines. Great for professional growth too!",
    rating: 5,
    achievement: "Increased team productivity by 40%"
  },
  {
    name: "Neha Gupta",
    image: "https://img.freepik.com/free-photo/beautiful-girl-with-blue-t-shirt_144627-10309.jpg?t=st=1727771510~exp=1727775110~hmac=7194b8b3ab65bb7d51a80127365cde5f73567d66517942fb185383dab86e3343&w=360",
    role: "Yoga Instructor",
    quote: "BucketWings guided my transition from corporate to yoga instructor. The journey became less overwhelming.",
    rating: 5,
    achievement: "Career transition to dream job"
  },
];

const TestimonialsGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gradient-to-br bg-[#F3F4F6] py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 text-[#1E40AF]">Success Stories</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center justify-center"
            >
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <motion.img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg mx-auto"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="lg:w-1/2 lg:pl-12">
                <blockquote className="text-2xl italic font-bold text-[#1E40AF] mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="inline-block w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-3xl font-bold text-[#1F2937] mb-2">{testimonials[currentIndex].name}</h3>
                <p className="text-xl text-indigo-800 mb-4 font-semibold">{testimonials[currentIndex].role}</p>
                <div className="bg-[#325adb] bg-opacity-90 rounded-lg p-4 inline-block">
                  <p className="text-lg font-semibold text-white">
                    Achievement: {testimonials[currentIndex].achievement}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-12 space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-white text-indigo-800 rounded-full p-3 hover:bg-indigo-100 transition duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white text-indigo-800 rounded-full p-3 hover:bg-indigo-100 transition duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGallery;