import { Request,Response } from "express";
import { AdminService } from "../../services/admin/adminService";
import { HttpStatus } from "../../enums/HttpStatus";
import logger from "../../utils/logger.utils";

const adminService=new AdminService()


class AdminController{


    async getUserList(req:Request,res:Response){

        logger.info('Reached Userlist controller')

        try {

            const users=await adminService.getallusers()

            res.status(HttpStatus.CREATED).json(users)

            
        } catch (error) {

            res.status(HttpStatus.BAD_REQUEST).json(error)
            
        }



    }

    async getGuideList(req:Request,res:Response){

        logger.info('Reached GuideList controller')

        try {

            const guides=await adminService.getallguide()

            res.status(HttpStatus.CREATED).json(guides)

            
        } catch (error) {

            res.status(HttpStatus.BAD_REQUEST).json(error)

            
        }

    }

    async updateUserStatus(req:Request,Res:Response){

        logger.info('entered to updating user status controller')
 
        try {

            const response=await adminService.userBlockStatus(req.params.id)
            
        } catch (error) {

            logger.info(error)
            
        }

    }

    async updateGuideStatus(req:Request,res:Response){

        logger.info('reached in update guidestatus controller')

        try {

            const response=await adminService.guideBlockStatus(req.params.id)

            
            
        } catch (error) {

            logger.error(error)
            
        }

    }


}


export default AdminController