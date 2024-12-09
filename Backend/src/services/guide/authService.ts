import { GuideRepositories } from "../../repositories/implementation/guideRepositories";
import { guideRegisterDto } from "../../dto/authGuideDto";
import bcrypt from 'bcryptjs'
import { hashpassword } from "../../utils/passwordUtils";




export class AuthService{


    private guideRepository:GuideRepositories

    constructor(){

        this.guideRepository=new GuideRepositories()
    }

    async guideRegistration(guideDto:guideRegisterDto):Promise<{success:boolean,message:string}>{

        
        
       try {

        const {username,email,password}=guideDto

        const existingGuide=await this.guideRepository.findUserByEmail(email)

        if(existingGuide){

            return {success:false,message:'Guide already existed'}

        }

        const hashedpassword=await hashpassword(password)

        const guideSave=await this.guideRepository.createUser({

            ...guideDto,
            password:hashedpassword

        })

 
        return {success:true,message:'guide registration completed'}
 
       } catch (error) {
          
        return {success:false,message:'something went wrong'}

       }

  
       

    }


}