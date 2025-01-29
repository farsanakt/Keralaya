import { UserService } from "@/services/user/userService"
import { JwtPayload } from "jsonwebtoken";
import { Request,Response } from "express";
import { NextFunction } from "http-proxy-middleware/dist/types";
import { HttpStatus } from "@/enums/HttpStatus";

const userService=new UserService()

export interface CustomeRequest extends Request{
    user?:  JwtPayload
    userId?: string;
}


export const userStatus=async(req:CustomeRequest,res:Response,next:NextFunction)=>{
    
    try {

        console.log('k')

        const userId=req.user as JwtPayload

        console.log(userId,'klpo')

        const id=userId._id

        console.log(id,'kkoopppopppp')

        const userData=await userService.getProfileData(id)

        console.log(userData,'jj')

        if(userData?.isBlocked){

            res.clearCookie('refreshtoken')

            res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"No authentication"})

            return

        }else{

            next()

        }
        
    } catch (error) {
        
        console.log('error in userStaus checking middlewarw',error)

    }

}