import User from "../../models/userModel/userModel";
import { Request,Response } from "express";
import { AuthService } from "../../services/user/authService";
import { HttpStatus } from "../../enums/HttpStatus";


const authService=new AuthService()

class AuthController{

async singUp(req:Request,res:Response ) {

    console.log('jjjjjj')

    try {

         console.log(req.body)

         const {username,email,password,confirmPassword}=req.body

         console.log('cxssssss');
        
         const response=await authService.userSignup(username,email,password,confirmPassword)

        if(!response.success){

            res.status(HttpStatus.BAD_REQUEST).json(response)

        }else{
            console.log('hhiiiiiiii')
            
            res.status(HttpStatus.CREATED).json({success:true,message:"user Registered successfully"})
        }
        

    } catch (error) {

            console.log('error in signup controller of user side',error)

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})

        }
}



}

export default AuthController