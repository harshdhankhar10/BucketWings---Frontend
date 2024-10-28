import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';
import {toast} from 'react-toastify';
import {db} from "../../Firebase/Firebase"
import { collection, addDoc } from 'firebase/firestore';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
      message: formData.message,
    });
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-yellow-50 min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4 px-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full  flex flex-col lg:flex-row">
          {/* Contact Information */}
          <div className="bg-[#2563EB] text-white p-8 lg:w-2/5 space-y-8">
            <h2 className="text-4xl font-extrabold">Get in Touch</h2>
            <p className="text-blue-100 text-lg">We'd love to hear from you. Reach out and we'll respond as soon as possible.</p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6" />
                <span className="text-lg">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6" />
                <span className="text-lg">contact@bucketwings.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6" />
                <span className="text-lg">123 Wing Street, Flavor City</span>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="h-6 w-6" />
                <span className="text-lg">Mon-Fri: 9AM - 5PM</span>
              </div>
            </div>
            <div className="pt-8">
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-blue-200 transition-colors">
                  <Facebook className="h-8 w-8" />
                </a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors">
                  <Twitter className="h-8 w-8" />
                </a>
                <a href="#" className="text-white hover:text-blue-200 transition-colors">
                  <Instagram className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 lg:w-3/5">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors text-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors text-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors text-lg"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500 outline-none transition-colors resize-none text-lg"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Send Message
                  <Send className="ml-2 h-6 w-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;