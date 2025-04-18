import mongoose ,{Document}from "mongoose";

export interface IGuide extends  Document{
   

    name:string
    email:string,
    phone:string,
    experience:string,
    expertise: string,
    languages: string[],
    isBlocked:Boolean,
    password:string,
    status:string
    profileImage:string
    district:string
    charge:string
    


}

const GuideSchema = new mongoose.Schema<IGuide>({

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phone: { type: String, required: true },

    district: { type: String, required: true },

    experience: { type: String, required: true },

    expertise: { type: String, required: true },

    languages: { type: [String], required: true }, 

    isBlocked: {type:Boolean,default:true},

    password:{type:String,required:true},

    profileImage:{type:String,default:''},

    charge:{type:String,default:'2000'}

    

    
  })
  
  export const Guide = mongoose.model<IGuide>("Guide", GuideSchema);
  