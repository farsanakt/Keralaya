
import { Request,Response } from "express";
import { AuthService } from "../../services/admin/authService";
import { HttpStatus } from "../../enums/HttpStatus";
import logger from "../../utils/logger.utils";

const authService=new AuthService()


class AuthController {

     async login(req:Request,res:Response){

        logger.info('reached in admin authController')

        const adminData=req.body

        logger.info(adminData)
      
        try {

            const response=await authService.adminLogin(adminData)


            if(response.success){

                res.status(HttpStatus.CREATED).json({message:response})

            }else{

                res.status(HttpStatus.BAD_REQUEST).json(response)

            }
            
        } catch (error) {

            logger.error(error)
            
        }


     }

}


export default AuthController