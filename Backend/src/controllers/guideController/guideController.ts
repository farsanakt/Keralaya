import { Response,Request } from "express";
import cloudinary from "@/config/cloudinary";
import Location from "@/models/guideModel/placeModel";
import MulterRequest from "@/dto/type"; 
import Places from "@/models/guideModel/placeModel"
import { GuideService } from "@/services/guide/guideService";
import { HttpStatus } from "@/enums/HttpStatus";
import logger from "@/utils/logger.utils";
import { error } from "console";

const guideService=new GuideService()

interface LocationRequestBody {
  id:string;
  name: string;
  district: string;
  street: string;
  pincode: string;
}

class GuideController {

  async addLocations(req: MulterRequest, res: Response) {
    try {

      const { name, district, street, pincode }: LocationRequestBody = req.body

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

      const {id, name, district, street, pincode }: LocationRequestBody = req.body

        const files = req.files as Express.Multer.File[]
               

        const locationData={

         id,name,district,street,pincode,files

         }

         const response=await guideService.editPlaces(locationData)
                
                
       } catch (error) {

        console.error("Error adding location:", error);
                
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

  async guideData(req:Request,res:Response){

    console.log('reached in guidedata controller')

    try {

      const {email}=req.params

      const response=await guideService.guideData(email)

      if(response){

        res.status(HttpStatus.CREATED).json(response)

      }else{

        res.status(HttpStatus.BAD_REQUEST).json(error)

      }
     
      
    } catch (error) {


      
    }

  }
        
}

export default new GuideController();
