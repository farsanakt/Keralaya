import { Guide } from "../../models/guideModel/guideModel";
import { Request,Response } from "express";
import { AuthService } from "../../services/guide/authService";
import { HttpStatus } from "../../enums/HttpStatus";


const authService=new AuthService()

class AuthController {


    async registration (req:Request,res:Response){

        console.log('i am reached in guide page')

        

        try {
            
           const response= await authService.guideRegistration(req.body)

           console.log(response,'tttttt')


            if(response.success){

                console.log('jjjjj')

                res.status(HttpStatus.CREATED).json({message:response})
                
                
            }    else{
                
                res.status(HttpStatus.BAD_REQUEST).json(response)
                
            }        
        } catch (error) {
            console.log('jhgddnj',error);
            
        }

    }


}

export default AuthController