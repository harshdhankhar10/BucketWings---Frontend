import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { PiExportBold } from "react-icons/pi";
import { FaArchive } from "react-icons/fa";
import { MdDeleteOutline, MdArrowBack } from "react-icons/md";
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js';

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/notes/${id}`);
      setNote(response.data.note);
      setLoading(false);
    };
    fetchNote();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
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
            navigate(-1);
          }
        } else {
          Swal.fire('Cancelled', 'Your note is safe :)', 'info');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/notes/archive/${id}`);
      if (response.data.success) {
        Swal.fire('Archived!', 'Your note has been archived.', 'success');
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const exportAsPDF = () => {
    const element = document.getElementById('pdfContent');
    setLoading(true);
    const options = {
      margin: 0.5,
      filename: `${note.title || 'Note'} - BucketWings.pdf`,
      
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-colors"
              >
                <MdArrowBack className="mr-2" /> Back
              </button>
              <div className="flex gap-3">
                <button
                  onClick={exportAsPDF}
                  className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                  disabled={loading}
                >
                  <PiExportBold size={20} />
                  {loading ? 'Exporting...' : 'Export PDF'}
                </button>
                <button
                  onClick={() => handleArchive(id)}
                  className="flex items-center gap-2 bg-white text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors"
                >
                  <FaArchive size={18} />
                  Archive
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <MdDeleteOutline size={20} />
                  Delete
                </button>
              </div>
            </div>
          </div>


          <div className="p-8">
            <div id="pdfContent" className="space-y-6">

              <div className="text-center mb-8 hidden print:block">
                <div className="w-32 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                <h1 className="text-2xl font-bold text-gray-800">BucketWings Note</h1>
                <div className="text-sm text-gray-500 mt-2">
                  Created: {new Date().toLocaleDateString()}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 border-b border-gray-200 pb-4">
                {note.title}
              </h1>

              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>

              {note.tags && note.tags.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3">Tags</h3>
                 <div className="flex flex-wrap gap-2 items-center justify-between">
                 <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Last updated: {new Date(note.updatedAt).toLocaleString()}
                  </div>
                 </div>
                </div>
              )}

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;