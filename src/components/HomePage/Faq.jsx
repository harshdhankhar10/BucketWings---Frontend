import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-gray-800">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-blue-500" />
        ) : (
          <ChevronDown className="w-6 h-6 text-blue-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-4 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "Is BucketWings really 100% free?",
      answer: "Yes, BucketWings is completely free for all users! We believe that everyone should have access to tools that help them achieve their dreams, regardless of their financial situation. Our platform is funded through partnerships and optional premium features, but all core functionalities are available to every user at no cost. This includes goal setting, progress tracking, community access, and basic analytics. We're committed to keeping BucketWings accessible to all, empowering everyone to turn their aspirations into reality without any financial barriers."
    },
    {
      question: "How do I get started with BucketWings?",
      answer: "Getting started with BucketWings is quick and easy! Here's a step-by-step guide: 1) Visit our website and click the 'Sign Up' button. 2) Create an account using your email address or sign up with your Google or Facebook account. 3) Once logged in, you'll be guided through a brief onboarding process where you can set your first goal. 4) Explore the platform – set more goals, break them down into actionable tasks, and connect with our supportive community. 5) Use the progress tracking tools to monitor your journey and celebrate your achievements along the way. Remember, our support team is always available if you need any assistance during the setup process or as you use the platform."
    },
    {
      question: "What types of goals can I set on BucketWings?",
      answer: "BucketWings is designed to accommodate a wide range of goals across various aspects of life. You can set personal development goals (like learning a new skill), career objectives (such as getting a promotion), health and fitness goals (like running a marathon), financial targets (e.g., saving for a big purchase), travel aspirations (visiting new countries), relationship goals, and much more. Our platform is flexible enough to handle both short-term goals that might take a few weeks and long-term dreams that could span years. You can also set multiple goals simultaneously and prioritize them based on your current focus. Whatever your aspirations, BucketWings provides the structure and support to help you achieve them."
    },
    {
      question: "How does BucketWings help me achieve my goals?",
      answer: "BucketWings employs a multi-faceted approach to help you achieve your goals: 1) Goal Setting Framework: We guide you through setting SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals. 2) Task Breakdown: Large goals are divided into smaller, manageable tasks, making them less overwhelming. 3) Progress Tracking: Visual tools like progress bars and milestone markers help you see how far you've come. 4) Reminders and Notifications: Customizable alerts keep you on track and motivated. 5) Community Support: Connect with like-minded individuals for motivation, advice, and accountability. 6) Resource Library: Access articles, videos, and tips related to goal-setting and achievement. 7) Analytics: Gain insights into your progress patterns and productivity. 8) Celebration Mechanisms: We help you acknowledge and celebrate your achievements, boosting motivation. By combining these features, BucketWings creates a comprehensive ecosystem designed to maximize your chances of turning your dreams into reality."
    },
    {
      question: "Can I collaborate with others on BucketWings?",
      answer: "Absolutely! Collaboration is a key feature of BucketWings. We believe that working together can significantly boost motivation and success rates. Here's how you can collaborate: 1) Shared Goals: Create goals that multiple users can work on together. This is great for family projects, team objectives, or group challenges. 2) Accountability Partners: Connect with a friend or community member who can check in on your progress and offer support. 3) Community Groups: Join or create groups based on shared interests or goals. These can be public or private. 4) Progress Sharing: Choose to share your progress on specific goals with selected individuals or groups. 5) Challenges: Participate in or create community challenges to work towards a common goal with others. 6) Discussion Forums: Engage in conversations, ask for advice, or offer support in our community forums. 7) Mentorship: More experienced users can offer guidance to those just starting their journey. Remember, while collaboration can be incredibly motivating, you always have control over your privacy settings and can choose how much you want to share."
    },
    {
      question: "How does BucketWings ensure my privacy and data security?",
      answer: "At BucketWings, we take your privacy and data security very seriously. Here's how we protect your information: 1) Data Encryption: All data transmitted between your device and our servers is encrypted using industry-standard protocols. 2) Secure Servers: We use robust, secure servers with multiple layers of protection against unauthorized access. 3) Regular Security Audits: We conduct frequent security assessments to identify and address potential vulnerabilities. 4) Privacy Controls: You have full control over what information you share and with whom. By default, your goals and progress are private. 5) No Data Selling: We never sell your personal data to third parties. 6) Transparent Privacy Policy: Our comprehensive privacy policy clearly outlines how we collect, use, and protect your data. 7) Two-Factor Authentication: For an extra layer of security, you can enable two-factor authentication on your account. 8) GDPR Compliance: We adhere to GDPR guidelines, ensuring your data rights are protected. 9) Data Portability: You can request a copy of your data at any time. If you have any specific concerns about privacy or security, our dedicated support team is always available to address them."
    },
    {
      question: "What if I need help or have issues while using BucketWings?",
      answer: "We're committed to providing excellent support to all our users. If you need help or encounter any issues while using BucketWings, here are the ways we can assist you: 1) In-App Help Center: Access our comprehensive help documentation directly within the platform. This covers most common questions and issues. 2) Community Support: Our active user community can often provide quick answers and tips based on their experiences. 3) Email Support: Reach out to our dedicated support team via email for personalized assistance. We aim to respond to all inquiries within 24 hours. 4) Live Chat: During business hours, you can use our live chat feature for real-time support. 5) Video Tutorials: We offer a range of video tutorials covering various aspects of using BucketWings effectively. 6) FAQ Section: This regularly updated section addresses the most common questions and concerns. 7) Feedback System: If you encounter a bug or have a suggestion for improvement, you can submit it directly through our feedback system. 8) Social Media: Follow us on social media platforms for updates, tips, and quick responses to queries. Remember, we're here to help you succeed, so don't hesitate to reach out if you need any assistance!"
    },
    {
      question: "Can I use BucketWings on my mobile device?",
      answer: "Yes, BucketWings is fully optimized for mobile use! We understand the importance of being able to access and update your goals on the go. Here's what you need to know about using BucketWings on mobile devices: 1) Responsive Web Design: Our website is fully responsive, meaning it adapts seamlessly to any screen size. You can access all features through your mobile web browser. 2) Mobile Apps: We offer dedicated apps for both iOS and Android devices. These can be downloaded for free from the App Store and Google Play Store respectively. 3) Sync Across Devices: Your account automatically syncs across all devices, so you can start setting a goal on your computer and continue on your phone without missing a beat. 4) Offline Mode: Our mobile apps offer an offline mode, allowing you to update your progress even without an internet connection. Changes will sync once you're back online. 5) Push Notifications: Mobile users can receive push notifications for reminders, updates, and motivational messages. 6) Touch-Optimized Interface: Our mobile interface is designed for touch screens, making it easy to navigate and update your goals with just a few taps. 7) Mobile-Specific Features: Some features, like the ability to add photos directly to your goal journal, are optimized for mobile use. Whether you prefer to use BucketWings on your computer or your mobile device, we ensure a seamless and fully-featured experience to keep you connected to your goals wherever you are."
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-blue-800"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;