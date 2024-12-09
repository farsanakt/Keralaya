import { AdminGuideRepository } from "../../repositories/implementation/adminGuideRepositories"
import { AdminUserRepository } from "../../repositories/implementation/adminUserRepositorie"
const adminUserRepository=new AdminUserRepository()
const adminGuideRepository=new AdminGuideRepository()


export class AdminService{

    getallusers=async()=>{

        try {

            const users=await adminUserRepository.getAllUsers()

            return users
            
        } catch (error) {

            console.log('not found any user',error)
            
        }

    }


    userBlockStatus=async(userId:string)=>{

        try {

            console.log('i am here')

            const user=await adminUserRepository.findUser(userId)

            console.log(user,'user')

            if(!user){

                return {success:false,message:'user not found'}
                 
            }

            user.isBlocked=!user.isBlocked

            const response=await adminUserRepository.save(user)

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




}

