
import axios from "axios"
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

  
    async getLocations(input:string){

      try {

        const location= await this.userRepositories.getLocations(input)

        return location
        
      } catch (error) {

        console.log('error occured in getlocation service')
        
      }

    }

    async locationDetails(id:string){

      try {

        const  details=await this.userRepositories.findLocationById(id)

        return details
        
      } catch (error) {
        
        console.log('error occured in locationdetals service')

      }

    }

    async getGuideDetails(dis:string){

     try {

      const details=await this.userRepositories.getGuide(dis)

      return details
      
     } catch (error) {
      

      console.log('error occur in gettig guide details')

     }

    }


    

}