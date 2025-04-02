import React, { useEffect, useState } from 'react';
import { Info, Check } from 'lucide-react';
import Sidebar from '@/components/guide/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { completedTravel, userBookingDetails } from '@/service/guide/guideApi';
import ChatModal from '@/components/user/chat/chatModal';


interface Booking {
  id: string;
  _id?: string; 
  name: string;
  place?: string;
  date?: string;
  userEmail: string;
  paymentStatus: 'completed' | 'pending';
  travelStatus: 'pending' | 'confirmed' | 'completed';
  amount: string;
  guideId: string;
}

interface ChatDetails {
  bookingId: string;
  role: string;
}

const Bookings: React.FC = () => {
  const { currentGuide } = useSelector((state: RootState) => state.guide);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeSection, setActiveSection] = useState<string>('Booking');
  const [loading, setLoading] = useState<boolean>(true);

  const [showChatModal, setShowChatModal] = useState(false);
  const [chatDetails, setChatDetails] = useState<ChatDetails | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const bookingsPerPage = 4;

  const handleOpenChat = () => {
    if (selectedBooking) {
      setChatDetails({
        bookingId: selectedBooking.id || selectedBooking._id || "",
        role: 'guide'
      });
      setShowChatModal(true);
    }
  };
  
  const handleCloseChat = () => {
    setShowChatModal(false);
  };

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
          
          const formattedBookings = response.data
            .map((booking: any) => ({
              id: booking.id || booking._id,
              _id: booking._id || booking.id,
              name: getUsernameFromEmail(booking.userEmail),
              userEmail: booking.userEmail,
              place: "Calicut", 
              date: booking.bookeddate || new Date().toISOString().split('T')[0], 
              paymentStatus: booking.paymentStatus.toLowerCase(),
              travelStatus: booking.status.toLowerCase(),
              amount: booking.amount,
              guideId: booking.guideId
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
          setBookings(formattedBookings);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleComplete = async(id: string) => {
    try {
      const response = await completedTravel(id);
      if (response && response.data) {
        bookingDetails();
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error("Error completing travel:", error);
    }
  };

  const navigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
  };

  useEffect(() => {
    bookingDetails();
  }, [currentGuide]);

 
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                  <div className="flex items-center">
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
                <div className="flex justify-end items-center">
                  {selectedBooking.travelStatus === 'pending' && (
                    <button onClick={handleOpenChat} className="px-4 py-1.5 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors">
                      Chat
                    </button>
                  )}
                  {showChatModal && chatDetails && (
                    <ChatModal
                      bookingId={chatDetails.bookingId}
                      role={chatDetails.role}
                      onClose={handleCloseChat}
                    />
                  )}
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
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {['Name', 'Email', 'Amount', 'Payment', 'Travel Status', 'Actions'].map((header) => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentBookings.map((booking) => (
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination */}
                <div className="flex justify-center items-center mt-4 pb-4">
                  <nav>
                    <ul className="flex space-x-2">
                      {Array.from({ length: Math.ceil(bookings.length / bookingsPerPage) }).map((_, index) => (
                        <li key={index}>
                          <button
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-1 rounded ${
                              currentPage === index + 1 
                                ? 'bg-black text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookings;