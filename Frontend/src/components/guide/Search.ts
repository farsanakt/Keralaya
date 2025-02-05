"use server"

import { Place } from "@/types/types"



// This simulates a database query - replace with your actual DB query
const places: Place[] = [
  {
      id: "1",
      name: "Calicut Beach",
      description: "A beautiful beach known for its sunset views and peaceful atmosphere.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(115)-O3RC2ZRYrm1JJ4tTFaCsNgaeYKi1IE.png",
      category: "Beach",
      location: "Calicut",
      district: "Kozhikode",
      pincode: "673001",
      images: []
  },
  // Add more places...
]

export async function searchPlaces(query: string): Promise<Place[]> {
  "use server"

  // Simulate database search with delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return places.filter(
    (place) =>
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.description.toLowerCase().includes(query.toLowerCase()),
  )
}

