
import axios from "axios"
import { IUser } from "../../models/userModel/userModel"
import { UserRepositories } from "../../repositories/implementation/UserRepositories"
import { SlotRepositories } from "@/repositories/implementation/SlotRepositories"
import Stripe from "stripe"
const STRIPEKEY = process.env.STRIPE_KEY

const stripe = new Stripe(STRIPEKEY as string, {
  apiVersion: "2025-02-24.acacia", // Use the correct version from TypeScript error
});


export class UserService{

    private userRepositories: UserRepositories

    private slotRepositories:SlotRepositories


    constructor(){

        this.userRepositories=new UserRepositories()
        this.slotRepositories=new SlotRepositories()
    }

    

    async  userProfile(email:string):Promise<IUser | null>{

        const user=await this.userRepositories.findUserByEmail(email)

        return  user

    }

    async updateProfile(updateddata:{username:string,email:string,id:string}){

        const {username,email,id}=updateddata

        return await this.userRepositories.updateProfile(id,updateddata)

        
    }

    async getProfileData(userId:string){
        return await this.userRepositories.findUserById(userId)
    }

  
    async getLocations(input:string){

      try {

        const location= await this.userRepositories.getLocations(input)

        return location
        
      } catch (error) {

        console.log('error occured in getlocation service')
        
      }

    }

    async locationDetails(id:string){

      try {

        const  details=await this.userRepositories.findLocationById(id)

        return details
        
      } catch (error) {
        
        console.log('error occured in locationdetals service')

      }

    }

    async getGuideDetails(dis:string){

     try {

      const details=await this.userRepositories.getGuide(dis)

      return details
      
     } catch (error) {
      

      console.log('error occur in gettig guide details')

     }

    }


    
    allGuide=async()=>{

      try {

        const allGuides=await this.userRepositories.allGuide()

        return allGuides
        
      } catch (error) {
        
      }

    }

    singleGuidee=async(id:string)=>{

      try {

        const singleGuide=await this.userRepositories.singleguide(id)

        return singleGuide
        
      } catch (error) {

        console.log('error in single guide serive in user side')
        
      }
    }
  
    bookingDetails = async (email: string) => {
      try {
        const bkDetails = await this.userRepositories.findBookingDetails(email);
    
        if (bkDetails && bkDetails.length > 0) {
         
          const guideDetails = await Promise.all(
            bkDetails.map((booking) => this.userRepositories.singleguide(booking.guideId))
          );
    
          return { guideDetails, bkDetails };
        }
    
        return null;
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    
    
    


    

}