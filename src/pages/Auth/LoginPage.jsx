import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, X, Send } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from "../../components/Navbar"
import Swal from 'sweetalert2'

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('auth', JSON.stringify(response.data));
        setIsLoggedIn(true);
        window.location.href = `/user/${response.data.user.username}`;
      }
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/forgot-password`, {
        email: resetEmail,
      });
      if (response.data.success) {
        Swal.fire({
          title: 'Password Reset Email Sent',
          text: 'Please check your email for further instructions.',
          icon: 'success',
          confirmButtonText: 'Close',
        });
      }else{
        Swal.fire({
          title: 'Password Reset Email Failed',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Close',
        });
      }


      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
    }
    setIsSubmitting(false);
  };

  if (isLoggedIn) return null;

  return (
    <>
      <Helmet>
        <title>Login | BucketWings</title>
      </Helmet>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl"
        >
       

          <div className="mt-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to continue your journey
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" size={20} />
                <input
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" size={20} />
                <input
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-purple-300 group-hover:text-purple-200" aria-hidden="true" />
              </span>
              Sign in
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </form>

          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Forgot Password Dropdown */}
          <AnimatePresence>
            {showForgotPassword && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 flex flex-col"
              >
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X size={24} />
                </button>

                <div className="flex-1 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Reset Password</h3>
                  <form onSubmit={handleForgotPassword} className="w-full space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        required
                        className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Mail className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Reset Link
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;