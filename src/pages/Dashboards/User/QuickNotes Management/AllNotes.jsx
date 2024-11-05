import React, { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { FaArchive } from 'react-icons/fa';
import { FaRegShareFromSquare } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import CreateNote from './CreateNewNote';
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2';


const AllNotes = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    const fetchNotes = async () => {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/notes/all`);
      console.log(response)
      setNotes(response.data.notes);
      setLoading(false);
    }
    fetchNotes();
  }, []);

  const formatDate = (date) => { 

    const newDate = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return newDate;
  }

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this note!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/notes/delete/${id}`);
          if (response.data.success) {
            Swal.fire('Deleted!', 'Your note has been deleted.', 'success');
            setNotes(notes.filter((note) => note._id !== id));
          }
        }
        else{
          Swal.fire('Cancelled', 'Your note is safe :)', 'error');
        }
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleArchive = async (id) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/notes/archive/${id}`);
      if (response.data.success) {
        Swal.fire('Archived!', 'Your note has been archived.', 'success');
        setNotes(notes.map((note) => note._id === id ? { ...note, isArchived: true } : note));
      }
    }
    catch (error) {
      console.log(error);
    }
  }

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
            note.isArchived === false &&
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
                  <button  onClick={() => handleDelete(note._id)}
                  className="text-gray-500 hover:text-red-600 transition-colors">
                    <IoTrashOutline size={20} />
                  </button>
                  <button onClick={() => handleArchive(note._id)}
                    className="text-gray-500 hover:text-blue-600 transition-colors">
                    <FaArchive size={20} />
                  </button>
                  <button className="text-gray-500 hover:text-green-600 transition-colors">
                    <FaRegShareFromSquare size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{note.content.substring(0, 80)}...</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{formatDate(note.createdAt)}</span>
                <div className="flex space-x-2">
                  {note.tags.length > 0 ? note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  )) : null}
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
