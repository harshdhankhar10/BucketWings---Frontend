import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800"
          {...fadeInUp}
        >
          About BucketWings
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-80 bg-blue-200 rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241253.jpg?t=st=1727771797~exp=1727775397~hmac=356c4d4aec5c63c97e3c0838c0f81c5cf865126e9eca671762c92dcdbebdb8d4&w=996" 
                alt="BucketWings Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-yellow-400 rounded-full flex items-center justify-center p-4">
              <p className="text-blue-800 font-bold text-lg text-center">Empowering dreams since 2020</p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <h3 className="text-3xl font-semibold mb-4 text-blue-700">Our Story</h3>
            <p className="text-gray-700 mb-6">
              BucketWings was born from a simple idea: everyone deserves the tools and support to achieve their dreams. 
              Founded by a group of passionate goal-setters, we've experienced firsthand the power of turning aspirations into reality.
            </p>
            <p className="text-gray-700">
              Our journey began when we realized that many people struggle to bridge the gap between their dreams and daily actions. 
              We set out to create a platform that not only helps individuals set meaningful goals but also provides them with the 
              structure, motivation, and community support needed to achieve those goals.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-3xl font-semibold mb-4 text-blue-700">Our Mission</h3>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            To empower individuals to dream big, set ambitious goals, and provide them with the tools and community 
            support needed to turn those dreams into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Target, title: "Goal Setting", description: "We help you set clear, achievable goals that align with your passions." },
            { icon: Users, title: "Community", description: "Connect with like-minded individuals who support and inspire you." },
            { icon: Lightbulb, title: "Innovation", description: "We constantly evolve our platform to meet your goal-achieving needs." },
            { icon: Heart, title: "Personal Growth", description: "We're committed to your personal and professional development." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <item.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-blue-700">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;