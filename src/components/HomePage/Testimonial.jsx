import React from "react";
import { motion } from "framer-motion";

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
    name: "Neha Gupta",
    image: "https://img.freepik.com/free-photo/beautiful-girl-with-blue-t-shirt_144627-10309.jpg?t=st=1727771510~exp=1727775110~hmac=7194b8b3ab65bb7d51a80127365cde5f73567d66517942fb185383dab86e3343&w=360",
    role: "Yoga Instructor",
    quote: "BucketWings guided my transition from corporate to yoga instructor. The journey became less overwhelming.",
    rating: 5,
    achievement: "Career transition to dream job"
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 ">
      <div className="container mx-auto text-center px-6 md:px-12">
        <motion.h2
          className="text-5xl font-extrabold text-gray-100 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="w-80 p-8 bg-white rounded-3xl shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              <div className="relative mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-400 transform transition-all hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 rounded-full">
                  <span className="text-yellow-400 font-bold">{testimonial.rating}★</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>
              <p className="text-gray-700 mb-4 italic">{`"${testimonial.quote}"`}</p>
              <p className="text-sm text-gray-600">Achievement: <span className="font-semibold">{testimonial.achievement}</span></p>
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-yellow-500"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
