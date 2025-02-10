import { Response,Request } from "express";
import cloudinary from "@/config/cloudinary";
import Location from "@/models/guideModel/placeModel";
import MulterRequest from "@/dto/type"; 
import Places from "@/models/guideModel/placeModel"
import { GuideService } from "@/services/guide/guideService";
import { HttpStatus } from "@/enums/HttpStatus";
import logger from "@/utils/logger.utils";
import { error, profile } from "console";
import { CustomeRequest } from "@/middleware/isAuthenticated";

const guideService=new GuideService()

interface LocationRequestBody {
  id:string;
  name: string;
  district: string;
  street: string;
  pincode: string;
  discription:string
}

class GuideController {

  async addLocations(req: MulterRequest, res: Response) {
    try {

      const { name, district, street, pincode ,discription}: LocationRequestBody = req.body

      const files = req.files as Express.Multer.File[]
  
      if (!files || files.length === 0) {

         res.status(400).json({ message: "At least one image is required" })

         return

      }
  
      const uploadedImages: string[] = [];
  
      
      for (const file of files) {

        const result = await cloudinary.uploader.upload(file.path, {

          folder: "locations",

        })

        uploadedImages.push(result.secure_url)
      }
  
      
      const newLocation = new Location({
        name,
        district,
        street,
        pincode,
        discription,
        images: uploadedImages, 
      });
  
      
      await newLocation.save();
  
      res.status(201).json({

        message: "Location added successfully",

        data: newLocation,

      })

    } catch (error) {

      console.error("Error adding location:", error)

      res.status(500).json({ message: "Something went wrong", error })
      
    }
  }

  async displayLocations(req:Request,res:Response){

    try {

      // console.log('reached here')

      // const places=await Places.find()

      // console.log(places,'kfkkfjgfjkg')

      // return

      const response=await guideService.getAllPlaces()

      if(response){

        res.status(HttpStatus.CREATED).json(response)

      }
      
    } catch (error) {
      
      console.log('error',error)
    }

  }

  async editLocations(req: MulterRequest, res: Response) {

    try {

      const { id, name, district, street, pincode, existingImageUrls } = req.body

      const files = req.files as Express.Multer.File[]
      
      let uploadedImages: string[] = []
  
     
      if (existingImageUrls) {

        uploadedImages = Array.isArray(existingImageUrls) ? existingImageUrls : [existingImageUrls]

      }
  
      
      if (files && files.length > 0) {

        for (const file of files) {

          const result = await cloudinary.uploader.upload(file.path, { folder: "locations"})

          uploadedImages.push(result.secure_url)

        }
      }
  
      const locationData = {
        id,
        name,
        district,
        street,
        pincode,
        images: uploadedImages  
      }
  
      const response = await guideService.editPlaces(locationData)
      
      if (!response) {

         res.status(404).json({ message: "Location not found" })

         return
      }
  
      res.status(200).json(response)

      return
  
    } catch (error) {

       console.error("Error updating location:", error)

       res.status(500).json({ message: "Error updating location" })

       return
       
    }
  }

  async deletePlaces(req:Request,res:Response){

    const id=req.params.id

    try {
      
     const response=await guideService.deletePlaces(id)

     if(response?.success){

       res.status(HttpStatus.CREATED).json(response.message)

       return

     }else{

       res.status(HttpStatus.BAD_REQUEST).json(response)

       return

     }



    } catch (error) {

      logger.info('error occured in delete location controller',error)
      
    }

  }

  async guideData(req:CustomeRequest,res:Response){

    console.log('reached in guidedata controller')

    try {

      const email=req.user?._doc?.email; 

      console.log(email,'ememmem')
      
      const response=await guideService.guideData(email)
      
      
      if(response){

        res.status(HttpStatus.CREATED).json(response)

      }else{

        res.status(HttpStatus.BAD_REQUEST).json(error)

      }
     
      
    } catch (error) {


      
    }

  }

  async updateProfile(req:Request,res:Response){

    try {

      console.log('reached in updateprofile controller in guide side')
      
      const {_id,name,email,phone,experience,expertise}=req.body

      const files=req.file

      if (!files) {

        res.status(400).json({ message: "Profile image is required" })

        return

     }
 
     const result=await cloudinary.uploader.upload(files.path,{folder:"Profile"})
  
     const imgUrl=result.secure_url

     const guidedata={_id,name,email,phone,experience,expertise,profileImage:imgUrl}

     const response=await guideService.updateProfile(guidedata)

     if(!response){

     res.status(HttpStatus.BAD_REQUEST).json({message:'something went wrong'})

     return

     }

     res.status(200).json(response)

     return

    } catch (error) {

      logger.info('error in guide profile updating controller',error)
      
    }


  }
        
}

export default new GuideController();
