import { Request,Response } from "express";
import { UserService } from "@/services/user/userService";
import { HttpStatus } from "@/enums/HttpStatus";
import logger from "@/utils/logger.utils";
import Stripe from "stripe";
const STRIPEKEY = process.env.STRIPE_SECRET_KEY

const userService=new UserService()


 
class UserController{

    async userProfile(req:Request,res:Response){

     try {

        const response=await userService.userProfile(req.params.email)

        res.status(HttpStatus.CREATED).json(response)
        
     } catch (error) {

        res.status(HttpStatus.BAD_REQUEST).json(error)
        
     }

    }

    async updateProfile(req:Request,res:Response){

      try {

         logger.info('reached updateprofile Controller')

         const {updateddata}=req.body

         console.log('uu',updateddata)

         const response=await userService.updateProfile(updateddata)

         res.status(HttpStatus.CREATED).json({message:'profile updated successfully..!'})
         
         
      } catch (error) {

         res.status(HttpStatus.BAD_REQUEST).json({message:'something went wrong'})
         
      }

    }

   async getLocations(req:Request,res:Response){

      console.log('reached in getlocations')

      try {

         const input=req.query.input as string
        
         const response=await userService.getLocations(input)

         if(response){

            res.status(HttpStatus.CREATED).json(response)

         }
         
      } catch (error) {

         res.status(HttpStatus.BAD_REQUEST).json('location not fou')
         
      }

   }

   async locationDetails(req:Request,res:Response){
  
      try {

         const id=req.query.id as string

         const response=await userService.locationDetails(id)

         if(response){

            res.status(HttpStatus.CREATED).json(response)

         }

      } catch (error) {

         res.status(HttpStatus.BAD_REQUEST).json('location not found')
         
      }

   }

   async guideDetails(req:Request,res:Response){
      
      try {
         const dis=req.query.district as string
         
         const response=await userService.getGuideDetails(dis)

         if(response){

            res.status(HttpStatus.CREATED).json(response)

         }
         
      } catch (error) {

         res.status(HttpStatus.BAD_REQUEST).json('guide not found')
         
      }

   }

   
  async allGuideList(req:Request,res:Response){

   try {

     const response=await userService.allGuide()

     if(response){

       res.status(HttpStatus.CREATED).json(response)

       return

     }
     
   } catch (error) {

     res.status(HttpStatus.BAD_REQUEST).json({message:"something went wrong"})

     return
     
   }

 }

 async singleGuide(req:Request,res:Response){

    try {

      const {id}=req.params

      const response=await userService.singleGuidee(id)

      if(response){

         res.status(HttpStatus.CREATED).json(response)

      }
      
   } catch (error) {
      
      res.status(HttpStatus.BAD_REQUEST).json({message:"something went wrong"})

   }
   

 }


 async bookingDetails(req:Request,res:Response){

   try {

      const {email}=req.params

      const response=await userService.bookingDetails(email)

      if(response){

         res.status(HttpStatus.CREATED).json(response)

      }
      
      
   } catch (error) {

      res.status(HttpStatus.BAD_REQUEST).json({message:'something went wrong'})
      
   }

 }

 async postReview(req:Request,res:Response){

   try {

      const reviewData=req.body

      const response=await userService.reviewPosting(reviewData)

      if (!response.success) {
          res.status(400).json(response);
          return
       }
   
       res.status(201).json(response);
      
   } catch (error) {
      res.status(500).json({ message: "Server error" });
   }

 }

 async guideReviews(req:Request,res:Response){

   const {id}=req.params

   try {

      const response=await userService.fetchingGuideReview(id)
     
      if(response){

         res.status(HttpStatus.CREATED).json(response)

      }
      
   } catch (error) {

      res.status(HttpStatus.BAD_REQUEST).json({message:'something went wrong'})
      
   }
  

 }

}

export default UserController