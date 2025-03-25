import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { AxiosResponse } from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
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
  id?: string;
  name: string;
  email: string;
  charge?: string;
  phone?: string;
  district?: string;
}

interface UserDetail {
  _id: string;
  username: string;
  email: string;
  password?: string;
  isVerified?: boolean;
}

interface FullDashboardData {
  bookingDetails: BookingDetail[];
  guideDetails: GuideDetail[];
  userDetails: UserDetail[];
}

interface DashboardResponse {
  success: boolean;
  data: FullDashboardData;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<FullDashboardData | null>(null);
  const [revenueData, setRevenueData] = useState({
    labels: [] as string[],
    datasets: [] as any[]
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const adminDashboardDetails = async () => {
    try {
      setLoading(true);
      console.log('Fetching dashboard details...');
      
      const response: AxiosResponse<DashboardResponse> = await DashboardDetails();
      console.log('Full Response:', response);

      // Check for success and data
      if (!response.data.success) {
        throw new Error('Dashboard data fetch was unsuccessful');
      }

      const responseData = response.data.data;
      console.log('Processed Response Data:', responseData);

      setDashboardData(responseData);
      processRevenueData(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error in adminDashboardDetails:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  const processRevenueData = (data: FullDashboardData) => {
    try {
      // Filter only completed bookings
      const completedBookings = data.bookingDetails.filter(booking => booking.status === 'completed');
      console.log('Completed Bookings:', completedBookings);

      // Group bookings by month and calculate revenue
      const revenueByMonth: { [key: string]: number } = {};
      completedBookings.forEach(booking => {
        // Use current date as fallback if no createdAt
        const date = booking.createdAt 
          ? new Date(booking.createdAt) 
          : new Date();
        
        const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + parseFloat(booking.amount);
      });

      console.log('Revenue by Month:', revenueByMonth);

      // Prepare chart data
      const labels = Object.keys(revenueByMonth).sort();
      const revenues = labels.map(label => revenueByMonth[label]);

      setRevenueData({
        labels,
        datasets: [
          {
            label: 'Completed Bookings Revenue',
            data: revenues,
            borderColor: '#4CAF50',
            backgroundColor: '#4CAF50',
            fill: false,
          }
        ]
      });
    } catch (error) {
      console.error('Error in processRevenueData:', error);
    }
  };

  useEffect(() => {
    adminDashboardDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-[#1a202c] mb-6">Admin Dashboard</h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Users</h3>
            <p className="text-2xl font-bold text-[#4CAF50]">
              {dashboardData?.userDetails.length || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Guides</h3>
            <p className="text-2xl font-bold text-[#FF5733]">
              {dashboardData?.guideDetails.length || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#1a202c]">Total Completed Bookings Revenue</h3>
            <p className="text-2xl font-bold text-[#3498db]">
              {dashboardData 
                ? `$${dashboardData.bookingDetails
                    .filter(booking => booking.status === 'completed')
                    .reduce((total, booking) => total + parseFloat(booking.amount), 0).toFixed(2)}`
                : '$0.00'}
            </p>
          </div>
        </div>

        {/* Graph */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-[#1a202c] mb-4">Completed Bookings Revenue</h3>
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