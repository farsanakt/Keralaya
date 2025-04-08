export interface Place {
    description: string
    category: string
    location: string
    id: string
    name: string
    district: string
    pincode: string
    image: string
  }
  
  export type NewPlace = Omit<Place, "id">


  export interface Place {
    id: string
    name: string
    description: string
    images: string[] // Array of image URLs
    category: string
    location: string
    district: string
    pincode: string
    rating?: number // Optional rating
    highlights?: string[] // Optional highlights/features
  }
  
  
  
  