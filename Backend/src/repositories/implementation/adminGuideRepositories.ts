import { Guide, IGuide } from "@/models/guideModel/guideModel";

import { IAdminGuideRepository } from "@/repositories/interface/IAdminGuideRepositories";


export class AdminGuideRepository implements IAdminGuideRepository{


    saveGuide(guidedata: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
   
    async getAllGuides(): Promise<any> {
        
        const guides=await Guide.find()

        return guides

    }

    async findGuide(guideId:any):Promise<IGuide | null>{


        return  await Guide.findById(guideId)

    }

    async save(guide:IGuide){

        const updateGuideStatus=await Guide.findByIdAndUpdate(

            {_id:guide._id},
            {$set:{isBlocked:guide.isBlocked}},
            {new:true}

        )

    }

}