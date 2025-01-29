import React from 'react';
import UserHeader from '../../components/user/UserHeader';
import UserFooter from '../../components/user/UserFooter';
import hill from '../../assets/m.jpg'
import waterfalls from '../../assets/m1.jpg'
import mountain from '../../assets/m2.jpg'

const Home: React.FC = () => {
  return (
    <main className="bg-gray-50">
      <UserHeader/>
      <section className="bg-green-100">
        <div className="container mx-auto text-center py-16 px-6">
          <h1 className="text-4xl font-extrabold text-green-900">
            Let’s Explore The World with Us
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Discover new destinations, adventures, and experiences tailored just for you.
          </p>
          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search for a destination, beach, or activity"
              className="px-4 py-3 w-2/3 sm:w-1/2 border border-gray-300 rounded shadow-md"
            />
            <button className="ml-4 bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800">
              Search
            </button>
          </div>
          <div className="mt-12 flex justify-center space-x-12">
            <div className="text-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
                🌊
              </div>
              <p className="mt-4 font-semibold text-green-900">Beaches</p>
            </div>
            <div className="text-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
                🏔️
              </div>
              <p className="mt-4 font-semibold text-green-900">Mountains</p>
            </div>
            <div className="text-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
                🎉
              </div>
              <p className="mt-4 font-semibold text-green-900">Festivals</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center text-green-800">
          The Best Destination
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Explore some of the most breathtaking locations in Kerala.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={hill}
              alt="Athirappally Waterfalls"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-green-900">
                Athirappally Waterfalls
              </h3>
              <p className="text-gray-600 mt-2">
                Witness the grandeur of the 'Niagara of India' surrounded by lush greenery.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={waterfalls}
              alt="Varkala Beach"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-green-900">Varkala Beach</h3>
              <p className="text-gray-600 mt-2">
                A serene escape with pristine sands and majestic cliffs.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={mountain}
              alt="Wayanad Hills"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-green-900">Wayanad Hills</h3>
              <p className="text-gray-600 mt-2">
                Discover the beauty of misty hills, coffee plantations, and wildlife.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-green-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800">
            Plan Your Next Trip
          </h2>
          <p className="text-gray-700 mt-2">
            Get exclusive travel guides, handpicked for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-xl text-green-900">Vimal</h3>
              <p className="text-gray-600 mt-2">Expert in Backwater Tours</p>
              <p className="font-semibold text-green-700 mt-4">$100</p>
              <button className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
                Booking
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-xl text-green-900">Nikhil</h3>
              <p className="text-gray-600 mt-2">Specialist in Hill Stations</p>
              <p className="font-semibold text-green-700 mt-4">$150</p>
              <button className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
                Booking
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-xl text-green-900">Amal</h3>
              <p className="text-gray-600 mt-2">Coastal Expert</p>
              <p className="font-semibold text-green-700 mt-4">$250</p>
              <button className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
                Booking
              </button>
            </div>
          </div>
        </div>
      </section>
      <UserFooter/>
    </main>
  );
};

export default Home;