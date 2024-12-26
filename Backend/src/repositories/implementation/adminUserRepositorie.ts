
import userModel, { IUser } from "@/models/userModel/userModel";

import { IAdminUserRepository } from "@/repositories/interface/IAdminUserRepositories";


export class AdminUserRepository implements IAdminUserRepository{

    async saveUser(data: any): Promise<void> {
        const user = new userModel(data);
        await user.save();
    }


    async getAllUsers(): Promise<any[]> {
        
        const users=await userModel.find()
        
        return users

    }

    async findUser(id:any):Promise<IUser |null>{

        return await userModel.findById(id)

    }

    async findByUserId(userId: string): Promise<IUser | null> {

        console.log('entering the findbyuserUdd',userId);
        
        return await userModel.findOne({ userId });
    }

    async save(user:IUser){

        const updateUser=await userModel.findOneAndUpdate(

            {_id:user._id},
            {$set:{isBlocked:user.isBlocked}},
            {new:true}

        )

    }

    

}