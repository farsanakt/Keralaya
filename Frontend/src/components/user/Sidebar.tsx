import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-1/4 bg-gray-200 rounded-lg p-4 shadow-md">
      <ul className="space-y-4 text-center">
        <li className="hover:bg-gray-300 p-2 rounded-lg cursor-pointer">My Profile</li>
        <li className="hover:bg-gray-300 p-2 rounded-lg cursor-pointer">Settings</li>
        <li className="hover:bg-gray-300 p-2 rounded-lg cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
