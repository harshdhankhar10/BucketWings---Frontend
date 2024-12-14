import React from 'react';
import NavBar from '../components/Navbar';
import Error404Page from '../assets/Error404Page.svg';

const ErrorPage404 = () => {
  return (
   <>
    <NavBar />
     <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
       
        <div className="-mt-36">
          <img 
            src={Error404Page} 
            alt="404 Page Not Found" 
            className="mx-auto w-full max-w-2xl"
          />
        </div>
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
          We're sorry, but the page you're looking for doesn't exist or has been moved. 
          Don't worry, even the best of us can get lost sometimes!
        </p>
        <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <a 
            href="/" 
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
          >
            Go Back Home
          </a>
          <a 
            href="/contact" 
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
   </>
  );
};

export default ErrorPage404;