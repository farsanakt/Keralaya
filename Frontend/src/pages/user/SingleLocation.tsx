import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserFooter from "@/components/user/UserFooter";
import UserHeader from "@/components/user/UserHeader";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { getGuideDetails, getLocationDetails } from "@/service/user/userApi";
import axios from "axios";

interface Guide {
  _id: string;
  name: string;
  email: string;
  experience: string;
  expertise: string;
  languages: string[];
  phone: string;
  profileImage: string;
  isBlocked: boolean;
}

interface LocationDetails {
  _id:string;
  name: string;
  district: string;
  street: string;
  pincode: string;
  images: string[];
  discription?: string;
  guides?: Guide[];
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

interface WeatherCondition {
  description: string;
  main: string;
}

interface WindData {
  speed: number;
}

interface WeatherData {
  main: WeatherMain;
  weather: WeatherCondition[];
  wind: WindData;
}

const GuideCard: React.FC<{ guide: Guide }> = ({ guide }) => {
 
  const renderStarRatings = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
        {halfStar && (
          <Star 
            className="w-5 h-5 text-yellow-400" 
            style={{ 
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' 
            }} 
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 grid grid-cols-3 gap-4">
     
      <div className="col-span-1 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
          <img 
            src={guide.profileImage || "/placeholder-avatar.jpg"} 
            alt={guide.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-center">{guide.name}</h3>
      </div>

      
      <div className="col-span-1 space-y-2">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600">{guide.expertise}</span>
        </div>
        <div className="text-sm text-gray-600">
          <strong>Languages:</strong> {guide.languages.join(", ")}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Experience:</strong> {guide.experience} years
        </div>
        
        
        <div className="flex items-center space-x-2">
          {renderStarRatings(4.5)}
          <span className="text-sm text-gray-500">(127 Reviews)</span>
        </div>
      </div>

      
      <div className="col-span-1 flex flex-col justify-center items-center">
        <div className="text-center mb-4">
          <p className="text-xl font-bold text-blue-600">₹2,000 
            <span className="text-sm text-gray-500 ml-1">per day</span>
          </p>
        </div>
        <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

const CardComponent = () => {
  const { id: locationId } = useParams<{ id: string }>();
  const [locationDetails, setLocationDetails] = useState<LocationDetails | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [mainImageIndex, setMainImageIndex] = useState(0);

const [loading, setLoading] = useState(false);
const [weather, setWeather] = useState<WeatherData | null>(null);


  useEffect(() => {
    if (locationId) {
      fetchLocationDetails(locationId);
    }
    
  }, [locationId]);

  useEffect(() => {
    if (activeTab === "weather" && locationDetails?.district) {
      const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${locationDetails?.district},IN&appid=${API_KEY}&units=metric`
          );
  
          setWeather(response.data);
        } catch (err) {
          setError("Failed to fetch weather data. Please try again.");
        }
  
        setLoading(false);
      };
  
      fetchWeather();
    }
  }, [activeTab, locationDetails?.district]);
  
  

  useEffect(() => {
    if (locationDetails?.district) {
      fetchGuideDetails(locationDetails.district);
    }
  }, [locationDetails]);

  const fetchLocationDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getLocationDetails(id);
      if (response && response.data) {
        setLocationDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      setError("Failed to fetch location details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGuideDetails = async (district: string) => {
    try {
      const response = await getGuideDetails(district);

      if (response && response.data) {
        setGuides(response.data);
      }
    } catch (error) {
      console.error("Error fetching guide details:", error);
    }
  };

  const handleNextImage = () => {
    if (locationDetails && locationDetails.images) {
      setMainImageIndex((prevIndex) => 
        (prevIndex + 1) % locationDetails.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (locationDetails && locationDetails.images) {
      setMainImageIndex((prevIndex) => 
        prevIndex === 0 ? locationDetails.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!locationDetails) {
    return <div className="flex justify-center items-center h-screen text-gray-500">No location details found.</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <UserHeader />
      
      <main className="w-full px-4 py-6 md:px-12 lg:px-24">
        <section className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{locationDetails.name}</h1>
          <p className="text-gray-600 flex items-center mt-2">
            <MapPin className="w-5 h-5 mr-2" /> {locationDetails.district}, {locationDetails.street}
          </p>
        </section>

        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="relative">
              <img
                src={locationDetails.images[mainImageIndex]}
                alt="Main view"
                className="w-full h-[500px] object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {locationDetails.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => setMainImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Gallery ${index}`}
                  className="w-full h-[240px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8">
          <div className="flex space-x-8 border-b">
            {["overview", "weather", "availability"].map((tab) => (
              <button
                key={tab}
                className={`pb-2 px-1 font-medium capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "availability" ? (
          <div className="space-y-4">
            {guides.map((guide) => (
              <GuideCard key={guide._id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">About the Destination</h2>
                  <p className="text-gray-700 leading-relaxed">{locationDetails.discription}</p>
                </div>
              )}
              {/* {activeTab === "ratings" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Ratings & Reviews</h2>
                  <p className="text-gray-700">Rating information would go here...</p>
                </div>
              )} */}
         {activeTab === "weather" && (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
    {loading && (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800"></div>
      </div>
    )}
    
    {error && (
      <div className="bg-gray-200 border border-gray-400 text-gray-800 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    )}

    {weather && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {locationDetails?.street || 'Current Location'}
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-6xl font-bold text-gray-900">
              {Math.round(weather.main.temp)}°
            </div>
            <div>
              <p className="text-lg capitalize text-gray-800">
                {weather.weather[0].description}
              </p>
              <p className="text-sm text-gray-700">
                Feels like {Math.round(weather.main.feels_like)}°
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-300 rounded-lg p-4 text-center shadow-sm">
            <div className="text-gray-900 text-2xl font-bold">
              {weather.main.humidity}%
            </div>
            <p className="text-xs text-gray-600">Humidity</p>
          </div>
          
          <div className="bg-white border border-gray-300 rounded-lg p-4 text-center shadow-sm">
            <div className="text-gray-900 text-2xl font-bold">
              {weather.wind.speed.toFixed(1)}
            </div>
            <p className="text-xs text-gray-600">Wind (m/s)</p>
          </div>
          
          <div className="bg-white border border-gray-300 rounded-lg p-4 text-center shadow-sm">
            <div className="text-gray-900 text-2xl font-bold">
              {weather.main.pressure}
            </div>
            <p className="text-xs text-gray-600">Pressure</p>
          </div>
        </div>
      </div>
    )}
  </div>
)}

            </section>

            <section className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-900">2000.00 </h2>
              {/* <p className="text-gray-600 text-sm mt-2">Check-in: August 2, 2024</p>
              <p className="text-gray-600 text-sm">Check-out: August 5, 2024</p> */}
             <Link to={`/guidelist/${locationId}`}>

             <button className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1">
                Book Now
              </button>
             </Link>
            </section>
          </div>
        )}
      </main>

      <UserFooter />
    </div>
  );
};

export default CardComponent;