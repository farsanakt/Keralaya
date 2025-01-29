"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Pencil, Save, User, Mail, Phone, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { type GuideProfile, LANGUAGES, EXPERTISE_AREAS } from '@/types/guideprofile'
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { guideDetails } from "@/service/guide/guideApi"


type Guide={

  name:string,
  email:string,
  expertise:string,
  languages:string[],
  experience:string
  phone:string
  profileImage:''

}

export default function GuideProfileComponent() {
  const [profile, setProfile] = useState<GuideProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    experience: "5",
    expertise: "Historical Sites",
    languages: ["english", "spanish"],
    profileImage: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [guideeData,setGuideeData]=useState<Guide | null>(null)
  const { currentGuide } = useSelector((state: RootState) => state.guide);


  
  
  const guideData = async () => {

    if (!currentGuide?.data) {

      console.error("currentGuide is undefined!")

      return;
    }
  
    const email:any = currentGuide.data
  
    try {

      const response = await guideDetails(email)
    
      setGuideeData(response.data)
      
    } catch (error) {

      console.error("Error fetching guide details:", error);
    }
  };
  

  

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfile((prev) => ({ ...prev, profileImage: imageUrl }))
    }
  }

  const handleLanguageChange = (languageId: string) => {
    setProfile((prev) => {
      const languages = prev.languages.includes(languageId)
        ? prev.languages.filter((id) => id !== languageId)
        : [...prev.languages, languageId]
      return { ...prev, languages }
    })
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving profile:", profile)
  }

  useEffect(()=>{

    guideData()


  },[])

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Guide Profile</h1>
      <Card className="w-full max-w-4xl mx-auto shadow-2xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-3xl">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
          
            <div className="md:w-1/3 bg-gray-900 p-8 flex flex-col items-center justify-center space-y-6">
              <div
                className="relative group cursor-pointer w-48 h-48 rounded-full overflow-hidden bg-white flex items-center justify-center border-4 border-white shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={handleImageClick}
              >
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-24 h-24 text-gray-400" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <Button
                variant={isEditing ? "default" : "outline"}
                className="w-full bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            
            <div className="md:w-2/3 p-8 space-y-6 bg-white">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <User className="w-6 h-6 text-gray-600" />
                  <div className="flex-grow">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-600">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={guideeData?.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-gray-600" />
                  <div className="flex-grow">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={guideeData?.email || ''}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-gray-600" />
                  <div className="flex-grow">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-600">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={guideeData?.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Award className="w-6 h-6 text-gray-600" />
                  <div className="flex-grow">
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-600">
                      Years of Experience
                    </Label>
                    <Input
                      id="experience"
                      value={profile.experience}
                      onChange={(e) => setProfile((prev) => ({ ...prev, experience: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertise" className="text-sm font-medium text-gray-600">
                  Area of Expertise
                </Label>
                <Select
                  disabled={!isEditing}
                  value={guideeData?.expertise || ''}
                  onValueChange={(value) => setProfile((prev) => ({ ...prev, expertise: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERTISE_AREAS.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

                          <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Languages Spoken</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {LANGUAGES.map((language) => (
                  
                  <div key={language.id} className="flex items-center space-x-2">
                   
                    <Checkbox
                      id={language.id}
                      checked={guideeData?.languages?.includes(language.name) ?? false} 
                      onCheckedChange={() => handleLanguageChange(language.id)}
                      disabled={!isEditing}
                    />
                    <Label htmlFor={language.id} className="text-sm text-gray-700">
                      {language.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

