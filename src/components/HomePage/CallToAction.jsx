import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-800 py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-indigo-800">
            Ready to Achieve Your Dreams?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-8">
            Join thousands of goal-achievers and start your journey to success today!
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              "Set and track personalized goals",
              "Break down big dreams into actionable steps",
              "Connect with a supportive community",
              "Celebrate your achievements"
            ].map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center text-gray-700"
              >
                <Check className="w-5 h-5 text-green-500 mr-2" />
                {feature}
              </motion.li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-indigo-700 transition duration-300 w-full sm:w-auto"
            >
              Lets Get Started
            </motion.button>
            <motion.a
              href="#learn-more"
              whileHover={{ x: 5 }}
              className="text-indigo-600 font-semibold flex items-center justify-center text-lg w-full sm:w-auto"
            >
              Learn More <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400 rounded-full opacity-20"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;