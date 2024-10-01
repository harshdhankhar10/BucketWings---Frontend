import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Target, CheckSquare, BarChart2, Bell, Share2, Award, ChevronDown } from 'lucide-react';

const steps = [
  {
    icon: Users,
    title: "Sign Up or Log In",
    description: "Begin your journey by creating a personalized account or logging in. This secure gateway ensures all your goals, progress, and achievements are safely stored and easily accessible.",
    details: "Our streamlined signup process allows you to create an account using your email, or conveniently sign in with your Google or Facebook credentials. Your data is encrypted and protected, giving you peace of mind as you embark on your goal-setting journey.",
    image: "https://img.freepik.com/premium-vector/new-user-online-registration-sign-up-concept-tiny-characters-signing-up-login-account-huge-smartphone-secure-password-mobile-app-web-access-cartoon-people-vector-illustration_87771-14223.jpg"
  },
  {
    icon: Target,
    title: "Set Your Goals",
    description: "Define your aspirations with our intuitive goal-setting interface. Categorize your objectives and set realistic deadlines to keep yourself motivated and on track.",
    details: "Our platform offers a diverse range of goal categories, from career advancement to personal growth. You can set both short-term and long-term goals, each with customizable deadlines. Our smart suggestion system can even help you refine your goals for maximum achievability.",
    image: "https://img.freepik.com/free-vector/flat-design-go-further-illustration_23-2150077086.jpg?t=st=1727770498~exp=1727774098~hmac=2f316f514ef88fa956d3406404bf78f442bd6517812aafdc3ed7ea8d900d4851&w=740"
  },
  {
    icon: CheckSquare,
    title: "Break Down Goals",
    description: "Transform big dreams into actionable steps. Divide your goals into manageable tasks and milestones, making the path to success clear and achievable.",
    details: "Our task breakdown tool helps you create a roadmap to success. For each goal, you can create a series of tasks, set priorities, and establish milestones. This systematic approach ensures you're always moving forward, tackling your goals one step at a time.",
    image: "https://img.freepik.com/free-vector/flat-design-go-further-illustration_23-2150077077.jpg?t=st=1727770523~exp=1727774123~hmac=deaea5980d9789b265e737a03baeb476b9160209f94b25bf0bfc9d2471b14215&w=996"
  },
  {
    icon: BarChart2,
    title: "Track Progress",
    description: "Stay motivated with our dynamic progress tracking. Visualize your journey with interactive charts and real-time updates on your personalized dashboard.",
    details: "Our advanced analytics provide insightful data on your goal progression. View completion percentages, time spent on tasks, and productivity trends. The intuitive interface allows you to easily identify areas of success and opportunities for improvement.",
    image: "https://img.freepik.com/free-vector/stock-exchange-data-concept_23-2148590844.jpg?t=st=1727770549~exp=1727774149~hmac=df38a38988c00656df367221569470f420c291648a64854b5100825ccee2512c&w=740"
  },
  {
    icon: Bell,
    title: "Receive Reminders",
    description: "Never miss a beat with our smart notification system. Receive timely reminders for tasks, deadlines, and milestones to keep you focused and on schedule.",
    details: "Customize your notification preferences to suit your style. Whether you prefer email reminders, push notifications, or in-app alerts, our system ensures you're always informed about upcoming deadlines and important milestones.",
    image: "https://img.freepik.com/free-vector/appointment-booking-calendar_23-2148559901.jpg?t=st=1727770590~exp=1727774190~hmac=b17467f75e958544ef62e4ff185b93cc5174b5353f3ac036d812367a752b445e&w=740"
  },
  {
    icon: Share2,
    title: "Collaborate",
    description: "Amplify your success by collaborating with others. Invite friends, family, or colleagues to join you on your journey, sharing goals and motivating each other.",
    details: "Our collaboration features allow you to create shared goals, assign tasks within a group, and track collective progress. Engage in friendly competition or work together towards common objectives, all within our secure and user-friendly platform.",
    image: "https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-bright-vibrant-violet-isolated-illustration_335657-580.jpg?t=st=1727770620~exp=1727774220~hmac=9e126920f544327199005d2fe0910c149806220378dc9c628a6ae0988c1241a9&w=996"
  },
  {
    icon: Award,
    title: "Achieve Success",
    description: "Celebrate your victories, big and small. Our platform recognizes your achievements, helping you reflect on your success and inspiring you to set new, ambitious goals.",
    details: "As you complete goals, you'll earn badges and awards that showcase your accomplishments. Our reflection tools help you analyze your journey, learning from both successes and challenges. Use these insights to set even more ambitious goals and continue your path of personal growth.",
    image: "https://img.freepik.com/free-vector/businessman-holds-cup-top-column-graph-key-success-success-story-business-chance-way-success-concept-white-background_335657-2032.jpg?t=st=1727770646~exp=1727774246~hmac=b484269148bdfe6982da35865541aa5d957c9a05c78e8e9f921147efa5ee1258&w=996"
  }
];

const StepCard = ({ step, index, isOpen, toggleOpen }) => {
  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 rounded-full p-3 mr-4">
            <step.icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{step.description}</p>
        <motion.button
          className="flex items-center text-blue-600 font-medium"
          onClick={toggleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? "Show Less" : "Learn More"}
          <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <p className="text-gray-700 mb-4">{step.details}</p>
            <img src={step.image} alt={step.title} className="w-full h-48 object-cover rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HowItWorks = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-4 text-blue-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Embark on a transformative journey with our intuitive platform. From setting ambitious goals to celebrating your achievements, we're here to guide you every step of the way.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              isOpen={openIndex === index}
              toggleOpen={() => toggleOpen(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;