import React, { useEffect, useState } from 'react';
import UserFooter from '@/components/user/UserFooter';
import UserHeader from '@/components/user/UserHeader';
import { useParams } from "react-router-dom";
import { fetchingReviewData, singleGuidee, usercheckOut } from '@/service/user/userApi';
import { availableGuide } from '@/service/guide/guideApi';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Checkout';


interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface TimeSlot {
  id: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}


interface Guide {
  _id: string;
  name: string;
  expertise: string;
  experience: string;
  rating: number;
  languages: string[];
  district: string;
  charge: number;
  imageUrl: string;
  // reviews:sr[]
  
}

interface AvailableDateItem {
  date: string;
  isBlocked: boolean;
  isBooked: boolean;
  _id: string;
}

interface GuideAvailability {
  _id: string;
  guideId: string;
  availableDates: AvailableDateItem[];
  createdAt?: string;
  updatedAt?: string;
}

interface IUserReview {
  email: string;
  username: string;
  comment: string;
  rating: number;
}

interface IReview {
  guideId: string;
  reviews: IUserReview[];
  averageRating: number;
}


const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={star <= rating ? "#FFCC00" : "none"}
          stroke="#FFCC00"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const months = ["This Month", "Next Month", "Two Months Ahead"];

const GuideDetails: React.FC = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [availability, setAvailability] = useState<GuideAvailability | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [activeMonth, setActiveMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userSecert, setUserSecert] = useState(null);
  const [paymentIntentid, setPaymentIntentid] = useState(null);
  const [review, setReview] = useState<IReview | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Transform availability dates to TimeSlot format
  const transformAvailabilitySlots = (availableDates: AvailableDateItem[]): TimeSlot[] => {
    return availableDates.filter(item => !item.isBlocked && !item.isBooked).map((dateItem, index) => {
      const date = new Date(dateItem.date);
      return {
        id: dateItem._id || `slot-${index}`,
        date: dateItem.date.split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        startTime: "09:00", 
        endTime: "17:00",  
        isAvailable: !dateItem.isBooked && !dateItem.isBlocked
      };
    });
  };
  
  const getFilteredSlots = () => {
    if (!availability || !availability.availableDates || availability.availableDates.length === 0) {
      return [];
    }

    const targetMonth = (currentMonth + activeMonth) % 12;
    const targetYear = currentYear + Math.floor((currentMonth + activeMonth) / 12);
    
    return transformAvailabilitySlots(availability.availableDates).filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.getMonth() === targetMonth && slotDate.getFullYear() === targetYear;
    });
  };

  const fetchingReview = async () => {
    console.log("Fetching reviews...");
  
    if (!id) return; // Ensure id exists before making a request
  
    try {
      const response = await fetchingReviewData(id);
      if (response && response.data) {
        setReview(response.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  
  useEffect(() => {
    fetchingReview()
    const fetchGuideDetails = async () => {
      try {
        setLoading(true);
        if (id) {
          // Fetch guide details
          const guideResponse = await singleGuidee(id);
          
          if (guideResponse.data && guideResponse.data.length > 0) {
            const guideData = guideResponse.data[0];
            
            const transformedGuide: Guide = {
              _id: guideData._id,
              name: guideData.name,
              expertise: guideData.expertise || 'Not specified',
              experience: guideData.experience || 'Not specified',
              rating: guideData.rating || 0,
              languages: guideData.languages || [],
              district: guideData.district || 'Not specified',
              charge: guideData.charge || 0,
              imageUrl: guideData.profileImage || "/api/placeholder/200/200",
              reviews: guideData.reviews || []
            };

            setGuide(transformedGuide);

            // Fetch guide availability immediately
            await fetchGuideAvailability(id);
          }
        }
      } catch (err) {
        console.error('Error fetching guide details:', err);
        setError('Failed to load guide details');
      } finally {
        setLoading(false);
      }
    };

    fetchGuideDetails();
    
  }, [id]);

  const fetchGuideAvailability = async (guideId: string) => {
    try {
      const availabilityResponse = await availableGuide(guideId);
      console.log('Availability response:', availabilityResponse);
      
      if (availabilityResponse && availabilityResponse.data) {
        setAvailability(availabilityResponse.data);
      } else {
        console.warn('No availability data found');
      }
    } catch (err) {
      console.error('Error fetching guide availability:', err);
    }
  };

  const travelGuide = async (guideId: string) => {
    try {
      
      await fetchGuideAvailability(guideId);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching guide availability:', error);
    }
  };
  
  const guideId = id;
  console.log(guideId);
  
  const amount = '2000';
  const userEmail = currentUser?.message?.data?.email;

  const bookingSubmit = async (slotId: string) => {
    console.log('fdfdkjfdfdf')
    console.log(selectedSlot, 'hhhhh');
  
    console.log(userEmail, 'email');
  
    const response = await usercheckOut({
      slotId,
      guideId,
      userEmail,
      amount
    });

    console.log("Payment Response:", response);
    if(response) {
      setUserSecert(response.data.client_secret)
      setPaymentIntentid(response.data.paymentIntentid)
      console.log(paymentIntentid, 'jjjjjjj')
    }
  };


  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">No guide found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
    
      <UserHeader/>
      
      
      <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto">
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-gray-200 pb-8">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-48 h-48 overflow-hidden rounded-full border-2 border-black shadow-md">
              <img 
                src={guide.imageUrl} 
                alt={`Guide ${guide.name}`} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{guide.name}</h1>
            <div className="mb-4">
              <StarRating rating={guide.rating} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <p className="font-semibold text-gray-700">Area of Expertise:</p>
                <p className="text-gray-900">{guide.expertise}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Experience:</p>
                <p className="text-gray-900">{guide.experience}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Languages:</p>
                <p className="text-gray-900">{guide.languages.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">District:</p>
                <p className="text-gray-900">{guide.district}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-2xl font-bold text-black">${guide.charge} <span className="text-sm font-normal text-gray-600">per day</span></p>
              <button
                onClick={() => travelGuide(guide._id)}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-200 shadow-sm"
              >
                Travel with this guide
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
            Reviews ({review?.reviews?.length ?? 0})
          </h2>
          <div className="space-y-6">
            {review?.reviews?.length ? (
              review.reviews.map((reviewItem, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 hover:bg-gray-50 p-4 rounded transition duration-150">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{reviewItem.username || "Anonymous"}</h3>
                    <span className="text-sm text-gray-500">Date Not Available</span>
                  </div>
                  <div className="mb-2">
                    <StarRating rating={reviewItem.rating || 0} />
                  </div>
                  <p className="text-gray-700">{reviewItem.comment || "No comment provided."}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No reviews yet</p>
                <p className="text-sm text-gray-400 mt-2">Be the first to review after your trip!</p>
              </div>
            )}
          </div>
        </div>


      </main>

     
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold">Select Available Date</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-black hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Month Selector */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMonth(index)}
                  className={`px-4 py-2 rounded-md transition flex-shrink-0 ${
                    activeMonth === index
                      ? 'bg-black text-white shadow-md'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
            
            {/* Slots List */}
            <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto p-2">
              {getFilteredSlots().length > 0 ? (
                getFilteredSlots().map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-4 rounded-md border transition duration-150 ${
                      selectedSlot?.id === slot.id
                        ? 'border-black bg-gray-100 shadow-md'
                        : 'border-gray-300 hover:border-black hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{slot.date}</p>
                        <p className="text-sm font-bold">{slot.day}</p>
                      </div>
                      <div>
                        <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">Available</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-gray-500">No available slots for this month</p>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => {
                  bookingSubmit(selectedSlot?.id)
                  setIsModalOpen(false);
                }}
                disabled={!selectedSlot}
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  selectedSlot
                    ? 'bg-black text-white hover:bg-gray-800 shadow-md'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      
      {userSecert && (
        <Payment 
          userSecret={userSecert} 
          guideId={guideId} 
          amount={amount} 
          userEmail={userEmail} 
          slotId={selectedSlot?.id}
          paymentIntentid={paymentIntentid}
        />
      )}
      
      {/* Footer */}
      <UserFooter/>
    </div>
  );
};



export default GuideDetails;