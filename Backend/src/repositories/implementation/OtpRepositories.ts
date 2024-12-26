import Otp,{IOtp} from "@/models/userModel/otpModel";


import { BaseRepository } from "./BaseRepository";
export interface IRepository<T> {
    create(item: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
  }

export class OtpRepository extends BaseRepository<IOtp> implements OtpRepository{
   
    constructor(){
        super(Otp)
    }

    async createOtp(otpData: IOtp): Promise<IOtp> {
        const newOtp = new this.model(otpData)
        return await newOtp.save(); 
    }

    async findOtpByEmail(email: string): Promise<IOtp | null> {
        try {
            return await this.model.findOne({ email }); 
        } catch (error) {
            console.error('Error in finding the OTP by email:', error);
            return null; 
        }
    }


    async updateOtpByEmail(email: string, otp: string): Promise<void> {
        await Otp.updateOne({ email }, { otp, createdAt: new Date() })
    }
    
    async saveOtp(email: string, otp: string): Promise<void> {
        const newOtp = new Otp({ email, otp });
        await newOtp.save()
    }

    
    async deleteOtpByEmail(email: string): Promise<void> {
    await Otp.deleteOne({ email })
    }

    async findOneByEmail(email: string): Promise<IOtp | null> {
        return Otp.findOne({ email });
    }


}