"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Pencil, Save, User, Mail, Phone, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { LANGUAGES, EXPERTISE_AREAS } from "@/types/guideprofile"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { guideDetails, updateProfile } from "@/service/guide/guideApi"

type Guide = {
  _id:string
  name: string
  email: string
  expertise: string
  languages: string[]
  experience: string
  phone: string
  profileImage: File
}

export default function GuideProfileComponent() {
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [guideeData, setGuideeData] = useState<Guide | null>(null)
  const { currentGuide } = useSelector((state: RootState) => state.guide)

  const guideData = async () => {
    if (!currentGuide?.data) {
      console.error("currentGuide is undefined!")
      return
    }

    const email:any = currentGuide.data

    try {
      const response = await guideDetails(email)
      setGuideeData(response.data)
    } catch (error) {
      console.error("Error fetching guide details:", error)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && guideeData) {
      const imageUrl = URL.createObjectURL(file)
      setGuideeData({ ...guideeData, profileImage: file })
    }
  }

  const handleLanguageChange = (languageId: string) => {
    if (guideeData) {
      const updatedLanguages = guideeData.languages.includes(languageId)
        ? guideeData.languages.filter((id) => id !== languageId)
        : [...guideeData.languages, languageId]
      setGuideeData({ ...guideeData, languages: updatedLanguages })
    }
  }



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (guideeData) {
      setGuideeData({ ...guideeData, [name]: value })
    }
  }

  const handleSave = async() => {
    setIsEditing(false)
    console.log("Saving profile:", guideeData)

    const formdata=new FormData()
    if(guideeData){
      formdata.append('id',guideeData?._id),
      formdata.append('name',guideeData?.name)
      formdata.append('email',guideeData?.email)
      formdata.append('phone',guideeData?.phone)
      formdata.append('experience',guideeData?.experience)
      formdata.append('expertise',guideeData?.expertise)
    }
    if(guideeData?.profileImage){

      formdata.append('profileImage',guideeData.profileImage)

    }
    console.log(formdata,'fpe')

   const response=await updateProfile(formdata)

   
  }

  useEffect(() => {
    guideData()
  }, [currentGuide]) // Added currentGuide as a dependency

  if (!guideeData) {
    return <div>Loading...</div>
  }

  console.log(guideeData,'')

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
                {guideeData.profileImage ? (
                  <img
                    src={URL.createObjectURL(guideeData?.profileImage ) || "/placeholder.svg"}
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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={!isEditing}
              />
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
                      name="name"
                      value={guideeData.name}
                      onChange={handleInputChange}
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
                      name="email"
                      type="email"
                      value={guideeData.email}
                      onChange={handleInputChange}
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
                      name="phone"
                      value={guideeData.phone}
                      onChange={handleInputChange}
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
                      name="experience"
                      value={guideeData.experience}
                      onChange={handleInputChange}
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
                  value={guideeData.expertise}
                  onValueChange={(value) => setGuideeData({ ...guideeData, expertise: value })}
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
                        checked={guideeData.languages.includes(language.name)}
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

