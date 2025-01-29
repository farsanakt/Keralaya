

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { addLocations } from "@/service/guide/guideApi";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ImageType {
  file: File;
  preview: string;
}

interface FormData {
  name: string;
  district: string;
  street: string;
  pincode: string;

}

export function AddLocationModal({ isOpen, onClose }: AddLocationModalProps) {

  const [images, setImages] = useState<ImageType[]>([]);

  const { register, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      district: "",
      street: "",
      pincode: "",
      
    },
  });

 
 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  if (!e.target.files) return;

  const filesArray = Array.from(e.target.files); 

  const updatedImages = filesArray.map((file:any) => ({

    file,
    preview: URL.createObjectURL(file), 

  }));

  setImages((prevImages) => [...prevImages, ...updatedImages])
};

  const removeImage = (index: number) => {

    setImages((prevImages) => prevImages.filter((_, i) => i !== index))

  };
  
  

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('district', data.district);
      formData.append('street', data.street);
      formData.append('pincode', data.pincode);
  
      
      images.forEach((img) => {
        formData.append('image', img.file); 
      });
  
      console.log(...formData.entries(), 'formData');
  
      const response = await addLocations(formData); 
      if (response) {
        toast.success('location added successfully..!')
        reset();
        onClose();
      } else {
        toast.error('Failed to save location.')
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred.');
    }
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="col-span-3"
              />
            </div>

            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="district" className="text-right">
                District
              </Label>
              <Input
                id="district"
                {...register("district", { required: "District is required" })}
                className="col-span-3"
              />
            </div>

            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Street
              </Label>
              <Input
                id="street"
                {...register("street", { required: "Street is required" })}
                className="col-span-3"
              />
            </div>

            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pincode" className="text-right">
                Pincode
              </Label>
              <Input
                id="pincode"
                type="number"
                {...register("pincode", {
                  required: "Pincode is required",
                  minLength: { value: 6, message: "Pincode must be 6 digits" },
                })}
                className="col-span-3"
              />
            </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="images" className="text-right">
                  Images
                </label>
                <div className="col-span-3">
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm"
                  />
                  <div className="mt-2 flex gap-4 overflow-x-auto">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 flex-shrink-0" // Reduced size and flex-shrink for horizontal alignment
                      >
                        <img
                          src={img.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                          onClick={() => removeImage(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Location</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
