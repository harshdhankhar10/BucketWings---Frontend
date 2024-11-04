import React, { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { FaArchive } from 'react-icons/fa';
import { FaRegShareFromSquare } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import CreateNote from './CreateNewNote';
import { MdOutlineClose } from "react-icons/md";


const AllNotes = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [notes, setNotes] = useState([
    {
      "id": 1,
      "title": "Project Planning",
      "description": "Outline key milestones and tasks for the upcoming project, ensuring resource allocation is managed effectively. Review with the team on Monday.",
      "date": "2023-09-15",
      "tags": ["project", "planning", "milestones"]
    },
    {
      "id": 2,
      "title": "Meeting Notes - Client A",
      "description": "Discussed project timelines, deliverables, and budget. Agreed on weekly updates and priority on feature X. Action items assigned to team members.",
      "date": "2023-09-18",
      "tags": ["meeting", "client", "notes"]
    },
    {
      "id": 3,
      "title": "UI/UX Design Ideas",
      "description": "Inspiration for clean and modern UI elements. Consider integrating rounded buttons and minimalist navigation. Emphasis on user flow and accessibility.",
      "date": "2023-09-20",
      "tags": ["design", "UI/UX", "inspiration"]
    },
    {
      "id": 4,
      "title": "Market Research Summary",
      "description": "Summarized findings on current market trends, competitive analysis, and target demographics for Q3 product release.",
      "date": "2023-09-22",
      "tags": ["research", "market", "summary"]
    },
    {
      "id": 5,
      "title": "Code Review Checklist",
      "description": "Ensure code consistency, avoid magic numbers, check for responsive design compliance, and run unit tests. Share feedback in GitHub pull requests.",
      "date": "2023-09-25",
      "tags": ["code review", "development", "best practices"]
    },
    {
      "id": 6,
      "title": "Workshop Ideas",
      "description": "Brainstormed interactive workshop sessions for the annual tech conference, focusing on hands-on experience with new tech stacks.",
      "date": "2023-09-28",
      "tags": ["workshop", "conference", "ideas"]
    },
    {
      "id": 7,
      "title": "Daily Standup",
      "description": "Update on progress for each team member, blockers discussed, and re-aligned priorities. Keep updates concise and focused.",
      "date": "2023-09-29",
      "tags": ["standup", "team", "updates"]
    },
    {
      "id": 8,
      "title": "Client Feedback",
      "description": "Feedback on recent deliverables: positive reception overall, minor adjustments required on the dashboard's UI and color scheme.",
      "date": "2023-10-01",
      "tags": ["feedback", "client", "UI"]
    },
    {
      "id": 9,
      "title": "Server Migration Plan",
      "description": "Plan for migrating the application to the new server. Prepare backups, ensure data integrity, and perform tests post-migration.",
      "date": "2023-10-03",
      "tags": ["migration", "server", "plan"]
    },
    {
      "id": 10,
      "title": "Feature Wishlist",
      "description": "List of features to consider for future updates: dark mode, notification center, custom user profiles, and admin analytics.",
      "date": "2023-10-05",
      "tags": ["features", "wishlist", "future"]
    },
    {
      "id": 11,
      "title": "Performance Metrics",
      "description": "Review application performance data: page load times, server response times, and identify bottlenecks. Schedule optimization tasks.",
      "date": "2023-10-07",
      "tags": ["performance", "metrics", "optimization"]
    },
    {
      "id": 12,
      "title": "Content Calendar",
      "description": "Plan out content for the blog and social media channels. Assign writers and set deadlines for each post.",
      "date": "2023-10-09",
      "tags": ["content", "calendar", "social media"]
    },
    {
      "id": 13,
      "title": "New Feature Specifications",
      "description": "Outline specifications for the new feature 'Quick View' for products. Include design mockups, flow diagrams, and backend requirements.",
      "date": "2023-10-11",
      "tags": ["feature", "specifications", "design"]
    },
    {
      "id": 14,
      "title": "User Testing Feedback",
      "description": "Collate feedback from user testing sessions, focusing on usability, functionality, and design adjustments. High-priority issues flagged.",
      "date": "2023-10-13",
      "tags": ["testing", "user feedback", "usability"]
    },
    {
      "id": 15,
      "title": "Backend API Updates",
      "description": "Details on recent updates to the backend API, including new endpoints for user management and product listings.",
      "date": "2023-10-15",
      "tags": ["API", "backend", "updates"]
    },
    {
      "id": 16,
      "title": "Budget Planning",
      "description": "Breakdown of estimated costs for Q4, including software licenses, hardware upgrades, and team training resources.",
      "date": "2023-10-17",
      "tags": ["budget", "planning", "resources"]
    },
    {
      "id": 17,
      "title": "Security Checklist",
      "description": "Review and update security protocols, focusing on data encryption, access control, and regular audits. Ensure compliance with standards.",
      "date": "2023-10-19",
      "tags": ["security", "protocols", "compliance"]
    },
    {
      "id": 18,
      "title": "Customer Survey Results",
      "description": "Summarize key insights from the latest customer survey. Highlight areas of improvement and positive feedback on recent features.",
      "date": "2023-10-21",
      "tags": ["survey", "customer", "feedback"]
    },
    {
      "id": 19,
      "title": "Roadmap Update",
      "description": "Update the project roadmap with recent changes, including delayed tasks and new feature prioritization for the next quarter.",
      "date": "2023-10-23",
      "tags": ["roadmap", "project", "updates"]
    },
    {
      "id": 20,
      "title": "Resource Allocation",
      "description": "Allocate team resources based on project priorities, adjusting timelines as needed to meet deadlines and maintain quality.",
      "date": "2023-10-25",
      "tags": ["resources", "allocation", "priorities"]
    }
  ]
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-purple-700">All Notes</h1>
          <div className="flex space-x-4">
            <button onClick = {() => setIsModalOpen(true)} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-shadow shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400">
              Add Note
            </button>
            <button className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-shadow shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400">
              Archive Notes
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-purple-700">{note.title}</h2>
                <div className="flex space-x-3">
                  <button  onClick={() => handleDelete(note.id)}
                  className="text-gray-500 hover:text-red-600 transition-colors">
                    <IoTrashOutline size={20} />
                  </button>
                  <button className="text-gray-500 hover:text-blue-600 transition-colors">
                    <FaArchive size={20} />
                  </button>
                  <button className="text-gray-500 hover:text-green-600 transition-colors">
                    <FaRegShareFromSquare size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{note.description.substring(0, 80)}...</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{note.date}</span>
                <div className="flex space-x-2">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
{
  isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
      <AnimatePresence>
        <motion.div
          className="relative rounded-lg shadow-xl max-w-3xl w-full p-"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-20 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <span className="sr-only">Close Modal</span>
            <MdOutlineClose size={36} className='text-gray-600 hover:text-gray-800 hover:bg-gray-300 hover:rounded-full p-1' />
          </button>

          <CreateNote setIsModalOpen={setIsModalOpen} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}      </div>
    </div>
  );
};

export default AllNotes;
