import User, { IUser } from "@/models/userModel/userModel";
import { UpdateProfileDto } from "@/dto/userDto";



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

}