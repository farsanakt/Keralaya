import { AdminRepositories } from "../../repositories/implementation/adminRepositories";
import bcrypt from "bcryptjs";

export class AuthService {

    private adminrepositories :AdminRepositories
   

    constructor (){

        this.adminrepositories=new AdminRepositories()

    }


    async adminLogin(adminData:{email:string,password:string}):Promise<{success:boolean,message:string}>{

        const email=adminData.email

        console.log(email,'emmm')

        const password=adminData.password

        const isAdmin=await this.adminrepositories.findByEmail(email)

        console.log(isAdmin,'add')

        if(!isAdmin){

            return {success:false,message:'your not a admin'}

        }

        const currentPass=await bcrypt.compare(password,isAdmin.password)

        if(!currentPass){

            return {success:false,message:'wrong password'}

        }

         return {success:true,message:'logged successfully'}


    }

}