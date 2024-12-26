import { Request,Response } from "express";
import { UserService } from "../../services/user/userService";
import { HttpStatus } from "../../enums/HttpStatus";
import logger from "../../utils/logger.utils";

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

}

export default UserController