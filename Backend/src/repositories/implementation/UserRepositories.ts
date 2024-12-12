import User, { IUser } from "../../models/userModel/userModel";



export class UserRepositories {

    async createUser(data:any):Promise <IUser | null>{
        return await User.create(data)
    }

    async findUserByEmail(email:String) :Promise <IUser | null>{
          return await User.findOne({email})
    }

    async verifyUser(email: string, isVerified: boolean): Promise<IUser | null> {
       
        await User.updateOne({ email }, { isVerified });
        return await User.findOne({ email });
    }

    async UpdatePassword(email:string,field:string,value:any) :Promise<IUser | null>{
        const update={$set:{[field]:value}}
        return await User.findOneAndUpdate({email},update,{new:true})
    }

}