import React from 'react';
import UserHeader from '../../components/user/UserHeader';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="w-full bg-[#f8fafc] shadow-md">
        <UserHeader />
      </header>

      <main className="flex-grow flex items-center justify-center bg-[#f8fafc] mt-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-[#1a202c] mb-6">
            Welcome Back!
          </h2>
          <form className="space-y-4">
          
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1a202c] mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                required
              />
            </div>

           
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1a202c] mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                required
              />
            </div>

          
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#00563f] text-white font-medium rounded-md hover:bg-[#00482f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00563f]"
              >
                Log In
              </button>
            </div>
          </form>

          
          <p className="text-sm text-center text-[#4a5568] mt-4">
            Don’t have an account?{' '}
            <a href="/signup" className="text-[#00563f] hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
