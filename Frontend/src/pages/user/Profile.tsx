import React from "react";
import UserHeader from "../../components/user/UserHeader";

const Profile: React.FC = () => {



  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
    
      <header className="w-full bg-[#f8fafc] shadow-md">
        <UserHeader />
      </header>

      
      <div className="flex flex-grow">
       
        <aside className="w-64 bg-[#00563f] text-white flex flex-col shadow-lg mt-6 mb-6 ml-4 rounded-md">
          <div className="p-6 text-center font-bold text-lg">
            <p>User Dashboard</p>
          </div>
          <nav className="flex-grow space-y-4 p-4">
            <a
              href="/profile"
              className="block py-2 px-4 rounded-md hover:bg-[#00482f] transition"
            >
              My Profile
            </a>
            <a
              href="/guides"
              className="block py-2 px-4 rounded-md hover:bg-[#00482f] transition"
            >
              Guides
            </a>
            <a
              href="/reviews"
              className="block py-2 px-4 rounded-md hover:bg-[#00482f] transition"
            >
              Reviews
            </a>
            <a
              href="/reports"
              className="block py-2 px-4 rounded-md hover:bg-[#00482f] transition"
            >
              Reports
            </a>
          </nav>
          <footer className="p-4 text-center text-sm border-t border-[#00482f]">
            © 2024 YourApp
          </footer>
        </aside>

        
        <main className="flex-grow flex items-center justify-center mt-6">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
           
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://via.placeholder.com/100"
                alt="User Avatar"
                className="w-24 h-24 rounded-full shadow-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-[#1a202c]">John Doe</h2>
              <p className="text-sm text-[#4a5568]">john.doe@example.com</p>
            </div>

            
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-[#1a202c] mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1a202c] mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#1a202c] mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue="+1 234 567 890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                  disabled
                />
              </div>
            </div>

           
            <div className="flex justify-between items-center mt-6">
              <button className="py-2 px-4 bg-[#00563f] text-white font-medium rounded-md hover:bg-[#00482f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00563f]">
                Edit Profile
              </button>
              <button className="py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
