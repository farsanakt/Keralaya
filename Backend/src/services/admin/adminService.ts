import { AdminGuideRepository } from "../../repositories/implementation/adminGuideRepositories"
import { AdminUserRepository } from "../../repositories/implementation/adminUserRepositorie"

const adminGuideRepository=new AdminGuideRepository()




export class AdminService{

   private adminUserRepository:AdminUserRepository

   private adminGuideRepository:AdminGuideRepository


   constructor(){

    this.adminUserRepository=new AdminUserRepository()

    this.adminGuideRepository=new AdminGuideRepository()

   }

    getallusers=async()=>{

        try {

            const users=await this.adminUserRepository.getAllUsers()

            return users
            
        } catch (error) {

            console.log('not found any user',error)
            
        }

    }

    userBlockStatus=async(userId:string)=>{

        try {

            console.log('i am here')

            const user=await this.adminUserRepository.findUser(userId)

            console.log(user,'user')

            if(!user){

                return {success:false,message:'user not found'}
                 
            }

            user.isBlocked=!user.isBlocked

            const response=await this.adminUserRepository.save(user)

            return response


            
        } catch (error) {

            
        }

    }
    
    getallguide=async()=>{

        try {
            
            const guides=await adminGuideRepository.getAllGuides()

            return guides

        } catch (error) {
            

            console.log('not found any guide',error)

        }

    }

    guideBlockStatus=async(guideid:string)=>{

        try {

            const guide=await adminGuideRepository.findGuide(guideid)

        if(!guide){

            return {success:false,message:'guide not found'}
             
        }

        guide.isBlocked=!guide.isBlocked
        
        const response=await adminGuideRepository.save(guide)

        return response
            
        } catch (error) {
      
         console.log(error)
            
        }

    }

    approvePlace = async (id: string,status:string) => {
        try {
            const place = await adminGuideRepository.findPlace(id);
    
            console.log(place, 'place');
    
            if (place) {
                const updatedPlace = await adminGuideRepository.updatePlaceStatus(id,status);
                console.log(updatedPlace, 'updated place');
            }
        } catch (error) {
            console.error('Error updating place status:', error);
        }
    };
    


  




}

