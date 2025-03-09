import Payment from "@/models/userModel/paymentModel";
import Booking from "@/models/userModel/BookingModel";


export class PaymentRepositories{

    createPayment = async (paymentData: any) => {
          const newPayment = new Payment(paymentData);
          return await newPayment.save();
        };


    createBooking=async(bookingData:any)=>{
        const newBooking=new Booking(bookingData)
        return await newBooking.save()
    }

}