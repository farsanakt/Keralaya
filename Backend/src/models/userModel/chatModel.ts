import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
  senderId: string;
  receiverId: string;
  message: string;
  role:string
  chatRoomId: string;
  timestamp: Date;
  bookingId:string
}

const ChatSchema = new Schema<IChat>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    role: { type: String, required: true },
    chatRoomId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    bookingId:{type:String,required:true}
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema)
