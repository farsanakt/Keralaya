import mongoose, { Schema, Document } from "mongoose";

 export interface ILocation extends Document {
  name: string;
  district: string;
  street: string;
  pincode: string;
  discription:string;
  images: string[]; 
}

const locationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  district: { type: String, required: true },
  street: { type: String, required: true },
  pincode: { type: String, required: true },
  discription: { type: String, required: true },
  images: { type: [String], required: true },
});

export default mongoose.model<ILocation>("Location", locationSchema);
