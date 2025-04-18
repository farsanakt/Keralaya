import ChatModal from '@/components/user/chat/chatModal';
import UserHeader from '@/components/user/UserHeader';
import UserSidebar from '@/components/user/UserSidebar';
import { RootState } from '@/redux/store';
// import { cancelBooking } from '@/service/admin/adminApi';
import { cancelBooking, postReview, userBookingDetails } from '@/service/user/userApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Swal from "sweetalert2";

interface BookingDetails {
  date?: string;
  time?: string;
  duration?: string;
  meetingPoint?: string;
  description?: string;
  bookeddate:string
}

interface GuideDetails {
  _id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  locname:string
  bookeddate:string
}

interface Booking {
  _id: string;
  guideId: string;
  userEmail: string;
  amount: string;
  paymentStatus: string;
  status: string;
  details?: BookingDetails;
  guide?: GuideDetails;
  locname:string
  bookeddate:string
}

interface ReviewData {
  rating: number;
  comment: string;
}

// interface ApiResponse {
//   bkDetails: Booking[];
//   guideDetails: GuideDetails[][];
// }

const BookingDetailsTable: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [review, setReview] = useState<ReviewData>({ rating: 0, comment: "" });
  const [loading, setLoading] = useState<boolean>(true);

  const [showChatModal, setShowChatModal] = useState(false);

  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const bookingsPerPage = 4;

  const handleOpenChat = () => {
    setShowChatModal(true);
  };

  const handleCloseChat = () => {
    setShowChatModal(false);
  };

  const userDetails = async () => {
    if (currentUser?.message?.data?.email) {
      try {
        setLoading(true);
        const response = await userBookingDetails(currentUser?.message?.data?.email);
        
        if (response.status === 201 && response.data) {
          const { bkDetails, guideDetails } = response.data;
          
          
          const sortedBookings = bkDetails.sort((a: Booking, b: Booking) => {
            return new Date(b.bookeddate).getTime() - new Date(a.bookeddate).getTime();
          });
          
          const processedBookings = sortedBookings.map((booking: any, index: string | number) => {
            const guide = guideDetails[index]?.[0];
            return {
              ...booking,
              guide: guide
            };
          });
          
          setBookings(processedBookings);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelBooking = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will cancel the booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });
  
    if (result.isConfirmed) {
      try {
        await cancelBooking(id);
        
        Swal.fire("Cancelled!", "The booking has been cancelled.", "success");
        await userDetails()
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  }

 
  const handleViewDetails = (booking: Booking): void => {
    setSelectedBooking(booking);
  };

  
  const handleCloseDetails = (): void => {
    setSelectedBooking(null);
  };


  const handleOpenReviewModal = (): void => {
    setShowReviewModal(true)
    
  };

 
  const handleCloseReviewModal = (): void => {
    setShowReviewModal(false);
  };

  
  


  const handleCloseInvoiceModal = (): void => {
    setShowInvoiceModal(false);
  };

 
  const handleSubmitReview = async () => {
    if (!review.rating || !review.comment) {
      toast.error("Please provide a rating and a comment.");
      return;
    }
  
    const username = currentUser?.message?.data?.username;
    const email = currentUser?.message?.data?.email;
  
    const reviewData = {
      guideId: selectedBooking?.guide?._id,
      rating: review.rating,
      comment: review.comment,
      username,
      email,
    };
  
    try {
      const response = await postReview(reviewData);
  
      if (response.data.success) {
        toast.success("Review submitted successfully!");
        handleCloseReviewModal()
      } else {
        toast.error(response.data.message || "Failed to submit review.");
        handleCloseReviewModal()
      }
    } catch (error: any) {
      console.error("Error submitting review:", error);
  
      
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
  
      toast.error(errorMessage);
      handleCloseReviewModal()
    }
  };
  
  

  
  const generateInvoiceNumber = (bookingId: string): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `INV-${year}${month}-${bookingId.substring(0, 4)}`;
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    userDetails();
    
  }, [currentUser?.message?.data?.email]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
    <header className="w-full bg-[#f8fafc] shadow-md">
      <UserHeader />
    </header>
    <div className="flex">
    <UserSidebar />
    <div className="flex-1 p-4">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-4 text-center">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="p-4 text-center">No bookings found.</div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guide</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBookings.map((booking) => (
                  <tr key={booking._id}>
                   
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.guide?.name || "Unknown Guide"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.locname || "Unknown Place"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(booking.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.bookeddate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                        onClick={() => handleViewDetails(booking)}
                      >
                        Details
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
                            ? 'bg-blue-500 text-white' 
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

                      
                      {selectedBooking && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <h3 className="text-lg font-bold mb-4">Booking Details</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-semibold">Guide:</p>
                        <p className="text-sm">{selectedBooking.guide?.name || "Unknown Guide"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Place:</p>
                        <p className="text-sm">{selectedBooking.locname|| "Unknown Place"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Phone:</p>
                        <p className="text-sm">{selectedBooking.guide?.phone || "Not available"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Email:</p>
                        <p className="text-sm">{selectedBooking.guide?.email || "Not available"}</p>
                      </div>
                      {selectedBooking.details?.bookeddate && (
                        <div>
                          <p className="text-sm font-semibold">Date:</p>
                          <p className="text-sm">{selectedBooking.details.bookeddate}</p>
                        </div>
                      )}
                      {selectedBooking.details?.time && (
                        <div>
                          <p className="text-sm font-semibold">Time:</p>
                          <p className="text-sm">{selectedBooking.details.time}</p>
                        </div>
                      )}
                      {selectedBooking.details?.duration && (
                        <div>
                          <p className="text-sm font-semibold">Duration:</p>
                          <p className="text-sm">{selectedBooking.details.duration}</p>
                        </div>
                      )}
                      {selectedBooking.details?.meetingPoint && (
                        <div>
                          <p className="text-sm font-semibold">Meeting Point:</p>
                          <p className="text-sm">{selectedBooking.details.meetingPoint}</p>
                        </div>
                      )}
                      {selectedBooking.details?.description && (
                        <div className="col-span-2">
                          <p className="text-sm font-semibold">Description:</p>
                          <p className="text-sm">{selectedBooking.details.description}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold">Amount:</p>
                        <p className="text-sm">${parseFloat(selectedBooking.amount).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Payment Status:</p>
                        <p className="text-sm">{selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Date</p>
                        <p className="text-sm">{selectedBooking.bookeddate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Booking Status:</p>
                        <p className="text-sm">{selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCloseDetails}
                      >
                        Close
                      </button>
                      
                      <div>
                        {selectedBooking.status === "pending" && (
                          <>
                            <button
                              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={handleOpenChat}
                            >
                              Chat
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={()=>handleCancelBooking(selectedBooking._id)}
                            >
                              Cancel Booking
                            </button>
                          </>
                        )}

                        {showChatModal && (
                          <ChatModal
                            bookingId={selectedBooking._id}
                            onClose={handleCloseChat}
                            role="user"
                          />
                        )}
                        
                        {selectedBooking.status === "completed" && (
                          <>
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={handleOpenReviewModal}
                            >
                              Post Review
                            </button>
                            {/* <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={handleOpenInvoiceModal}
                            >
                              
                            </button> */}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

        {/* Review Modal */}
        {showReviewModal && selectedBooking && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Post Review for {selectedBooking.guide?.name || "Guide"}</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-2xl focus:outline-none"
                      onClick={() => setReview({...review, rating: star})}
                    >
                      {star <= review.rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  value={review.comment}
                  onChange={(e) => setReview({...review, comment: e.target.value})}
                  placeholder="Share your experience with this guide..."
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseReviewModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmitReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Modal */}
        {showInvoiceModal && selectedBooking && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">INVOICE</h3>
                <button
                  onClick={handleCloseInvoiceModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg mb-1">TravelGuide Inc.</h4>
                    <p className="text-sm text-gray-600">123 Adventure Way</p>
                    <p className="text-sm text-gray-600">Travel City, TC 12345</p>
                    <p className="text-sm text-gray-600">support@travelguide.com</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{generateInvoiceNumber(selectedBooking._id)}</p>
                    <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Booking Date: {selectedBooking.details?.date || "Not specified"}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h4 className="font-semibold mb-2">Billed To:</h4>
                <p className="text-sm">{currentUser?.message?.data?.name || "Customer Name"}</p>
                <p className="text-sm text-gray-600">{selectedBooking.userEmail}</p>
              </div>
              
              <div className="mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm">
                        <p className="font-medium">{selectedBooking.guide?.district || "Tour"} Tour</p>
                        <p className="text-gray-500">Guide: {selectedBooking.guide?.name || "Guide"}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {selectedBooking.details?.date && <p>Date: {selectedBooking.details.date}</p>}
                        {selectedBooking.details?.time && <p>Time: {selectedBooking.details.time}</p>}
                        {selectedBooking.details?.duration && <p>Duration: {selectedBooking.details.duration}</p>}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">${parseFloat(selectedBooking.amount).toFixed(2)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-sm font-medium text-right">Subtotal</td>
                      <td className="px-4 py-3 text-sm text-right">${parseFloat(selectedBooking.amount).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-sm font-medium text-right">Tax (0%)</td>
                      <td className="px-4 py-3 text-sm text-right">$0.00</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-base font-bold text-right">Total</td>
                      <td className="px-4 py-3 text-base font-bold text-right">${parseFloat(selectedBooking.amount).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-sm font-medium text-right">Amount Paid</td>
                      <td className="px-4 py-3 text-sm text-right">
                        ${selectedBooking.paymentStatus === "completed" ? parseFloat(selectedBooking.amount).toFixed(2) : "0.00"}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-sm font-medium text-right">Balance Due</td>
                      <td className="px-4 py-3 text-sm font-bold text-right">
                        ${selectedBooking.paymentStatus === "completed" ? "0.00" : parseFloat(selectedBooking.amount).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-semibold mb-2">Payment Details:</h4>
                <p className="text-sm">Payment Method: Credit Card</p>
                <p className="text-sm">Transaction ID: TXN-{Math.floor(Math.random() * 1000000)}</p>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-6">
                <p>Thank you for your business!</p>
                <p>If you have any questions, please contact support@travelguide.com</p>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    console.log("Printing invoice for booking:", selectedBooking._id);
                    handleCloseInvoiceModal();
                  }}
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default BookingDetailsTable;