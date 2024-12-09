import Admin from "../../models/adminModel/adminModel";
import { Request,Response } from "express";
import { AuthService } from "../../services/admin/authService";
import { HttpStatus } from "../../enums/HttpStatus";

const authService=new AuthService()


class AuthController {

     async login(req:Request,res:Response){

        console.log('ivde ethiiii')

        const adminData=req.body

        console.log(adminData)
      
        try {

            const response=await authService.adminLogin(adminData)

            console.log(response,'resss')

            if(response.success){

                res.status(HttpStatus.CREATED).json({message:response})

            }else{

                res.status(HttpStatus.BAD_REQUEST).json(response)

            }
            
        } catch (error) {

            console.log(error)
            
        }


     }

}


export default AuthController