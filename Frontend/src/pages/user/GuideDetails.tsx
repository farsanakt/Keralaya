import React, { useEffect, useState } from 'react';
import UserFooter from '@/components/user/UserFooter';
import UserHeader from '@/components/user/UserHeader';
import { useParams } from "react-router-dom";
import { singleGuidee } from '@/service/user/userApi';


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
  areaOfExpertise: string;
  experience: string;
  rating: number;
  languages: string[];
  district: string;
  amountPerDay: number;
  imageUrl: string;
  reviews: Review[];
  availableSlots: TimeSlot[];
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [activeMonth, setActiveMonth] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Transform availability slots to TimeSlot format
  const transformAvailabilitySlots = (slots: string[]): TimeSlot[] => {
    return slots.map((dateString, index) => {
      const date = new Date(dateString);
      return {
        id: `slot-${index}`,
        date: dateString.split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        startTime: "09:00", 
        endTime: "17:00",  
        isAvailable: true   
      };
    });
  };
  
  
  const getFilteredSlots = () => {
    if (!guide) return [];

    const targetMonth = (currentMonth + activeMonth) % 12;
    const targetYear = currentYear + Math.floor((currentMonth + activeMonth) / 12);
    
    return guide.availableSlots.filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.getMonth() === targetMonth && slotDate.getFullYear() === targetYear;
    });
  };

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        setLoading(true);
        if (id) {
          console.log(id,'hhhhfhhfghfj')
          const response = await singleGuidee(id)
          console.log(response,'jjjj')
          if (response.data && response.data.length > 0) {
            const guideData = response.data[0];
            
            
            const transformedGuide: Guide = {
              _id: guideData._id,
              name: guideData.name,
              areaOfExpertise: guideData.areaOfExpertise || 'Not specified',
              experience: guideData.experience || 'Not specified',
              rating: guideData.rating || 0,
              languages: guideData.languages ,
              district: guideData.district,
              amountPerDay: guideData.amountPerDay || 0,
              imageUrl: guideData.profileImage || "/api/placeholder/200/200",
              reviews: guideData.reviews || [],
              availableSlots: transformAvailabilitySlots(guideData.availabilitySlots || [])
            };

            setGuide(transformedGuide);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading guide details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No guide found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <UserHeader/>
      
      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 max-w-6xl mx-auto">
        {/* Guide Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-gray-200 pb-8">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-48 h-48 overflow-hidden rounded-full border-2 border-black">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Area of Expertise:</p>
                <p>{guide.areaOfExpertise}</p>
              </div>
              <div>
                <p className="font-semibold">Experience:</p>
                <p>{guide.experience}</p>
              </div>
              <div>
                <p className="font-semibold">Languages:</p>
                <p>{guide.languages.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold">District:</p>
                <p>{guide.district}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold">${guide.amountPerDay} per day</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-200"
              >
                Travel with this guide
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
            Reviews ({guide.reviews.length})
          </h2>
          <div className="space-y-6">
            {guide.reviews.length > 0 ? (
              guide.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{review.userName || 'Anonymous'}</h3>
                    <span className="text-sm">{review.date || 'No date'}</span>
                  </div>
                  <div className="mb-2">
                    <StarRating rating={review.rating || 0} />
                  </div>
                  <p className="text-gray-700">{review.comment || 'No comment'}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No reviews yet</p>
            )}
          </div>
        </div>
      </main>

      {/* Availability Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
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
            <div className="flex space-x-2 mb-6">
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMonth(index)}
                  className={`px-4 py-2 rounded-md transition ${
                    activeMonth === index
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
            
            {/* Slots List */}
            <div className="grid grid-cols-1 gap-3">
              {getFilteredSlots().length > 0 ? (
                getFilteredSlots().map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={!slot.isAvailable}
                    className={`p-4 rounded-md border ${
                      selectedSlot?.id === slot.id
                        ? 'border-black bg-gray-100'
                        : slot.isAvailable
                        ? 'border-gray-300 hover:border-black'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{slot.date}</p>
                        <p className="text-sm font-bold">{slot.day}</p>
                      </div>
                      <div>
                        {slot.isAvailable ? (
                          <span className="text-sm bg-black text-white px-2 py-1 rounded">Available</span>
                        ) : (
                          <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">Booked</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No available slots for this month
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => {
                  // Handle booking logic here
                  alert(`Booking confirmed for ${selectedSlot?.date} (${selectedSlot?.day})`);
                  setIsModalOpen(false);
                }}
                disabled={!selectedSlot}
                className={`w-full py-3 rounded-md ${
                  selectedSlot
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <UserFooter/>
    </div>
  );
};

export default GuideDetails;