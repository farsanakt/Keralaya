import { Guide ,IGuide} from "@/models/guideModel/guideModel";
import { IGuideRepository } from "@/repositories/interface/IGuideRepositories";



export class GuideRepositories implements IGuideRepository {

                
        async createUser(data:any):Promise <IGuide | null>{
                        
            return await Guide.create(data)
        }     
       

    async findUserById(guideId:string) : Promise<IGuide | null>{
        return await Guide.findById(guideId)
    }

    async findUserByEmail (email:string) : Promise<IGuide | null> {
        return await Guide.findOne({email})

    }


}