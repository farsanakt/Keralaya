import { Request,Response } from "express";
import { PaymentService } from "@/services/user/paymentService";
import { HttpStatus } from "@/enums/HttpStatus";
import logger from "@/utils/logger.utils";

const paymentService=new PaymentService()


class PaymentController{

    async createPaymentIntent(req:Request,res:Response){

        try {
        
           const { slotId, guideId, userEmail, amount } = req.body;
        
           
           const result = await paymentService.createPaymentIntent(slotId, guideId, userEmail, amount);
        
           if(result){

              res.status(HttpStatus.CREATED).json(result)

           }
           
        } catch (error) {
        
           console.log('errror in createpayment')
        
           
        }
        
         }
        
     async paymentConfirmation(req:Request,res:Response){
        
           try {
              const { slotId, guideId, userEmail, amount, userSecret, paymentIntentid ,locationId} = req.body;
        
              const response=await paymentService.paymentConfirmation(slotId,guideId,userEmail,amount,paymentIntentid,userSecret,locationId)
        
           } catch (error) {

            logger.info('something went wrong')
              
           }
        
         }

}

export default PaymentController