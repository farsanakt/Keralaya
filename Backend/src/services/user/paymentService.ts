import { PaymentRepositories } from "@/repositories/implementation/paymentRepositories";
import { SlotRepositories } from "@/repositories/implementation/SlotRepositories"
import { UserRepositories } from "@/repositories/implementation/UserRepositories";
import Stripe from "stripe"
const STRIPEKEY = process.env.STRIPE_KEY

const stripe = new Stripe(STRIPEKEY as string, {
  apiVersion: "2025-02-24.acacia", 
});

export class PaymentService{

private paymentRepositories:PaymentRepositories
private slotRepositories:SlotRepositories
private userRepositories:UserRepositories


constructor(){

    this.paymentRepositories=new PaymentRepositories()
    this.slotRepositories=new SlotRepositories()
    this.userRepositories=new UserRepositories()
    

}

createPaymentIntent = async(slotId:string,guideId:string,userEmail:string,amount:string)=>{

    const paymentIntent = await stripe.paymentIntents.create({

      amount: Number(amount) * 100,
      currency: 'usd',
      payment_method_types: ["card"],
      
  }); 

  const client_secret=paymentIntent.client_secret
  const paymentIntentid=paymentIntent.id

  return {client_secret,paymentIntentid}


  }

  paymentConfirmation = async (
    slotId: string,
    guideId: string,
    userEmail: string,
    amount: string,
    stripePaymentIntentId: string,
    stripeClientSecret: string,
    locationId:string
  ) => {

    try {
      
      const guideSlot = await this.slotRepositories.findSlot(guideId);
  
      if (!guideSlot) {
        throw new Error("Slot not found");
      }
  
      const updatedSlot = await this.slotRepositories.updateSlotStatus(guideId, slotId);

      const bookedLocation=await this.userRepositories.findLocationById(locationId)
  
      if (!updatedSlot) {
        throw new Error("Failed to update slot");
      }

      const selectedSlot = guideSlot.availableDates.find(
        (dateSlot: any) => dateSlot._id.toString() === slotId
      );
  
      if (!selectedSlot) {
        throw new Error("Selected slot not found");
      }
  
      
      const newPayment = await this.paymentRepositories
      .createPayment({
        slotId,
        guideId,
        userEmail,
        amount: parseFloat(amount),
        stripePaymentIntentId,
        stripeClientSecret
      });

      console.log(selectedSlot,'sele')

      if(newPayment){
        
        await this.paymentRepositories.createBooking({

        guideId,
        userEmail,
        amount: parseFloat(amount),
        status:'pending',
        paymentStatus:'completed',
        locname:bookedLocation?.street,
        bookeddate:selectedSlot.date
        

      })
    }
  
      return {
        success: true,
        message: "Payment confirmed & slot updated",
        updatedSlot,
        newPayment
      };
    } catch (error) {
      console.error("Payment confirmation failed:", error);
      throw new Error("Payment confirmation failed");
    }
  };


}