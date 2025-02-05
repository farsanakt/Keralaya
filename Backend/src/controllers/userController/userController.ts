import { Request,Response } from "express";
import { UserService } from "@/services/user/userService";
import { HttpStatus } from "@/enums/HttpStatus";
import logger from "@/utils/logger.utils";

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

         const response=await userService.updateProfile(updateddata)

         res.status(HttpStatus.CREATED).json({message:'profile updated successfully..!'})
         
         
      } catch (error) {

         res.status(HttpStatus.BAD_REQUEST).json({message:'something went wrong'})
         
      }

    }

   //  async searchLocation(req:Request,res:Response){

   //    console.log('reached jop')

   //    const query = req.query.query;  

   //    console.log(query)

   //    if (typeof query !== 'string') {

   //       return res.status(400).json({ error: 'Invalid or missing query parameter' });
   //     }
     
   //    const response=await userService.searchLocation(query)

   //    res.status(HttpStatus.CREATED).json(response)

   //    return response

   //  }

   //  async singleLocation(req:Request,res:Response){

   //    const placeid=req.query.placeid

   //    console.log(placeid,'hj')

   //  }


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

}

export default UserController