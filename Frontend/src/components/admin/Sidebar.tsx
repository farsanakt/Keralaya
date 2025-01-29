import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-56 bg-[#1a202c] text-white h-screen flex flex-col p-6 mt-10 mb-10 ml-5 mr-5 rounded-lg shadow-md">
      <div>
        <h2 className="text-3xl font-bold text-center text-white mb-8">Admin Dashboard</h2>
        
        
        <ul className="space-y-4">
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/dashboard"
                className="text-white hover:text-white text-lg font-medium"
              >
                Dashboard
              </Link>
            </div>
          </li>
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/userlist"
                className="text-white hover:text-white text-lg font-medium"
              >
                Users
              </Link>
            </div>
          </li>
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/guidelist"
                className="text-white hover:text-white text-lg font-medium"
              >
                Guides
              </Link>
            </div>
          </li>
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/blacklisted"
                className="text-white hover:text-white text-lg font-medium"
              >
                Blacklisted
              </Link>
            </div>
          </li>
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/places"
                className="text-white hover:text-white text-lg font-medium"
              >
                Places
              </Link>
            </div>
          </li>
        </ul>
      </div>

   
      <div className="mt-auto">
        <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
          <Link
            to="/admin"
            className="text-white hover:text-white text-lg font-medium block"
          >
            Logout 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
