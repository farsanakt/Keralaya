import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import Sidebar from '../../components/admin/Sidebar';


ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'User Revenue',
        data: [400, 450, 500, 550, 600, 650, 700],
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
        fill: false,
      },
      {
        label: 'Guide Revenue',
        data: [200, 220, 250, 300, 350, 400, 450],
        borderColor: '#FF5733',
        backgroundColor: '#FF5733',
        fill: false,
      },
      {
        label: 'Total Revenue',
        data: [600, 670, 750, 850, 950, 1050, 1150],
        borderColor: '#3498db',
        backgroundColor: '#3498db',
        fill: false,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-[#1a202c] mb-6">Admin Dashboard</h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Users</h3>
            <p className="text-2xl font-bold text-[#4CAF50]">500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Guides</h3>
            <p className="text-2xl font-bold text-[#FF5733]">150</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Income</h3>
            <p className="text-2xl font-bold text-[#3498db]">$50000</p>
          </div>
        </div>

        {/* Graph */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-[#1a202c] mb-4">Revenue Analysis</h3>
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
