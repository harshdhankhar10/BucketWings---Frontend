import { motion } from 'framer-motion';
import { RiArrowUpLine, RiArrowDownLine, RiTimeLine, RiCheckLine } from 'react-icons/ri';


const  InsightsSection = ({tasks, goals,stories,achievements,blogs}) => {

  const tasksCompletionRate = (tasks?.completedTasks && tasks?.totalTasks) * 100;

  const insights = [
    {
      metric: 'Focus Time',
      value: '6.2 hrs',
      icon: RiTimeLine,
    },
    {
      metric: 'Task Completion Rate',
      value: `${tasksCompletionRate.toFixed()}%` || 'N/A',
      icon: RiCheckLine,
    },
    {
      metric: 'Average Response Time',
      value: '2.5 hrs',
      icon: RiTimeLine,
    },
  ];
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm my-8">
      <h3 className="text-lg font-semibold mb-4">Productivity Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <motion.div
            key={insight.metric}
            whileHover={{ y: -5 }}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <insight.icon className="text-primary text-xl" />
              <span className="text-sm text-gray-600">{insight.metric}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">{insight.value}</span>
              <span className={`flex items-center text-sm ${
                insight.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default InsightsSection