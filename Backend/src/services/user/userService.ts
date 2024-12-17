
import { IUser } from "../../models/userModel/userModel"
import { UserRepositories } from "../../repositories/implementation/UserRepositories"

export class UserService{

    private userRepositories: UserRepositories

    constructor(){

        this.userRepositories=new UserRepositories()
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

}