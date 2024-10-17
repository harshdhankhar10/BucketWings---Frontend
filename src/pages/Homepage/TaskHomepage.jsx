import React from 'react';
import NavBar from '../../components/Navbar';
import { Helmet } from 'react-helmet';
import { ListCheck, Calendar, Bell, CheckSquare, Clipboard, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskHomepage = () => {
  return (
    <>
    <Helmet>
      <title>Task Management | BucketWings</title>
    </Helmet>
    <NavBar />
    
    {/* Hero Section */}
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Organize, Prioritize, and
              <span className="text-green-600"> Accomplish Tasks</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Manage your tasks effortlessly with our intuitive platform. Stay on top of deadlines, track progress, and improve productivity.
            </p>
            <div className="flex justify-center gap-4">
            <Link to="/register">
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center">
                Get Started
              </button>
            </Link>
             <Link to="/about">
             <button className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium border border-green-200">
                Learn More
              </button>
             </Link>
            </div>
          </div>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Manage Tasks?</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Managing tasks effectively helps you stay organized and productive, ensuring that deadlines are met and goals are achieved.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <ListCheck className="w-12 h-12 mx-auto text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Stay Organized</h3>
            <p className="text-gray-600">Categorize and prioritize your tasks, so you never miss a deadline.</p>
          </div>
          <div>
            <Calendar className="w-12 h-12 mx-auto text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Meet Deadlines</h3>
            <p className="text-gray-600">Schedule and assign due dates to ensure timely completion of tasks.</p>
          </div>
          <div>
            <Bell className="w-12 h-12 mx-auto text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Reminders & Alerts</h3>
            <p className="text-gray-600">Get timely reminders and notifications to stay on track with your tasks.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Key Features</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Our platform is designed to simplify your task management process. Here’s how we help you get things done.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: CheckSquare,
              title: "Create & Assign Tasks",
              description: "Easily create tasks and assign them to team members, ensuring accountability."
            },
            {
              icon: Clipboard,
              title: "Track Progress",
              description: "Monitor your task status from start to completion with our tracking tools."
            },
            {
              icon: Bell,
              title: "Automatic Reminders",
              description: "Receive automatic reminders about upcoming deadlines and important tasks."
            },
            {
              icon: Users,
              title: "Collaborate with Teams",
              description: "Work together with team members to complete shared tasks and projects."
            },
            {
              icon: Calendar,
              title: "Task Scheduling",
              description: "Plan and schedule tasks for specific dates to ensure nothing is overlooked."
            },
            {
              icon: ListCheck,
              title: "Task Templates",
              description: "Use task templates to quickly set up repeatable workflows for recurring tasks."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action (CTA) Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Streamline Your Task Management?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get started with our task management platform today and see how easy it is to manage your tasks and projects.
            </p>
<Link to="/register">
<button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Start Managing Tasks
            </button>
</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TaskHomepage;
