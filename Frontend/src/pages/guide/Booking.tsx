import React, { useEffect, useState } from 'react';
import { Info, Check } from 'lucide-react';
import Sidebar from '@/components/guide/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { userBookingDetails } from '@/service/guide/guideApi';

interface Booking {
  id: string;
  name: string;
  place?: string;
  date?: string;
  userEmail: string;
  paymentStatus: 'completed' | 'pending';
  travelStatus: 'pending' | 'confirmed' | 'completed';
  amount: string;
  guideId: string;
}

const Bookings: React.FC = () => {
  const { currentGuide } = useSelector((state: RootState) => state.guide);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeSection, setActiveSection] = useState<string>('Booking');
  const [loading, setLoading] = useState<boolean>(true);

  const getUsernameFromEmail = (email: string) => {
    return email.split('@')[0];
  };

  const bookingDetails = async () => {
    if (currentGuide) {
      try {
        setLoading(true);
        const email: string = typeof currentGuide.data === "string" ? currentGuide.data : "";
        const response = await userBookingDetails(email);
        
        if (response && response.data && Array.isArray(response.data)) {
          // Transform the API response to match our Booking interface
          const formattedBookings = response.data.map((booking: any) => ({
            id: booking.id || booking._id,
            name: getUsernameFromEmail(booking.userEmail),
            userEmail: booking.userEmail,
            place: "Adventure Location", // You might want to add this field to your API response
            date: new Date().toISOString().split('T')[0], // Current date as placeholder
            paymentStatus: booking.paymentStatus.toLowerCase(),
            travelStatus: booking.status.toLowerCase(),
            amount: booking.amount,
            guideId: booking.guideId
          }));
          
          setBookings(formattedBookings);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleComplete = (id: string) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, travelStatus: 'completed' } : booking
      )
    );
  };

  const navigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
  };

  useEffect(() => {
    bookingDetails();
  }, [currentGuide]); // Only run when currentGuide changes, not on every render

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} navigate={navigate} />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">Booking Details</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading bookings...</p>
          </div>
        ) : selectedBooking ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Booking #{selectedBooking.id}</h3>
              <button onClick={() => setSelectedBooking(null)} className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300">
                Back to List
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Customer Name</p>
                  <p className="font-medium">{selectedBooking.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{selectedBooking.userEmail}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{selectedBooking.place || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{selectedBooking.date || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-medium">${selectedBooking.amount}</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Status</p>
                  <p className={`font-medium ${selectedBooking.paymentStatus === 'completed' ? 'text-green-500' : 'text-orange-500'}`}>
                    {selectedBooking.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Travel Status</p>
                  <div className="flex items-center space-x-2">
                    <p className={`font-medium ${selectedBooking.travelStatus === 'completed' ? 'text-green-500' : 'text-orange-500'}`}>
                      {selectedBooking.travelStatus.charAt(0).toUpperCase() + selectedBooking.travelStatus.slice(1)}
                    </p>
                    {selectedBooking.travelStatus === 'pending' && (
                      <button onClick={() => handleComplete(selectedBooking.id)} className="ml-2 px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800">
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {bookings.length === 0 ? (
              <div className="p-6 text-center">
                <p>No bookings found.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {['Name', 'Email', 'Amount', 'Payment', 'Travel Status', 'Actions'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.userEmail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${booking.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={booking.paymentStatus === 'completed' ? 'text-green-500' : 'text-orange-500'}>
                          {booking.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.travelStatus.charAt(0).toUpperCase() + booking.travelStatus.slice(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => setSelectedBooking(booking)} className="text-red-500 hover:text-red-700 mr-3">
                          <Info size={16} className="mr-1 inline" /> Details
                        </button>
                        {booking.travelStatus === 'pending' && (
                          <button onClick={() => handleComplete(booking.id)} className="text-black hover:text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            <Check size={16} className="mr-1 inline" /> Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookings;