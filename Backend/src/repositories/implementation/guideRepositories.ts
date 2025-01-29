import { Guide ,IGuide} from "@/models/guideModel/guideModel";
import { IGuideRepository } from "@/repositories/interface/IGuideRepositories";
import {ILocation} from "@/models/guideModel/placeModel"
import Location from "@/models/guideModel/placeModel";


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
                return null;
              }
              return { message: 'Location deleted successfully' };
            } catch (error) {
              console.error('Error while deleting location:', error);
              throw new Error('Failed to delete location');
            }
          }
          

          

        


}