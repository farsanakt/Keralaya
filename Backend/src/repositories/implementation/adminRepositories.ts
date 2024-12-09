import Admin from "../../models/adminModel/adminModel";

export class AdminRepositories{
    

    async findByEmail(email:string){
        
        let data = await  Admin.findOne({email})
    
        return data;
        
    }

}