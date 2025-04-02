
import { GuideRepositories } from "@/repositories/implementation/guideRepositories";
import logger from "@/utils/logger.utils";


export class GuideService{

     private guideRepository: GuideRepositories;

      constructor() {
    
        this.guideRepository = new GuideRepositories()

      }


      getAllPlaces=async()=>{

       try {

        const places=await this.guideRepository.getallLocations()

        return places
        
       } catch (error) {

        logger.info('error occur in fetching all locations',error)
        
       }

      }


      editPlaces = async (locationData: any) => {

        try {

          const { id, name, district, street, pincode, images } = locationData;
          
          const place = await this.guideRepository.findLocationById(id);
          
          if (!place) {

            return null

          }
          
         
          place.name = name || place.name;
          place.district = district || place.district;
          place.street = street || place.street;
          place.pincode = pincode || place.pincode;
          
          
          if (images && images.length > 0) {

            place.images = images

          }
          
          const updatedPlace = await this.guideRepository.saveLocation(place)

          return updatedPlace
      
        } catch (error) {

          console.error('Error updating location:', error)

          throw error
          
        }
      };


      deletePlaces=async(id:string)=>{

        try {

          const deletedPlace=await this.guideRepository.deletePlaceById(id)

          if(!deletedPlace){

            return {success:false,message:'Something went wrong'}

          }

          return {success:true,message:'location deleted successfully'}
          
        } catch (error) {

          console.log(error,'error occured in deletelocation service')
          
        }

      }

      guideData=async(email:string)=>{

        try {

          const guidedetails=await this.guideRepository.findUserByEmail(email)

          return guidedetails
         
        } catch (error) {

          console.log('error occured in guide repo',error)
          
        }

      }

      updateProfile=async(guidedata:any)=>{

        console.log('rechecd in progile')

        try {

          const {_id,name,email,phone,experience,expertise,profileImage,district}=guidedata

          const updateProfileData=await this.guideRepository.updateProfile(_id,guidedata)

          return updateProfileData

        } catch (error) {

          logger.info('error in guideprofile updation')
          
        }

      }


      userBookingDetails=async(email:string)=>{

        try {

          const guide=await this.guideRepository.findUserByEmail(email)

          if(guide){

            const guideId = guide._id ? guide._id.toString() : "";
           


            const userBookings=await this.guideRepository.findBookingsById(guideId)

            return userBookings

          }

          return {message:'there is no upcoming bookings'}


          
        } catch (error) {

          console.log('error occur in guideservice of fetchignuserbooking details')
          
        }

      }

      completedTravel=async(id:string)=>{

        try {

          const updating=await this.guideRepository.updateStatus(id)

          return updating

          
        } catch (error) {

          console.log('error occur in guiderepo')
          
        }

      }

      getGuideReviews=async(email:string)=>{

        try {

          const guide=await this.guideRepository.findUserByEmail(email)

          const guideId= String(guide?._id) 
        
          const reviews=await this.guideRepository.getReviewsById(guideId)

          return reviews
          
        } catch (error) {

          logger.info('error occur in getting guide reviews')
          
        }

      }
    

      
}