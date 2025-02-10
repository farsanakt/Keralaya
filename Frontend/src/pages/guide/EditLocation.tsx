import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { editPlace } from "@/service/admin/adminApi"
import { useToast } from "@/components/ui/use-toast"

interface Place {
  id: string
  name: string
  district: string
  street: string
  pincode: string
  images: string[]
}

interface EditLocationModalProps {
  place: Place
  onClose: () => void
  onSave: (updatedPlace: Place) => void
}

export function EditLocationModal({ place, onClose, onSave }: EditLocationModalProps) {

  const [editedPlace, setEditedPlace] = useState<Place>(place)
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])
  const [isOpen, setIsOpen] = useState(true)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedPlace((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files
    if (files && files.length > 0) {
      const filesArray = Array.from(files)
      setNewImageFiles((prev) => [...prev, ...filesArray])
      const newImages = filesArray.map((file) => URL.createObjectURL(file))
      setEditedPlace((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
    }
  }

  const removeImage = (index: number) => {
    setEditedPlace((prev) => {
      const newImages = [...prev.images]
      
      if (newImages[index].startsWith('blob:')) {
        URL.revokeObjectURL(newImages[index])
        setNewImageFiles((prev) => prev.filter((_, i) => i !== index - editedPlace.images.length + newImageFiles.length))
      }
      newImages.splice(index, 1)
      return { ...prev, images: newImages }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("id", editedPlace.id)
    formData.append("name", editedPlace.name)
    formData.append("district", editedPlace.district)
    formData.append("street", editedPlace.street)
    formData.append("pincode", editedPlace.pincode)

    
    editedPlace.images.forEach((imageUrl) => {
      if (!imageUrl.startsWith("blob:")) {
        formData.append("existingImageUrls", imageUrl)
      }
    })

    
    newImageFiles.forEach((file) => {
      formData.append("image", file)
    })

    try {
      const response = await editPlace(formData)
      const updatedPlace = response.data
    
      editedPlace.images.forEach((image) => {
        if (image.startsWith('blob:')) {
          URL.revokeObjectURL(image)
        }
      })

      onSave(updatedPlace)
      toast({
        title: "Success",
        description: "Place updated successfully",
      })
      setIsOpen(false)
      onClose()
    } catch (error) {
      console.error("Error updating place:", error)
      toast({
        title: "Error",
        description: "Failed to update place. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          
          editedPlace.images.forEach((image) => {
            if (image.startsWith('blob:')) {
              URL.revokeObjectURL(image)
            }
          })
          setIsOpen(false)
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editedPlace.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="district" className="text-right">
                District
              </Label>
              <Input
                id="district"
                name="district"
                value={editedPlace.district}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Street
              </Label>
              <Input
                id="street"
                name="street"
                value={editedPlace.street}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pincode" className="text-right">
                Pincode
              </Label>
              <Input
                id="pincode"
                name="pincode"
                value={editedPlace.pincode}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="images" className="text-right">
                Images
              </Label>
              <div className="col-span-3">
                <Input 
                  id="images" 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handleImageUpload}
                />
                <ScrollArea className="h-[200px] w-full rounded-md border p-4 mt-2">
                  <div className="grid grid-cols-3 gap-2">
                    {editedPlace.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 w-6 h-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}