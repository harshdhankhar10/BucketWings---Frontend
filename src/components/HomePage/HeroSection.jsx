import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const HeroSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    {
      imgUrl: "https://images.unsplash.com/photo-1610540604745-3e96fba9ccef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8R29hbCUyMFNldHRpbmd8ZW58MHx8MHx8fDA%3D",
      subheading: "Goal Setting",
      heading: "Dream it, plan it, achieve it",
      content: "Easily set personal and professional goals with BucketWing. Create actionable plans, track your progress, and stay motivated as you work towards achieving your aspirations.",
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1511056995740-3a1dcbb1d7e5?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      subheading: "Collaboration",
      heading: "Share your journey",
      content: "Collaborate with friends and family by sharing your goals. Get support, encouragement, and accountability from your network as you all work towards your individual objectives.",
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1554191248-5691c5ecb1f1?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      subheading: "Progress Tracking",
      heading: "Stay on track with ease",
      content: "Visualize your progress with interactive charts and reminders. BucketWing helps you see how far you've come and what steps you need to take to achieve your goals on time.",
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1589648048828-63c7e3cc3f43?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      subheading: "Community Support",
      heading: "Join a like-minded community",
      content: "Become part of a vibrant community where you can share experiences, seek advice, and find inspiration. Engage in discussions and learn from others who are on similar journeys.",
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1575544972308-cf20619efc0e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      subheading: "Resource Library",
      heading: "Tools and tips for success",
      content: "Access a wealth of resources, including articles, videos, and guides designed to help you succeed. Equip yourself with knowledge and strategies to overcome challenges.",
    },
    {
      imgUrl: "https://images.unsplash.com/photo-1560845175-33b88eac3b20?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      subheading: "Achievements Showcase",
      heading: "Celebrate your victories",
      content: "Document and showcase your achievements as you reach your goals. Share your milestones with your community and receive recognition for your hard work and dedication.",
    },
  ];

  return (
    <div className=" bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen text-white overflow-hidden">
      <div className="relative h-screen">
        <ParallaxBackground imgUrl={features[activeFeature].imgUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent " />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 ">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center relative -top-16"
            >
              <h2 className="text-2xl md:text-4xl font-semibold mb-2 text-purple-300">
                {features[activeFeature].subheading}
              </h2>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
                {features[activeFeature].heading}
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
                {features[activeFeature].content}
              </p>
              <button className="bg-white text-purple-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-100 transition-colors inline-flex items-center">
                Start Your Journey <FiArrowUpRight className="ml-2" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
        <FeatureNavigation
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          totalFeatures={features.length}
        />
      </div>
    </div>
  );
};

const ParallaxBackground = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        scale,
        opacity,
      }}
      className="absolute inset-0"
    />
  );
};

const FeatureNavigation = ({ activeFeature, setActiveFeature, totalFeatures }) => {
  return (
    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-4">
      <button
        onClick={() => setActiveFeature((prev) => (prev - 1 + totalFeatures) % totalFeatures)}
        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalFeatures }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveFeature(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeFeature ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
      <button
        onClick={() => setActiveFeature((prev) => (prev + 1) % totalFeatures)}
        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HeroSection;
