import User, { IUser } from "../../models/userModel/userModel";



export class UserRepositories {

    async createUser(data:any):Promise <IUser | null>{
        return await User.create(data)
    }

    async findUserByEmail(email:String) :Promise <IUser | null>{
          return await User.findOne({email})
    }

}