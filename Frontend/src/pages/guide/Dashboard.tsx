import React from "react";
import { FiHome, FiStar, FiBook, FiBarChart2, FiUser, FiDollarSign, FiClock } from "react-icons/fi";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
    
      <aside className="w-1/5 bg-white shadow-lg p-6 rounded-r-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-8 text-center">Dashboard</h1>
        <ul className="space-y-6">
          <li className="flex items-center space-x-4 hover:text-green-500 cursor-pointer">
            <FiHome className="text-xl" />
            <span className="text-lg">Dashboard</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-green-500 cursor-pointer">
            <FiStar className="text-xl" />
            <span className="text-lg">Reviews</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-green-500 cursor-pointer">
            <FiBook className="text-xl" />
            <span className="text-lg">Booking</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-green-500 cursor-pointer">
            <FiBarChart2 className="text-xl" />
            <span className="text-lg">Revenue</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-green-500 cursor-pointer">
            <FiUser className="text-xl" />
            <span className="text-lg">Profile</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-green-500 cursor-pointer">
            <FiDollarSign className="text-xl" />
            <span className="text-lg">Transaction</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-green-500 cursor-pointer">
            <FiClock className="text-xl" />
            <span className="text-lg">Slot</span>
          </li>
        </ul>
      </aside>

    
      <main className="flex-1 p-8 ml-4 bg-gray-50 rounded-lg shadow-md">
        {/* Notifications and Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Total Income</h2>
            <p className="text-2xl font-semibold">₹ 23,900</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Appointments</h2>
            <p className="text-2xl font-semibold">12</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Notifications</h2>
            <p className="text-lg">New updates available!</p>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Reviews</h2>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-4xl font-semibold text-yellow-500">4.0</p>
              <p className="text-gray-500 text-sm">based on 54 reviews</p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-yellow-500 ${
                      index < 4 ? "fas fa-star" : "far fa-star"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-gray-600 font-medium">Excellent</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-medium">Good</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 font-medium">Average</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-500 h-3 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Poor</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: "10%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
