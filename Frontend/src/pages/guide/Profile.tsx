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
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import 'react-toastify/dist/ReactToastify.css';


const guideSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
  email: z.string().email("Invalid email address"),
  expertise: z.string().min(1, "Expertise is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  experience: z.string().regex(/^\d+$/, "Experience should be a number"),
  phone: z.string().regex(/^\d{10}$/, "Phone number should be 10 digits"),
  profileImage: z.union([z.string(), z.instanceof(File)]),
})

type Guide = z.infer<typeof guideSchema>

export default function GuideProfileComponent() {

  const [isEditing, setIsEditing] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [guideeData, setGuideeData] = useState<Guide | null>(null)

  const [errors, setErrors] = useState<Partial<Record<keyof Guide, string>>>({})

  const { currentGuide } = useSelector((state: RootState) => state.guide)

  const { toast } = useToast()

  const guideData = async () => {

    if (!currentGuide?.data) {

      console.error("currentGuide is undefined!")

      return
    }

    try {

      const response = await guideDetails()

      console.log(response,'res')
      
      // const validatedData = guideSchema.parse(response.data)

      setGuideeData(response.data)

    } catch (error) {

      console.error("Error fetching guide details:", error)

      toast({
        title: "Error",
        description: "Failed to fetch guide details",
        variant: "destructive",
      })
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0]

    if (file && guideeData) {

      setGuideeData({ ...guideeData, profileImage: file })

    }
  }

  const handleLanguageChange = (languageId: string) => {

    if (guideeData) {

      const updatedLanguages = guideeData.languages.includes(languageId)

        ? guideeData.languages.filter((id) => id !== languageId)

        : [...guideeData.languages, languageId]

      setGuideeData({ ...guideeData, languages: updatedLanguages })

      validateField("languages", updatedLanguages)
      
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (guideeData) {
      setGuideeData({ ...guideeData, [name]: value })
      validateField(name as keyof Guide, value)
    }
  }

  const validateField = (field: keyof Guide, value: any) => {

    try {

      guideSchema.shape[field].parse(value)

      setErrors((prev) => ({ ...prev, [field]: undefined }))

    } catch (error) {

      if (error instanceof z.ZodError) {

        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))

      }
    }
  }

  const handleSave = async () => {

    if (!guideeData) return

    try {

      guideSchema.parse(guideeData)

      setErrors({})

    } catch (error) {

      if (error instanceof z.ZodError) {

        const newErrors: Partial<Record<keyof Guide, string>> = {}

        error.errors.forEach((err) => {

          if (err.path[0]) {

            newErrors[err.path[0] as keyof Guide] = err.message

          }

        })

        setErrors(newErrors)

        return

      }

    }

    setIsEditing(false)

    const formData = new FormData()

    formData.append("id", guideeData._id)
    formData.append("name", guideeData.name)
    formData.append("email", guideeData.email)
    formData.append("phone", guideeData.phone)
    formData.append("experience", guideeData.experience)
    formData.append("expertise", guideeData.expertise)

    guideeData.languages.forEach((lang) => formData.append("languages[]", lang))

    if (guideeData.profileImage instanceof File) {

      formData.append("profileImage", guideeData.profileImage)

    }

    try {

      const response = await updateProfile(formData)

      console.log(response,'res')

      if (response) {

        await guideData()

        toast({title: "Success",description: "Profile updated successfully"})

      } else {

        throw new Error("Update failed")

      }

    } catch (error) {

      console.error("Error updating profile:", error)

      toast({title: "Error",description: "Failed to update profile", variant: "destructive" })

    }
  }

  useEffect(() => {
    guideData()
  }, [currentGuide]) 

  if (!guideeData) {
    return <div>Loading...</div>
  }

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
                    src={
                      typeof guideeData.profileImage === "string"
                        ? guideeData.profileImage
                        : URL.createObjectURL(guideeData.profileImage)
                    }
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
                      className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
                      disabled={true}
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
                      className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                      className={`mt-1 ${errors.experience ? "border-red-500" : ""}`}
                    />
                    {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
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
                  onValueChange={(value) => {
                    setGuideeData({ ...guideeData, expertise: value })
                    validateField("expertise", value)
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
                {errors.expertise && <p className="text-red-500 text-xs mt-1">{errors.expertise}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-600">Languages Spoken</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {LANGUAGES.map((language) => (
                    <div key={language.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={language.id}
                        checked={guideeData.languages.includes(language.id)}
                        onCheckedChange={() => handleLanguageChange(language.id)}
                        disabled={!isEditing}
                      />
                      <Label htmlFor={language.id} className="text-sm text-gray-700">
                        {language.name}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages}</p>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

