import { Guide ,IGuide} from "@/models/guideModel/guideModel";
import { IGuideRepository } from "@/repositories/interface/IGuideRepositories";
import {ILocation} from "@/models/guideModel/placeModel"
import Location from "@/models/guideModel/placeModel";
import GuideAvalilability from '@/models/guideModel/slotModel'
import { IGuideAvailability } from "@/models/guideModel/slotModel"; 
import BookingModel, { IBooking } from "@/models/userModel/BookingModel";
import userModel from "@/models/userModel/userModel";
import reviewModel, { IReview } from "@/models/userModel/reviewModel";


export class GuideRepositories implements IGuideRepository {
        
        async createUser(data:any):Promise <IGuide | null>{
                        
            return await Guide.create(data)
        }     
       
        async findUserById(guideId:string) : Promise<IGuide | null>{
        return await Guide.findById(guideId)
        }

        async findUserByEmail (email:string) : Promise<IGuide | null> {
            return await Guide.findOne({email})

        }

        async getallLocations():Promise<ILocation[] | null>{

            const places= await Location.find()

            return places
        }

        async findLocationById(id:string):Promise<ILocation|null>{

            const places=await Location.findById(id)

            return places


        }

        async saveLocation(location: ILocation): Promise<ILocation | null> {
            try {
              const updatedLocation = await location.save()
              return updatedLocation;
            } catch (error) {
             
              throw error;
            }
          }

        async deletePlaceById(id: string): Promise<{ message: string } | null> {

            try {

              const deletedLoc = await Location.findByIdAndDelete(id);

              if (!deletedLoc) {

                return null
              }

              return { message: 'Location deleted successfully' }

            } catch (error) {

              console.error('Error while deleting location:', error)

              throw new Error('Failed to delete location')

            }

          }

        async updateProfile(guideId: string, guideData: IGuide): Promise<{ message: string } | null> {

          console.log(guideData,'data')

            try {
             
              const updatedProfile = await Guide.findByIdAndUpdate(
                guideId, 
                { $set: guideData },
                { new: true }
              )
          
              if (!updatedProfile) {
                return null;
              }
          
              return { message: "Profile updated successfully" }

            } catch (error) {

              console.error("Error updating profile:", error)

              throw new Error("Profile update failed")

            }

          }

          async findGuideByEmail (email:string) : Promise<IGuideAvailability | null> {
            const guide=await Guide.findOne({email})
            if(guide){

              
              const guideSlot=await GuideAvalilability.findOne({guideId:guide._id})
              return guideSlot
            }
            return null

        }


        async findBookingsById(id:string):Promise<IBooking[] |null>{

          return await BookingModel.find({guideId:id})
          
        }

        async updateStatus(id:string):Promise<IBooking|null>{

          const existing=await BookingModel.findById(id)

          if(existing){

            existing.status='completed'

            await existing.save()

          }
          return existing


        }


        async getReviewsById(id:string):Promise<IReview|null>{

           return reviewModel.findOne({guideId:id})
        }

        


       
        
          
          

          

        


}