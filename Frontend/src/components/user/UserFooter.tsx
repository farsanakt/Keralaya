import React from 'react';

const UserFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto text-center text-gray-600">
        <p className="font-semibold">Keralaya</p>
        <p>Keralaya's Largest Travel Community</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="text-green-700 hover:underline">About Keralaya</a>
          <a href="#" className="text-green-700 hover:underline">Plan your Travel</a>
          <a href="#" className="text-green-700 hover:underline">Contact Us</a>
        </div>
        <p className="mt-4 text-sm">© 2024 Keralaya. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default UserFooter;
