import { HttpStatus } from "@/enums/HttpStatus"
import { SlotService } from "@/services/guide/slotService"
import logger from "@/utils/logger.utils"
import { Request,Response } from "express"


const slotService=new SlotService()
class SlotController{

   
  async availableSLots(req:Request,res:Response){
    
    try {

     const dates=req.body.dates
     const email=req.body.email

     console.log(dates,email)

     if(!dates || !email){

      res.status(HttpStatus.BAD_REQUEST).json({success:false,message:'Invalid request.dates and email are required'})

     }

     const response=await slotService.setSlotAvailability(email,dates)

     console.log(response,'res')
      
    } catch (error) {
      
    }

  }

  async availableGuideSlot(req:Request,res:Response){

    try {


        const {id}=req.params

       const response=await slotService.guideSlot(id)

       console.log(response,'fdfdffd')

       if(!response){

        res.status(HttpStatus.BAD_REQUEST).json({message:"no slot available"})

       }
       
       res.status(HttpStatus.CREATED).json(response)

    } catch (error) {

        logger.info('errror occur in availableGuideSlot in slotController')
        
    }

  }


}

export default new SlotController()