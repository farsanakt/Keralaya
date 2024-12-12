import { Request,Response } from "express";
import { UserService } from "../../services/user/userService";
import { HttpStatus } from "../../enums/HttpStatus";

const userService=new UserService()



class UserController{

    async userProfile(req:Request,res:Response){

     try {

        const response=await userService.userProfile(req.params.email)

        res.status(HttpStatus.CREATED).json(response)

        console.log(req.params.email)
        
     } catch (error) {

        res.status(HttpStatus.BAD_REQUEST).json(error)
        
     }

    }

}

export default UserController