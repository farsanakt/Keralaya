
import { Request,Response } from "express";
import { AuthService } from "@/services/guide/authService";
import { HttpStatus } from "@/enums/HttpStatus";
import logger from "@/utils/logger.utils";

const authService=new AuthService()

class AuthController {


    async registration (req:Request,res:Response){

        try {
            
           const response= await authService.guideRegistration(req.body)


            if(response.success){

                res.status(HttpStatus.CREATED).json({message:response})
                
                
            }    else{
                
                res.status(HttpStatus.BAD_REQUEST).json(response)
                
            }    

        } catch (error) {

            logger.info('error occur in guide registration controller',error);
            
        }

    }

    async login(req:Request,res:Response){

        const guideData=req.body

        try {
            
         const response=await authService.guideLogin(guideData)

         if(response.success){

            res.status(HttpStatus.CREATED).cookie('refreshToken',response.refreshToken,{httpOnly:true,secure:true,sameSite:'none',maxAge:7*24*60*1000}).json({ message: response,accessToken:response.accessToken });
            
            
        }    else{
            
            res.status(HttpStatus.BAD_REQUEST).json(response)
            
        }  
           
        } catch (error) {
            
            logger.info('error occur in guide login controller',error)
            
        }

    }


}

export default AuthController