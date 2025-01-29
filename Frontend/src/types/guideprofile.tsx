export interface GuideProfile {
    name: string
    email: string
    phone: string
    experience: string
    expertise: string
    languages: string[]
    profileImage?: string
  }
  
  export interface Language {
    id: string
    name: string
  }
  
  export const LANGUAGES: Language[] = [
    { id: "english", name: "English" },
    { id: "hindi", name: "Hindi" },
    { id: "malayalam", name: "Malayalam" },
    { id: "tamil", name: "Tamil" },
    { id: "kannada", name: "Kannada" },
  ]
  
  export const EXPERTISE_AREAS = [
    "Historical Sites",
    "Cultural Tours",
    "Adventure Tours",
    "Nature Walks",
    "City Tours",
    "Food Tours",
    "Religious Sites",
    "Photography Tours",
  ]
  
  