import { Request,Response } from "express";
import { AdminService } from "../../services/admin/adminService";
import { HttpStatus } from "../../enums/HttpStatus";

const adminService=new AdminService()


class AdminController{


    async getUserList(req:Request,res:Response){

        console.log('Reached Userlist controller')

        try {

            const users=await adminService.getallusers()

            res.status(HttpStatus.CREATED).json(users)

            
        } catch (error) {

            res.status(HttpStatus.BAD_REQUEST).json(error)
            
        }



    }

    async getGuideList(req:Request,res:Response){

        console.log('Reached GuideList controller')

        try {

            const guides=await adminService.getallguide()

            res.status(HttpStatus.CREATED).json(guides)

            
        } catch (error) {

            res.status(HttpStatus.BAD_REQUEST).json(error)

            
        }

    }

    async updateUserStatus(req:Request,Res:Response){

        console.log('entered to updating user status controller')
 
        try {

            const response=await adminService.userBlockStatus(req.params.id)
            
        } catch (error) {

            console.log(error)
            
        }

    }

    async updateGuideStatus(req:Request,res:Response){

        console.log('reached in update guidestatus controller')

        try {

            const response=await adminService.guideBlockStatus(req.params.id)

            
            
        } catch (error) {

            console.log(error)
            
        }

    }


}


export default AdminController