import React from 'react'
import { motion } from 'framer-motion';
import { RiTimeLine, RiAlarmLine, RiFlag2Line, RiCustomerService2Line, RiTimer2Line  } from 'react-icons/ri';
import { Link } from 'react-router-dom';


const ManagementSection = ({tasks, goals, tickets}) => {

      
      const priorityColors = {
        High: 'bg-red-100 text-red-600',
        Medium: 'bg-yellow-100 text-yellow-600',
        Low: 'bg-blue-100 text-blue-600',
      };

      
      const statusColors = {
        'Open': 'bg-yellow-100 text-yellow-600',
      };

      const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      };
    
      
      console.log(tickets)
      
      
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
         <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Pending Tasks</h3>
        <Link className="text-purple-500 hover:text-purple-600 cursor-pointer text-sm" to="/dashboard/user/my-tasks">View All</Link>
      </div>
      <div className="space-y-4">
        {tasks?.allpendingTasks?.slice(0, 4).map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ x: 5 }}
            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2">
                <RiTimeLine className="text-primary" />
                <span className="font-medium">{task.title.substring(0, 30)}...</span>
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <RiAlarmLine className="mr-1" />
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {tasks?.allpendingTasks?.length === 0 && (
        <div className="flex items-center justify-center mt-6">
          <span className="text-gray-500">Enjoy your day! No pending tasks.</span>
        </div>
      )}
      {tasks?.allpendingTasks?.length > 4 && (
        <div className="flex items-center justify-center mt-6">
          <Link
            to="/dashboard/user/my-tasks"
            className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
          >
            View Remaining Tasks
          </Link>
        </div>
      )}
    </div>
    
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Ongoing Goals</h3>
        <Link className="text-purple-500 hover:text-purple-600 cursor-pointer text-sm" to="/dashboard/user/myGoals">View All</Link>
      </div>
      <div className="space-y-4">
        {goals?.pendingGoals?.slice(0,4).map((goal) => (
          <motion.div
            key={goal.id}
            whileHover={{ x: 5 }}
            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <RiFlag2Line className="text-primary" />
              <span className="font-medium">{goal.title}</span>
            </div>
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 rounded-full h-2"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <RiTimeLine className="mr-1" />
              <span>Deadline: {formatDate(goal.deadline)}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {goals?.pendingGoals?.length === 0 && (
        <div className="flex items-center justify-center mt-6">
          <span className="text-gray-500">No ongoing goals at the moment.</span>
        </div>
      )}
      {goals?.pendingGoals?.length > 4 && (
        <div className="flex items-center justify-center mt-6">
          <Link
            to="/dashboard/user/myGoals"
            className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
          >
            View Remaining Goals
          </Link>
        </div>
      )}
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm ">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Support Tickets</h3>
        <Link className="text-purple-500 hover:text-purple-600 cursor-pointer text-sm" to="/dashboard/user/support-ticket">View All</Link>
      </div>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            whileHover={{ x: 5 }}
            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2">
                <RiCustomerService2Line className="text-primary" />
                <span className="font-medium">{ticket.subject}</span>
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[ticket.status]}`}>
                {ticket.status}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <RiTimer2Line className="mr-1" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {tickets.length === 0 && (
        <div className="flex items-center justify-center mt-6">
          <span className="text-gray-500">No support tickets at the moment.</span>
        </div>
      )}
      {tickets.length > 4 && (
        <div className="flex items-center justify-center mt-6">
          <Link
            to="/dashboard/user/support-ticket"
            className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
          >
            View All Tickets
          </Link>
        </div>
      )}
    </div>
    </div>
  )
}

export default ManagementSection