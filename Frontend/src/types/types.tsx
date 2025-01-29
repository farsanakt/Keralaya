export interface Place {
    id: string
    name: string
    district: string
    pincode: string
    image: string
  }
  
  export type NewPlace = Omit<Place, "id">
  
  