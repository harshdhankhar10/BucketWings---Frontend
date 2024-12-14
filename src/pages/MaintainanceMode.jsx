import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Server, AlertTriangle } from 'lucide-react';
import { FaTools as Tool } from "react-icons/fa";


const MaintenanceModePage = () => {
  const [showDetails, setShowDetails] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const maintenanceDetails = [
    {
      icon: <Clock className="text-blue-500 w-12 h-12" />,
      title: "Estimated Duration",
      description: "We anticipate the maintenance to be completed within the next few hours."
    },
    {
      icon: <Server className="text-green-500 w-12 h-12" />,
      title: "System Upgrades",
      description: "We're performing critical infrastructure and performance improvements."
    },
    {
      icon: <Tool className="text-purple-500 w-12 h-12" />,
      title: "Ongoing Enhancements",
      description: "Our team is working to provide you with the best possible experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <motion.div 
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="w-full  bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-4">
              <AlertTriangle className="text-yellow-300 w-16 h-16" />
              Maintenance Mode
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Due to scheduled maintenance, our services are temporarily unavailable. We apologize for any inconvenience this may cause.
            </p>
          </motion.div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-6">
            {maintenanceDetails.map((detail, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">{detail.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {detail.title}
                </h3>
                <p className="text-gray-600">
                  {detail.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetails(!showDetails)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all"
            >
              {showDetails ? "Hide Details" : "More Information"}
            </motion.button>
          </div>

          {showDetails && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="mt-6 bg-gray-50 rounded-xl p-6 text-center"
            >
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                Technical Maintenance Details
              </h4>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our team is conducting comprehensive system maintenance to improve performance, security, and reliability. 
                We appreciate your patience and will restore services as quickly as possible.
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <a 
                  href="mailto:support@bucketwings.online" 
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
                >
                  Contact Support
                </a>
                <a 
                  href="https://status.example.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all"
                >
                  System Status
                </a>
              </div>
            </motion.div>
          )}
        </div>

        <div className="bg-gray-100 p-6 text-center">
          <p className="text-gray-600">
            We'll be back online soon. Thank you for your understanding.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MaintenanceModePage;