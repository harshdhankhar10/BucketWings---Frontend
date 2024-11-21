import React, { useState } from 'react';
import { AlertTriangle, Check, ChevronDown, Paperclip } from 'lucide-react';
import {db, storage} from "../../../../Firebase/Firebase";
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {toast} from "react-toastify";
 

const ReportIssue = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('auth'))?.user);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: '',
    attachments: []
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevData => ({
      ...prevData,
      attachments: prevData.attachments.concat(files)
    }));
  };

  const id  = Math.floor(Math.random() * 10000000000000);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.type || !formData.priority) {
      toast.error('All fields are required');
      return;
    }

    const uploadFiles = async () => {
      const promises = formData.attachments.map(async (file) => {
        const storageRef = ref(storage, `issue_attachments/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed', null, reject, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              resolve({
                name: file.name,
                url
              });
            });
          });
        });
      });

      return Promise.all(promises);
    };

    uploadFiles().then((attachments) => {
      addDoc(collection(db, "Reported_Issues"), {
        id : id,
        user_id: user.id,
        username : user.username,
        email: user.email,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        priority: formData.priority,
        attachments,
        created_at: new Date().toISOString()
      });

      toast.success('Issue reported successfully');
      setFormData({
        title: '',
        description: '',
        type: '',
        priority: '',
        attachments: []
      });

      setIsSubmitted(true);
    });

  };

  const issueTypes = ['Bug', 'Feature Request', 'Performance Issue', 'Security Concern', 'Other'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Report an Issue</h1>
        
        {isSubmitted ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You for Your Report</h2>
            <p className="text-gray-600 mb-6">We've received your issue report and will investigate it promptly. You'll receive an update via email soon.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Report Another Issue
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                placeholder="Enter a brief title for the issue"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                placeholder="Provide a detailed description of the issue"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                    required
                  >
                    <option value="">Select an issue type</option>
                    {issueTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <div className="relative">
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                    required
                  >
                    <option value="">Select priority level</option>
                    {priorities.map((priority, index) => (
                      <option key={index} value={priority}>{priority}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">Attachments (Optional)</label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="attachments" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Paperclip className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">All file types accepted</p>
                  </div>
                  <input
                    id="attachments"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {formData.attachments.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">{formData.attachments.length} file(s) selected</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                <span>All fields are required unless marked optional</span>
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition duration-300 ease-in-out"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportIssue;