import mongoose, { Schema } from "mongoose";


export interface IBooking extends Document{

    userEmail: string;
    guideId: string;
    amount: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: string;
    locname:string;
    bookeddate:string


}

const BookingSchema:Schema=new Schema(

    {
        userEmail:{type:String,required:true},
        guideId:{type:String,required:true},
        amount:{type:String,required:true},
        status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
        paymentStatus:{type:String,required:true},
        locname:{type:String,required:true},
        bookeddate:{type:String,required:true}
    }

)

export default mongoose.model<IBooking>('Booking',BookingSchema)