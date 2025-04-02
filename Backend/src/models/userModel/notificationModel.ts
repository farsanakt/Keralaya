import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  senderId: string;  
  receiverId: string;  
  message: string;  
  isRead: boolean;  
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<INotification>("Notification", NotificationSchema);
