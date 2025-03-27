import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { AxiosResponse } from 'axios';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import Sidebar from '../../components/admin/Sidebar';
import { DashboardDetails } from '@/service/admin/adminApi';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

interface BookingDetail {
  _id: string;
  userEmail: string;
  guideId: string;
  amount: string;
  status: string;
  createdAt?: string;
}

interface GuideDetail {
  _id?: string;
  name: string;
  email: string;
  charge?: string;
}

interface UserDetail {
  _id: string;
  username: string;
  email: string;
}

interface FullDashboardData {
  bookingDetails: BookingDetail[];
  guideDetails: GuideDetail[];
  userDetails: UserDetail[];
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<FullDashboardData | null>(null);
  const [timeFilter, setTimeFilter] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');
  const [revenueData, setRevenueData] = useState({
    labels: [] as string[],
    datasets: [] as any[]
  });

  const fetchDashboardDetails = async () => {
    try {
      const response: AxiosResponse<{ success: boolean; data: FullDashboardData }> = await DashboardDetails();
      if (!response.data.success) {
        throw new Error('Failed to fetch dashboard data');
      }
      setDashboardData(response.data.data);
      updateRevenueGraph(response.data.data, timeFilter);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const updateRevenueGraph = (data: FullDashboardData, filter: 'monthly' | 'weekly' | 'yearly') => {
    const completedBookings = data.bookingDetails.filter(booking => booking.status === 'completed');

    const revenueByTime: { [key: string]: number } = {};

    completedBookings.forEach(booking => {
      const date = booking.createdAt ? new Date(booking.createdAt) : new Date();
      let key = '';

      if (filter === 'monthly') {
        key = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      } else if (filter === 'weekly') {
        const week = Math.ceil(date.getDate() / 7);
        key = `Week ${week}, ${date.toLocaleString('default', { month: 'short', year: 'numeric' })}`;
      } else {
        key = date.getFullYear().toString();
      }

      revenueByTime[key] = (revenueByTime[key] || 0) + parseFloat(booking.amount);
    });

    const labels = Object.keys(revenueByTime).sort();
    const revenues = labels.map(label => revenueByTime[label]);

    setRevenueData({
      labels,
      datasets: [
        {
          label: `Revenue (${filter})`,
          data: revenues,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
        }
      ]
    });
  };

  useEffect(() => {
    fetchDashboardDetails();
  }, []);

  useEffect(() => {
    if (dashboardData) {
      updateRevenueGraph(dashboardData, timeFilter);
    }
  }, [timeFilter]);

  const totalRevenue = dashboardData?.bookingDetails
    .filter(booking => booking.status === 'completed')
    .reduce((total: number, booking) => total + parseFloat(booking.amount), 0)
    .toFixed(2);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-[#1a202c] mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Users</h3>
            <p className="text-2xl font-bold text-[#4CAF50]">{dashboardData?.userDetails.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Guides</h3>
            <p className="text-2xl font-bold text-[#FF5733]">{dashboardData?.guideDetails.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Revenue</h3>
            <p className="text-2xl font-bold text-[#3498db]">${totalRevenue}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-[#1a202c] mb-4">Revenue Graph</h3>
          <select
            className="mb-4 p-2 border rounded-md"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as 'monthly' | 'weekly' | 'yearly')}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
          {revenueData.labels.length > 0 ? (
            <Line data={revenueData} />
          ) : (
            <p>No revenue data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
