
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

    async searchLocation(query:string){

        const appkey='AIzaSyD6M06Pi3FmCySvZ-33n3K9UXwN_y7CvHs'

        try {

            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
                params: {
                  input:query,  // The location you're searching for, e.g., "Calicut"
                  key: appkey  // Your API key
                }
              });

            const places = response.data;

            console.log(places)

            return places;  
            
        } catch (error) {
            
        }

    }


    

}