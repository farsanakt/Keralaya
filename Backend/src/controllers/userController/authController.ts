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

  async login(req:Request,res:Response){

    const userData=req.body

    
    
    try {
      console.log(userData,'kkkkkkkkkkkkkkkkkkkkkkkk')
      
      console.log('kkkkkoppppppppppppppp')

      
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
  
}

export default AuthController;
