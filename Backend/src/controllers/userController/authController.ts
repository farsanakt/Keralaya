
import { Request, Response } from "express";
import { AuthService } from "@/services/user/authService";
import { HttpStatus } from "@/enums/HttpStatus";
import logger from "@/utils/logger.utils";



const authService = new AuthService()

class AuthController {

  async singUp(req: Request, res: Response) {

    try {

      const { username, email, password, confirmPassword } = req.body;

      const response = await authService.userSignup(
        username,
        email,
        password,
        confirmPassword
      );

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        res.status(HttpStatus.CREATED) .json({ success: true, message: "user Registered successfully" });
         
      }

    } catch (error) {

       logger.error(error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        
    }

  }

  async verifyOtp(req: Request, res: Response) {

    try {

      const data = req.body;

      const response = await authService.verifyUserOtp(data);

      if (typeof response === "string") {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });
          
        return

      } else if (response?.success) {

        res.status(HttpStatus.CREATED).json({ message: response });

        return

      }else{

          res.status(HttpStatus.BAD_REQUEST) .json(response);
    
          return

      }


    } catch (error: any) {

      logger.info("error in otpverify of authcontroller");

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "otp verification failed" });

      return;

    }

  }

  async resendOtp(req:Request,res:Response){

    const data=req.body

  try {
    
    const response =await authService.resendOtp(data)

    if (typeof response === 'string') {

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });

      return
   }

   if (response?.success) {

      res.status(HttpStatus.CREATED).json({message:response})

      return
   }

  } catch (error) {
    
    logger.error(error)

  }

  }

  async login(req:Request,res:Response){

    const userData=req.body
    
    try {
      
      const response =await authService.userLogin(userData)

    if(response.success){

      res.status(HttpStatus.CREATED).cookie('refreshToken',response.refreshToken,{httpOnly:true,secure:true,sameSite:'none',maxAge:7*24*60*1000}).json({ message: response,accessToken:response.accessToken });
      console.log('res[',response)

    }else{

      res.status(HttpStatus.BAD_REQUEST).json(response)

    }
      
    } catch (error) {

     logger.info('errror occur in guied login controller')
  
    }
      
  }
  
  async forgetPass(req:Request,res:Response){

    const data=req.body

    try {

      const response=await authService.forgetPass(data)

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        res.status(HttpStatus.CREATED) .json({response});
         
      }


      
    } catch (error) {

      logger.error(error)
      
    }

  }

  async resetPass(req:Request,res:Response){

    try {

      logger.info('reached in reset password controller')

      const response=await authService.resetPass(req.body)

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        res.status(HttpStatus.CREATED) .json({response});
         
      }
      
    } catch (error) {

      logger.error(error)
      
    }

  }

  async logout(req:Request,res:Response){

    try {

    res.clearCookie('refreshToken')

     res.json({message:'logouted successfully'})

     return
      
    } catch (error) {

    logger.error(error)
      
    }

  }

  async setNewToken(req:Request,res:Response){
      
        console.log('hiiiiiop')
    const token=req.cookies?.refreshToken;
    console.log(req.cookies,'goooo')
   
    if(!token){
        res.status(HttpStatus.FORBIDDEN).json({message:'Internal Server Error'})
    }
    try {
      
      const response=await authService.checkToken({token})
      

      if(response?.success){
        res.json({accessToken:response.accessToken})
        return
      }else{
        res.clearCookie('refrToken')
        res.status(HttpStatus.FORBIDDEN).json({message:response?.message})
      }
      

    } catch (error) {
        console.log('error in the setnew token',error);
        
    }
}

}

export default AuthController;
