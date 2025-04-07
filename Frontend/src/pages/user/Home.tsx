import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import hill from '../../assets/m.jpg';
import waterfalls from '../../assets/m1.jpg';
import mountain from '../../assets/m2.jpg';
import { allLocations, getLocation } from '@/service/user/userApi';
import { MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<{_id:string,street : string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [places,setPlaces]=useState(null)

  const navigate=useNavigate()

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSearchInput(value)

    if (value.trim() !== '') {
      searchLocation(value)
    } else {
      setSearchResults([])
      setShowDropdown(false);
    }
  };

  const searchLocation = async (value: string) => {
    if (searchInput.trim() === '') return

    try {
      const response = await getLocation(searchInput)

      if (response && response.data) {
        setSearchResults(response.data)
        setShowDropdown(true);
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
      setSearchResults([])
      setShowDropdown(false)
    }
  };

  const handleSelect = (id: string, street: string) => {
    if (!id) {
      console.error("ID is undefined or null, cannot navigate.")
      return
    }
    setSearchInput(`Location: ${street}`)
    setShowDropdown(false);
    navigate(`/singlelocation/${id}`)
  };

  const fetchingAllocations=async()=>{

    const response=await allLocations()

    

  }

  useEffect(()=>{
    fetchingAllocations()
  })
  
  return (
    <main className="bg-gray-100">
      <UserHeader />
      <section className="bg-gray-200">
        <div className="container mx-auto text-center py-16 px-6">
          <h1 className="text-4xl font-extrabold text-black">
            Let's Explore The World with Us
          </h1>
          <p className="text-lg text-gray-800 mt-4">
            Discover new destinations, adventures, and experiences tailored just for you.
          </p>
          <div className="mt-8 flex justify-center relative">
            <div className="relative w-2/3 sm:w-1/2">
              <input
                onChange={handleSearch}
                value={searchInput}
                type="text"
                placeholder="Search for a destination, beach, or activity"
                className="px-4 py-3 w-full border border-gray-400 rounded shadow-md bg-white text-black"
              />
              {showDropdown && searchResults.length > 0 && (
               <ul className="absolute top-full left-1/2 transform -translate-x-1/2 w-full bg-white border border-gray-400 rounded shadow-md mt-1 z-10">
               {searchResults.map((result, index) => (
                 <li
                   key={index}
                   className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-left"
                   onClick={() => handleSelect(result._id,result.street)}
                 >
                   <div className="flex justify-center items-center gap-2">
                     <MapPin className="w-4 h-4 text-gray-700" />
                     <span>{result.street}</span>
                   </div>
                 </li>
               ))}
             </ul>
             
              )}
            </div>
            <button className="ml-4 bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center text-black">
          The Best Destination
        </h2>
        <p className="text-center text-gray-700 mt-2">
          Explore some of the most breathtaking locations in Kerala.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          {[hill, waterfalls, mountain].map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={image} alt={`Destination ${index + 1}`} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg text-black">Destination {index + 1}</h3>
                <p className="text-gray-700 mt-2">
                  A beautiful and mesmerizing location to explore.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-black">Plan Your Next Trip</h2>
          <p className="text-gray-700 mt-2">Get exclusive travel guides, handpicked for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            {[
              { name: 'Vimal', expertise: 'Backwater Tours', price: 100 },
              { name: 'Nikhil', expertise: 'Hill Stations', price: 150 },
              { name: 'Amal', expertise: 'Coastal Expert', price: 250 },
            ].map((guide, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl text-black">{guide.name}</h3>
                <p className="text-gray-700 mt-2">{guide.expertise}</p>
                <p className="font-semibold text-gray-900 mt-4">${guide.price}</p>
                <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                  Booking
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <UserFooter />
    </main>
  );
};

export default Home;