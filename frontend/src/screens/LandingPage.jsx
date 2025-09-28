import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('user@manifest.build');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?q=80&w=2076&auto=format&fit=crop')"}}></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white sm:text-5xl">
          Moon Chicken Tracker
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
          Log your chicken sightings and explore their mysterious connection with the lunar cycle. Join a community of poultry observers today.
        </p>
        <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
          <div className="rounded-md shadow w-full">
            <a href="#"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
            >
              Login as Demo User
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 w-full sm:w-auto">
            <a
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
            >
              Admin Panel
            </a>
          </div>
        </div>
        <p className="text-xs mt-4 text-gray-400">Use `user@manifest.build` / `password` for demo</p>
      </div>
    </div>
  );
};

export default LandingPage;
