import User from "../../models/userModel/userModel";
import { Request, Response } from "express";
import { AuthService } from "../../services/user/authService";
import { HttpStatus } from "../../enums/HttpStatus";



const authService = new AuthService();

class AuthController {

  async singUp(req: Request, res: Response) {

    console.log("jjjjjj");

    try {

      console.log(req.body);

      const { username, email, password, confirmPassword } = req.body;

      console.log("cxssssss");

      const response = await authService.userSignup(
        username,
        email,
        password,
        confirmPassword
      );

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        console.log("hhiiiiiiii")

        res.status(HttpStatus.CREATED) .json({ success: true, message: "user Registered successfully" });
         
      }

    } catch (error) {

      console.log("error in signup controller of user side", error);

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

      console.log("error in otpverify of authcontroller");

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "otp verification failed" });

      return;

    }

  }



  async resendOtp(req:Request,res:Response){

    const data=req.body

    console.log(data,'l')

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
    
    console.log('error in otp controller ',error)

  }

  }

  async login(req:Request,res:Response){

    const userData=req.body
    
    try {
      console.log(userData,'kkkkkkkkkkkkkkkkkkkkkkkk')
      
      const response =await authService.userLogin(userData)

      console.log(response)

    if(response.success){

      res.status(HttpStatus.CREATED).json({ message: response });

    }else{

      res.status(HttpStatus.BAD_REQUEST).json(response)

    }
      
    } catch (error) {
  
    }
      
  }
  

  async forgetPass(req:Request,res:Response){

    const data=req.body

    try {

      const response=await authService.forgetPass(data)

      console.log(response,'k')

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        console.log("hhiiiiiiii")

        res.status(HttpStatus.CREATED) .json({response});
         
      }


      
    } catch (error) {

      console.log('error occur in forget pass',error)
      
    }

  }

  async resetPass(req:Request,res:Response){

    try {

      console.log('reached in reset password controller')

      const response=await authService.resetPass(req.body)

      if (!response.success) {

        res.status(HttpStatus.BAD_REQUEST).json(response);

      } else {

        console.log("hhiiiiiiii")

        res.status(HttpStatus.CREATED) .json({response});
         
      }
      
    } catch (error) {
      
    }

  }

}

export default AuthController;
