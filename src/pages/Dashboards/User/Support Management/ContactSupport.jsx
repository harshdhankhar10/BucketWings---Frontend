import React, { useState } from 'react';
import { Send, Phone, Mail, MessageSquare } from 'lucide-react';
import {toast} from "react-toastify"
import {db} from "../../../../Firebase/Firebase";
import { collection, addDoc } from 'firebase/firestore';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  addDoc(collection(db, "contacts"), {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message
  })
  .then(() => {
    toast.success("Message sent successfully!")
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  })
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Support</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send us a message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700 transition duration-300 ease-in-out flex items-center"
                >
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </button>
              </form>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-8 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="mb-6">We're here to help! Choose the method that works best for you.</p>
                <ul className="space-y-4">
                
                  <li className="flex items-center">
                    <Mail className="mr-3 w-5 h-5" />
                    <span>support@bucketwings.online</span>
                  </li>
                  <li className="flex items-center">
                    <MessageSquare className="mr-3 w-5 h-5" />
                    <span>Live Chat (9 AM - 5 PM IST)</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Response Time</h3>
                <p>We aim to respond to all inquiries within 24 hours during business days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;