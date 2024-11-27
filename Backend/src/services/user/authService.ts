import { UserRepositories } from "../../repositories/implementation/UserRepositories";
import bcrypt from "bcryptjs"

async function hashPassword(password:string):Promise<string>{
    return await bcrypt.hash(password,10)
}

export class AuthService{

    private userRepositories : UserRepositories

    constructor(){
        this.userRepositories=new UserRepositories()
    }

    async userSignup(username:string,email:string,password:string,confirmPassword:string):Promise<{success:boolean,message:string}>{

       console.log('reached userSignup')

       if(password !==confirmPassword){


        return {success:false,message:"Password and confirm password do not match"}

       }

        const existingUser=await this.userRepositories.findUserByEmail(email)

        if(existingUser){

            console.log('existed already')

            return {success:false,message:"user already existed"};
        }

        const hashedPassword=await hashPassword(password)

        const savedDetails=await this.userRepositories.createUser({
            username:username,
            email:email,
            password:hashedPassword
        })

        return {success:true,message:"user created"};



    }

 

}