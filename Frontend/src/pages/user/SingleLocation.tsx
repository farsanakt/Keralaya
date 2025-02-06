"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserFooter from "@/components/user/UserFooter"
import UserHeader from "@/components/user/UserHeader"
import { MapPin} from "lucide-react"
import { getLocationDetails } from "@/service/user/userApi"

interface Guide {
  id: string
  name: string
  rating: number
  experience: string
  image: string
}

interface LocationDetails {
  name: string
  district: string
  street: string
  pincode: string
  images: string[]
  discription?: string
  guides?: Guide[]
}

const CardComponent: React.FC = () => {
  const { id: locationId } = useParams<{ id: string }>()
  const [locationDetails, setLocationDetails] = useState<LocationDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    if (locationId) {

      fetchLocationDetails(locationId)

    }

  }, [locationId])

  const fetchLocationDetails = async (id: string) => {

    try {

      setIsLoading(true)

      const response = await getLocationDetails(id)

      if (response && response.data) {

        setLocationDetails(response.data)

      }

    } catch (error) {

      console.error("Error fetching location details:", error)

      setError("Failed to fetch location details. Please try again later.")

    } finally {

      setIsLoading(false)

    }

  }

  if (isLoading) {
    
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!locationDetails) {
    return <div className="flex justify-center items-center h-screen text-gray-500">No location details found.</div>
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
        
        
        <section className="grid grid-cols-12 gap-4 mb-8 w-full">
          <div className="col-span-12 lg:col-span-6 h-96 rounded-xl overflow-hidden shadow-md">
            <img
              src={locationDetails.images[0] || "/placeholder.jpg"}
              alt={locationDetails.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-2">
            {locationDetails.images.slice(1, 5).map((image, index) => (
              <div key={index} className="h-40 rounded-lg overflow-hidden shadow-md">
                <img src={image} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
        
        
        <section className="bg-gray-100 p-6 rounded-lg shadow-md mb-8 w-full">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">About the Destination</h2>
          <p className="text-gray-700 leading-relaxed">{locationDetails.discription}</p>
        </section>

        
        <section className="bg-white p-6 rounded-lg shadow-md border mb-8 w-full">
          <h2 className="text-xl font-semibold text-gray-900">$750.00 per night</h2>
          <p className="text-gray-600 text-sm">Check-in: August 2, 2024 | Check-out: August 5, 2024</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Book Now
          </button>
        </section>
      </main>

      <UserFooter />
    </div>
  )
}

export default CardComponent
