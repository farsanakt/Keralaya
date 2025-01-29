import { BaseRepository } from "@/repositories/implementation/BaseRepository";
import { GuideRepositories } from "@/repositories/implementation/guideRepositories";


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

        console.log('locations not found')
        
       }

      }

      editPlaces = async (locationData: any) => {

        console.log('Reached here', locationData);
      
        const { id, name, district, street, pincode, files } = locationData;
      
        try {
          
          const place = await this.guideRepository.findLocationById(id);
      
          if (!place) {

            return 

          }
      
          
          place.name = name || place.name;
          place.district = district || place.district;
          place.street = street || place.street;
          place.pincode = pincode || place.pincode;
      
          
          if (files && files.length > 0) {

            
            const newImagePath = files[0].path; 

            place.images = newImagePath

          } else {

            
            place.images = place.images;

          }
      
          
          const updatedPlace = await this.guideRepository.saveLocation(place)
      
          console.log('Location updated successfully:', updatedPlace)

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
      
}