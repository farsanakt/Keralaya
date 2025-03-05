import User, { IUser } from "@/models/userModel/userModel";
import { UpdateProfileDto } from "@/dto/userDto";
import { ILocation} from "@/models/guideModel/placeModel";
import Location from "@/models/guideModel/placeModel"
import { Guide, IGuide } from "@/models/guideModel/guideModel";



export class UserRepositories {

    async createUser(data:any):Promise <IUser | null>{
        return await User.create(data)
    }

    async findUserByEmail(email:String) :Promise <IUser | null>{

        const data = await User.findOne({email})
        const userdata = data?.toObject()

        console.log(userdata);
        
     
          return userdata as IUser
    }

    async findUserById(id:string) : Promise <IUser | null >{
        return await User.findById(id)
    }

    async verifyUser(email: string, isVerified: boolean): Promise<IUser | null> {
       
        await User.updateOne({ email }, { isVerified });
        return await User.findOne({ email });
    }

    async UpdatePassword(email:string,field:string,value:any) :Promise<IUser | null>{
        const update={$set:{[field]:value}}
        return await User.findOneAndUpdate({email},update,{new:true})
    }

      async updateProfile(userId:string,updateProfileDto:UpdateProfileDto) : Promise<IUser | null>{

        return await User.findByIdAndUpdate(
            userId,
            {$set:updateProfileDto},
            {new:true}
            
        )
    }

    async getLocations(district: string): Promise<ILocation[] | null> {

        try {

          const places = await Location.find({ district: { $regex: new RegExp(district, "i") } })

          return places

        } catch (error) {

          console.error("Error fetching locations:", error)

          return null;

        }
      }

      async findLocationById(id:string) : Promise <ILocation | null >{
        return await Location.findById(id)
    }


    
    async getGuide(district: string): Promise<IGuide[] | null> {

      try {

        const places = await Guide.find({ district: { $regex: new RegExp(district, "i") } })

        return places

      } catch (error) {

        console.error("Error fetching locations:", error)

        return null;

      }
    }

    async allGuide():Promise<IGuide[] |null >{

      return Guide.find()

    }

    async singleguide(id:string):Promise<IGuide[]|null>{

      try {
        const guide=await Guide.find({_id:id})
        
        if(guide){

          return guide
        }

        return null
        
      } catch (error) {

        console.error("Error fetching guide:", error);

        return null;
        
      }

    }
      

}