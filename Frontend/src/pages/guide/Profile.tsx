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
import { guiddeDetails, updateProfile } from "@/service/guide/guideApi"
import { useToast } from "@/components/ui/use-toast"

// Define more specific types
interface Guide {
  _id: string;
  name: string;
  email: string;
  expertise: string;
  languages: string[];
  experience: string;
  phone: string;
  profileImage: string | File;
  charge?: string;
  district?: string;
}

const initialGuideState: Guide = {
  _id: "",
  name: "",
  email: "",
  expertise: "",
  languages: [],
  experience: "",
  phone: "",
  profileImage: "",
  charge: "",
  district: ""
}

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

export default function GuideProfileComponent() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [guideData, setGuideData] = useState<Guide>(initialGuideState)
  const [errors, setErrors] = useState<Partial<Record<keyof Guide, string>>>({})
  const { currentGuide } = useSelector((state: RootState) => state.guide)
  const { toast } = useToast()

  const fetchGuideData = async () => {
    if (!currentGuide?.data) {
      console.error("currentGuide is undefined!")
      return
    }
  
  
    const email: string = typeof currentGuide.data === "string" ? currentGuide.data : "";
  
    if (!email) {
      console.error("Invalid email provided!");
      return;
    }
  
    try {
      setIsLoading(true);
     
      const response = await guiddeDetails(email); 
  
      console.log("Guide data response:", response);
      
      if (response) {
       
        const validatedData: Guide = {
          _id: response._id || "",
          name: response.name || "",
          email: response.email || "",
          expertise: response.expertise || "",
          languages: response.languages || [],
          experience: response.experience || "",
          phone: response.phone || "",
          profileImage: response.profileImage || "",
          charge: response.charge || "",
          district: response.district || ""
        };
        setGuideData(validatedData);
      }
    } catch (error) {
      console.error("Error fetching guide details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch guide details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setGuideData({ ...guideData, profileImage: file })
    }
  }

  const handleLanguageChange = (languageId: string) => {
    const updatedLanguages = guideData.languages.includes(languageId)
      ? guideData.languages.filter((id) => id !== languageId)
      : [...guideData.languages, languageId]

    setGuideData({ ...guideData, languages: updatedLanguages })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGuideData({ ...guideData, [name]: value })
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      
     
      formData.append("_id", guideData._id)
      formData.append("name", guideData.name)
      formData.append("email", guideData.email)
      formData.append("phone", guideData.phone)
      formData.append("experience", guideData.experience)
      formData.append("expertise", guideData.expertise)
      
      if (guideData.charge) {
        formData.append("charge", guideData.charge)
      }
      
      if (guideData.district) {
        formData.append("district", guideData.district)
      }
      
      // Handle languages as an array
      guideData.languages.forEach(lang => {
        formData.append("languages[]", lang)
      })

      // Handle profile image if it's a File
      if (guideData.profileImage instanceof File) {
        formData.append("profileImage", guideData.profileImage)
      }

      const response = await updateProfile(formData)
      
      if (response) {
        await fetchGuideData()
        setIsEditing(false)
        toast({
          title: "Success",
          description: "Profile updated successfully"
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    fetchGuideData()
  }, [currentGuide])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 space-y-8">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="space-y-6">
              <Skeleton className="h-48 w-48 rounded-full mx-auto" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Guide Profile
      </h1>
      <Card className="w-full max-w-4xl mx-auto shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gray-900 p-8 flex flex-col items-center justify-center space-y-6">
              <div
                className={`relative group w-48 h-48 rounded-full overflow-hidden bg-white flex items-center justify-center border-4 border-white shadow-lg transition-all duration-300 ${
                  isEditing ? "cursor-pointer hover:scale-105" : ""
                }`}
                onClick={handleImageClick}
              >
                {guideData.profileImage ? (
                  <img
                    src={
                      typeof guideData.profileImage === "string"
                        ? guideData.profileImage
                        : URL.createObjectURL(guideData.profileImage)
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-24 h-24 text-gray-400" />
                )}
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                )}
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
                className={`w-full transition-all duration-300 ${
                  isEditing
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
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
                {[
                  { icon: User, name: "name", label: "Name", type: "text" },
                  { icon: Mail, name: "email", label: "Email", type: "email", disabled: true },
                  { icon: Phone, name: "phone", label: "Phone Number", type: "text" },
                  { icon: Award, name: "experience", label: "Years of Experience", type: "text" },
                  // { icon: Award, name: "charge", label: "Charge (₹)", type: "text" },
                  { icon: Award, name: "district", label: "District", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="flex items-center space-x-4">
                    <field.icon className="w-6 h-6 text-gray-600" />
                    <div className="flex-grow">
                      <Label htmlFor={field.name} className="text-sm font-medium text-gray-600">
                        {field.label}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={guideData[field.name as keyof Guide] as string || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing || field.disabled}
                        className={`mt-1 ${
                          errors[field.name as keyof Guide] ? "border-red-500" : ""
                        }`}
                      />
                      {errors[field.name as keyof Guide] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[field.name as keyof Guide]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertise" className="text-sm font-medium text-gray-600">
                  Area of Expertise
                </Label>
                <Select
                  disabled={!isEditing}
                  value={guideData.expertise}
                  onValueChange={(value) => {
                    setGuideData({ ...guideData, expertise: value })
                  }}
                >
                  <SelectTrigger className={`w-full ${errors.expertise ? "border-red-500" : ""}`}>
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
                {errors.expertise && (
                  <p className="text-red-500 text-xs mt-1">{errors.expertise}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600">Languages Spoken</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {LANGUAGES.map((language) => (
                    <div key={language.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={language.id}
                        checked={guideData.languages.includes(language.id)}
                        onCheckedChange={() => handleLanguageChange(language.id)}
                        disabled={!isEditing}
                      />
                      <Label
                        htmlFor={language.id}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {language.name}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.languages && (
                  <p className="text-red-500 text-xs mt-1">{errors.languages}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}